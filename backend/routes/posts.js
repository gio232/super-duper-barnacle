const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const auth = require('../middleware/auth');
const { exportPostsToJson } = require('../utils/exportPosts');

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
    const { title, description, content, lang = 'ru', image, author, published = false } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        error: 'Заголовок и содержание обязательны'
      });
    }

    // Генерируем уникальный slug (используем uuid)
    const slug = uuidv4();

    const post = {
      id: slug,
      slug: slug,
      title: title,
      description: description || content.substring(0, 150),
      content: content,
      lang: lang,
      image: image || null,
      author: author || 'Swiss Center Services AG',
      date: new Date().toISOString(),
      published: published,
      translations: {}
    };

    // Сохраняем пост
    const filename = `${slug}.${lang}.json`;
    const filepath = path.join(POSTS_DIR, filename);

    fs.writeFileSync(filepath, JSON.stringify(post, null, 2));
    exportPostsToJson(); // Обновляем posts-data.json

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
    exportPostsToJson(); // Обновляем posts-data.json

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

    exportPostsToJson(); // Обновляем posts-data.json

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

module.exports = router;
