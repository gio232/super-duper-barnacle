# 🚀 Админ Панель — Быстрый старт

## ✅ Что готово

Полностью функциональная админ панель для управления мультиязычным блогом с поддержкой:
- ✅ Вход по username + password
- ✅ Загрузка изображений с автоматической оптимизацией
- ✅ Создание статей на RU/EN/DE с автоматическим переводом
- ✅ Предпросмотр переводов перед публикацией
- ✅ Сброс пароля (забыл пароль)
- ✅ Мобильная оптимизация
- ✅ Портативное развёртывание (Node.js на любом хостинге)

## 🎯 Логины по умолчанию

```
Админ:     username: admin,      пароль: 12345
Модератор: username: moderator,  пароль: password123
```

⚠️ **Измени пароли перед развёртыванием в продакшене!**

## 🏃 Быстрый старт

### 1. Установка (1 раз)
```bash
cd /Users/artemtarianik/katefinalfix
npm install
```

### 2. Запуск сервера
```bash
npm start
```

Сервер стартует на **http://localhost:3000**

### 3. Открыть админ панель
Перейди по адресу:
```
http://localhost:3000/admin-panel
```

### 4. Войти в систему
- Username: `admin`
- Password: `12345`

## 📝 Основные операции

### Создать статью
1. Выбери язык (RU, EN или DE)
2. Напиши заголовок и содержание на Markdown
3. Загрузи изображение (опционально)
4. Нажми "🌐 Проверить переводы" чтобы посмотреть все языки
5. Нажми "📤 Опубликовать" или "💾 Черновик"

### Загрузить изображение
1. Нажми "📤 Загрузить изображение"
2. Выбери файл (JPG, PNG)
3. Система создаст 3 версии автоматически:
   - Original (1200x800)
   - Thumb (400x300)
   - Mobile (600x400)

### Проверить переводы
1. Заполни заголовок и содержание
2. Нажми "🌐 Проверить переводы"
3. Посмотри все 3 языка в модальном окне
4. Если всё хорошо - опубликуй статью

## 🌐 API Endpoints

### Логин
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"12345"}'
```

### Загрузить изображение
```bash
curl -X POST http://localhost:3000/api/upload/image \
  -H "Authorization: Bearer TOKEN" \
  -F "file=@image.jpg"
```

### Получить все статьи
```bash
curl http://localhost:3000/api/posts
```

### Создать статью
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Заголовок",
    "content": "# Содержание",
    "lang": "ru",
    "published": true
  }'
```

## 📂 Структура проекта

```
katefinalfix/
├── admin-panel/
│   ├── index.html       ← админ интерфейс
│   ├── admin.js         ← логика админ панели
│   └── admin.css        ← стили (мобильная оптимизация)
├── backend/
│   ├── server.js        ← Express сервер
│   ├── middleware/
│   │   └── auth.js      ← проверка токенов
│   ├── routes/
│   │   ├── posts.js     ← CRUD для статей
│   │   └── upload.js    ← загрузка файлов
│   ├── services/
│   │   └── upload.js    ← оптимизация изображений
│   └── data/
│       └── posts/       ← JSON файлы статей
├── uploads/             ← загруженные изображения
├── .env                 ← переменные окружения
├── package.json         ← зависимости
├── ADMIN_PANEL_GUIDE.md ← полное руководство
└── QUICK_START.md       ← этот файл
```

## 🔐 Переменные окружения (`.env`)

```env
# Админы (username:password|username:password)
ADMINS=admin:12345|moderator:password123

# Для восстановления пароля
RESET_TOKEN_SECRET=change_this_in_production

# Папка для файлов
UPLOAD_DIR=uploads
MAX_FILE_SIZE=10
```

## 🚨 Если что-то не работает

### Сервер не стартует
```bash
# Убедись что Node.js установлен
node --version

# Переустанови зависимости
rm -rf node_modules package-lock.json
npm install

# Проверь что порт 3000 свободен
lsof -i :3000
```

### Изображения не загружаются
```bash
# Проверь что папка uploads существует
ls -la uploads/

# Проверь права доступа
chmod 755 uploads/
```

### Токен истекает
- Токены действуют 24 часа
- Перелогинься если возникли проблемы с авторизацией

## 📚 Дальнейшее развитие

### Возможные улучшения:
- [ ] Редактирование существующих статей (функция editPost в разработке)
- [ ] SMTP для отправки email с сбросом пароля
- [ ] Сохранение черновиков в localStorage
- [ ] Автосохранение контента
- [ ] История версий статей
- [ ] Настраиваемые шаблоны статей
- [ ] SEO метатеги для каждой статьи
- [ ] Категории и теги для статей

## 🌐 Развёртывание на хостинг

### Требования
- Node.js 14+ 
- 512MB RAM минимум
- 100MB дискового пространства

### На любом хостинге с Node.js (Heroku, DigitalOcean, VPS)
```bash
git push <remote> main
```

### Использование PM2 для фона
```bash
npm install -g pm2
pm2 start backend/server.js --name "admin-panel"
pm2 save
pm2 startup
```

---

**Версия**: 1.0.0  
**Дата**: 2026-05-15  

Для полного руководства см. [ADMIN_PANEL_GUIDE.md](./ADMIN_PANEL_GUIDE.md)
