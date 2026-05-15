/**
 * Middleware для проверки авторизации
 * Проверяет username:password токен в заголовке Authorization
 */

module.exports = function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  const ADMINS = {};

  // Парсим администраторов из .env
  if (process.env.ADMINS) {
    process.env.ADMINS.split('|').forEach(admin => {
      const [username, password] = admin.split(':');
      ADMINS[username] = password;
    });
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Не авторизован. Передайте токен в заголовке Authorization: Bearer <token>'
    });
  }

  try {
    // Декодируем токен
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [timestamp, username, password] = decoded.split(':');

    // Проверяем учетные данные
    if (!ADMINS[username] || ADMINS[username] !== password) {
      throw new Error('Invalid credentials');
    }

    // Проверяем, что токен не старше 24 часов
    const tokenAge = Date.now() - parseInt(timestamp);
    const oneDayMs = 24 * 60 * 60 * 1000;

    if (tokenAge > oneDayMs) {
      return res.status(401).json({
        success: false,
        error: 'Токен истек. Авторизуйтесь заново.'
      });
    }

    // Сохраняем username в req для использования в роутах
    req.user = { username };
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'Неверный токен: ' + error.message
    });
  }
};
