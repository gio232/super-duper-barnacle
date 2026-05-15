/**
 * Middleware для проверки авторизации
 * Проверяет токен в заголовке Authorization
 */

module.exports = function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  const adminPassword = process.env.ADMIN_PASSWORD || 'password123';

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Не авторизован. Передайте токен в заголовке Authorization: Bearer <token>'
    });
  }

  try {
    // Декодируем токен (простой способ)
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [timestamp, password] = decoded.split(':');

    if (password !== adminPassword) {
      throw new Error('Invalid token');
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

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'Неверный токен'
    });
  }
};
