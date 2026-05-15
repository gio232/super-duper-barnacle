/**
 * Swiss Center Services Blog Backend
 * Простой Node.js/Express сервер для управления блогом
 * Полностью портативный - работает везде!
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password123'; // Измени в .env

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Serve статических файлов (статьи в JSON)
app.use(express.static(path.join(__dirname, '../')));

// Routes
const postsRouter = require('./routes/posts');
app.use('/api/posts', postsRouter);

// Auth endpoint
app.post('/api/auth/login', (req, res) => {
  const { password } = req.body;

  if (password === ADMIN_PASSWORD) {
    // Генерируем простой token (в продакшене используй JWT)
    const token = Buffer.from(`${Date.now()}:${ADMIN_PASSWORD}`).toString('base64');
    res.json({
      success: true,
      token: token,
      message: 'Успешно авторизован'
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Неверный пароль'
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: '✓ Backend работает' });
});

// Главная страница
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Админка
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../admin-panel/index.html'));
});

// Стартуем сервер
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════╗
║  🚀 Swiss Center Blog Backend              ║
╠════════════════════════════════════════════╣
║  Server started on port ${PORT}           ║
║  API:    http://localhost:${PORT}/api      ║
║  Admin:  http://localhost:${PORT}/admin    ║
║  Health: http://localhost:${PORT}/api/health║
╚════════════════════════════════════════════╝
  `);
});

module.exports = app;
