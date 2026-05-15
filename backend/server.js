/**
 * Swiss Center Services Blog Backend
 * Админ Панель с поддержкой:
 * - Загрузки медиафайлов
 * - Логина + пароля
 * - Сброса пароля
 * - Мультиязычного контента
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Парсим администраторов из .env
const ADMINS = {};
if (process.env.ADMINS) {
  process.env.ADMINS.split('|').forEach(admin => {
    const [username, password] = admin.split(':');
    ADMINS[username] = password;
  });
}

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Serve статических файлов
app.use(express.static(path.join(__dirname, '../')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Создаем директорию uploads если ее нет
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Routes
const postsRouter = require('./routes/posts');
const uploadRouter = require('./routes/upload');
app.use('/api/posts', postsRouter);
app.use('/api/upload', uploadRouter);

// ===== AUTH ENDPOINTS =====

// Логин с username + password
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Требуется username и password'
    });
  }

  if (ADMINS[username] && ADMINS[username] === password) {
    const token = Buffer.from(`${Date.now()}:${username}:${password}`).toString('base64');
    res.json({
      success: true,
      token: token,
      username: username,
      message: `Добро пожаловать, ${username}!`
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Неверное имя пользователя или пароль'
    });
  }
});

// Проверка токена
app.post('/api/auth/verify', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token' });
  }

  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [timestamp, username, password] = decoded.split(':');

    if (ADMINS[username] && ADMINS[username] === password) {
      const tokenAge = Date.now() - parseInt(timestamp);
      if (tokenAge > 24 * 60 * 60 * 1000) {
        return res.status(401).json({ success: false, message: 'Token expired' });
      }
      res.json({ success: true, username: username });
    } else {
      res.status(401).json({ success: false, message: 'Invalid token' });
    }
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
});

// Сброс пароля (отправить инструкции на email)
app.post('/api/auth/forgot-password', (req, res) => {
  const { username } = req.body;

  if (!username || !ADMINS[username]) {
    return res.status(404).json({
      success: false,
      message: 'Пользователь не найден'
    });
  }

  // В продакшене здесь была бы отправка email
  // Сейчас просто вернем новый пароль (в реальности нужен сброс через email)
  const newPassword = 'reset_' + Math.random().toString(36).substring(7);
  ADMINS[username] = newPassword;

  res.json({
    success: true,
    message: 'Инструкции отправлены на email (в боевой версии). Временный пароль: ' + newPassword,
    tempPassword: newPassword // только для demo!
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: '✓ Backend работает' });
});

// Админ панель
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../admin-panel/index.html'));
});

// 404
app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    res.status(404).json({ success: false, message: 'API endpoint not found' });
  } else {
    res.sendFile(path.join(__dirname, '../index.html'));
  }
});

// Стартуем сервер
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════╗
║  🚀 Swiss Center - Админ Панель Блога         ║
╠════════════════════════════════════════════════╣
║  Server started on port ${PORT}              ║
║  Admin Panel: http://localhost:${PORT}/admin   ║
║  API:         http://localhost:${PORT}/api     ║
║  Uploads:     http://localhost:${PORT}/uploads ║
╚════════════════════════════════════════════════╝
  `);

  console.log('\n📝 Администраторы:');
  Object.keys(ADMINS).forEach(user => {
    console.log(`   - ${user}`);
  });
  console.log('');
});

module.exports = app;
