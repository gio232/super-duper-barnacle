const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const auth = require('../middleware/auth');

const router = express.Router();
const POSTS_DIR = path.join(__dirname, '../data/posts');

// Убедимся, что директория существует
if (!fs.existsSync(POSTS_DIR)) {
  fs.mkdirSync(POSTS_DIR, { recursive: true });
}

/**
 * GET /api/posts - Получить все посты
 * Query: ?lang=ru&published=true
 */
router.get('/', (req, res) => {
  try {
    const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.json'));
    let posts = files.map(file => {
      const content = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
      return JSON.parse(content);
    });

    // Фильтруем по языку
    if (req.query.lang) {
      posts = posts.filter(p => p.lang === req.query.lang);
    }

    // Фильтруем по статусу публикации
    if (req.query.published === 'true') {
      posts = posts.filter(p => p.published === true);
    }

    // Сортируем по дате (новые первые)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/posts/:slug - Получить конкретный пост
 */
router.get('/:slug', (req, res) => {
  try {
    const files = fs.readdirSync(POSTS_DIR).filter(f => f.startsWith(req.params.slug) && f.endsWith('.json'));

    if (files.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Пост не найден'
      });
    }

    const posts = files.map(file => {
      const content = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
      return JSON.parse(content);
    });

    res.json({
      success: true,
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/posts - Создать новый пост
 * Body: { title, description, content, lang, image, author }
 */
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, content, lang = 'ru', image, author } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        error: 'Заголовок и содержание обязательны'
      });
    }

    // Генерируем slug
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50);

    const post = {
      id: uuidv4(),
      slug: slug,
      title: title,
      description: description || content.substring(0, 150),
      content: content,
      lang: lang,
      image: image || null,
      author: author || 'Swiss Center Services AG',
      date: new Date().toISOString(),
      published: false,
      translations: {}
    };

    // Сохраняем пост
    const filename = `${slug}.${lang}.json`;
    const filepath = path.join(POSTS_DIR, filename);

    fs.writeFileSync(filepath, JSON.stringify(post, null, 2));

    // Запускаем автоперевод (асинхронно)
    translatePost(post, slug);

    res.status(201).json({
      success: true,
      message: 'Пост создан',
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * PUT /api/posts/:slug - Обновить пост
 */
router.put('/:slug', auth, (req, res) => {
  try {
    const { title, description, content, lang = 'ru', published, image } = req.body;
    const filename = `${req.params.slug}.${lang}.json`;
    const filepath = path.join(POSTS_DIR, filename);

    if (!fs.existsSync(filepath)) {
      return res.status(404).json({
        success: false,
        error: 'Пост не найден'
      });
    }

    const post = JSON.parse(fs.readFileSync(filepath, 'utf-8'));

    // Обновляем данные
    if (title) post.title = title;
    if (description) post.description = description;
    if (content) post.content = content;
    if (image !== undefined) post.image = image;
    if (published !== undefined) post.published = published;

    fs.writeFileSync(filepath, JSON.stringify(post, null, 2));

    res.json({
      success: true,
      message: 'Пост обновлен',
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * DELETE /api/posts/:slug - Удалить пост (все языки)
 */
router.delete('/:slug', auth, (req, res) => {
  try {
    const files = fs.readdirSync(POSTS_DIR).filter(f => f.startsWith(req.params.slug) && f.endsWith('.json'));

    if (files.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Пост не найден'
      });
    }

    files.forEach(file => {
      fs.unlinkSync(path.join(POSTS_DIR, file));
    });

    res.json({
      success: true,
      message: `Удалено ${files.length} версий поста`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Функция автоперевода (асинхронно)
 */
function translatePost(post, slug) {
  const translateAPI = 'https://api.mymemory.translated.net/get';

  const langs = {
    'ru': ['en', 'de'],
    'en': ['ru', 'de'],
    'de': ['ru', 'en']
  };

  if (!langs[post.lang]) return;

  langs[post.lang].forEach(targetLang => {
    setTimeout(() => {
      try {
        const url = `${translateAPI}?q=${encodeURIComponent(post.title)}&langpair=${post.lang}|${targetLang}`;

        fetch(url)
          .then(res => res.json())
          .then(data => {
            if (data.responseData && data.responseData.translatedText) {
              const translated = {
                ...post,
                lang: targetLang,
                title: data.responseData.translatedText
              };

              const filename = `${slug}.${targetLang}.json`;
              const filepath = path.join(POSTS_DIR, filename);
              fs.writeFileSync(filepath, JSON.stringify(translated, null, 2));

              console.log(`✓ Пост переведен на ${targetLang.toUpperCase()}`);
            }
          })
          .catch(err => console.error(`Ошибка перевода: ${err.message}`));
      } catch (error) {
        console.error(`Ошибка при переводе: ${error.message}`);
      }
    }, 500 * Object.keys(langs[post.lang]).indexOf(targetLang));
  });
}

module.exports = router;
