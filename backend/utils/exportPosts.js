const fs = require('fs');
const path = require('path');

function exportPostsToJson() {
  try {
    const POSTS_DIR = path.join(__dirname, '../data/posts');
    const OUTPUT_FILE = path.join(__dirname, '../../posts-data.json');

    if (!fs.existsSync(POSTS_DIR)) {
      fs.mkdirSync(POSTS_DIR, { recursive: true });
    }

    // Читаем все посты
    const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.json'));
    let posts = files.map(file => {
      const content = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
      return JSON.parse(content);
    });

    // Сортируем по дате (новые первые)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Экспортируем в posts-data.json
    const data = {
      success: true,
      data: posts
    };

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));
    console.log(`✓ Экспортировано ${posts.length} постов в posts-data.json`);
  } catch (error) {
    console.error('Ошибка при экспорте постов:', error);
  }
}

module.exports = { exportPostsToJson };
