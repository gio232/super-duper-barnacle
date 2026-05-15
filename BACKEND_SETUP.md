# 🚀 Полный гайд: Custom Backend для Блога

## **Что создано:**

✅ **Express.js Backend** - API для управления статьями  
✅ **Админ панель** - простой интерфейс для тетки  
✅ **Multi-язычность** - RU, EN, DE (с автопереводом)  
✅ **Портативность** - работает на любом хостинге  
✅ **JSON хранилище** - посты в простых JSON файлах  

---

## **Локальное тестирование (5 минут)**

### **1. Установи Node.js**
https://nodejs.org/ (версия 14+)

### **2. Установи зависимости**
```bash
npm install
```

### **3. Создай .env файл** (уже готов)
```
PORT=3000
ADMIN_PASSWORD=12345
```

**⚠️ Изменить пароль:**
Открой `.env` и замени `12345` на свой пароль

### **4. Запусти сервер**
```bash
npm run dev
```

Должно показать:
```
╔════════════════════════════════════════════╗
║  🚀 Swiss Center Blog Backend              ║
╠════════════════════════════════════════════╣
║  Server started on port 3000              ║
║  API:    http://localhost:3000/api         ║
║  Admin:  http://localhost:3000/admin       ║
║  Health: http://localhost:3000/api/health  ║
╚════════════════════════════════════════════╝
```

### **5. Откройся в браузере**

**Админка:** http://localhost:3000/admin  
**Пароль:** `12345` (или твой из .env)  
**Блог:** http://localhost:3000/blog.html  

---

## **Как использовать админку**

### **Вход:**
1. Откройся `/admin`
2. Введи пароль из `.env`
3. Нажми "Войти"

### **Написать статью:**
1. Выбери язык написания (РУ/EN/DE)
2. Заполни заголовок, описание, содержание
3. Можешь добавить изображение (URL)
4. Нажми "Опубликовать" или "Сохранить как черновик"

### **Автоперевод:**
Когда ты публикуешь статью, система автоматически:
- Переводит на другие 2 языка
- Создает по 3 JSON файла (один для каждого языка)
- Они сразу появляются на сайте

### **Посты хранятся здесь:**
```
backend/data/posts/
├── statya-1.ru.json
├── statya-1.en.json
├── statya-1.de.json
└── ...
```

---

## **Развертывание на хостинг (Production)**

### **Вариант 1: Heroku (рекомендуется - легко)**

1. **Создай аккаунт:** https://heroku.com

2. **Установи Heroku CLI:**
   ```bash
   brew tap heroku/brew && brew install heroku
   ```

3. **Логинься:**
   ```bash
   heroku login
   ```

4. **Создай приложение:**
   ```bash
   heroku create твое-приложение-название
   ```

5. **Добавь переменные окружения:**
   ```bash
   heroku config:set ADMIN_PASSWORD=твой_безопасный_пароль
   heroku config:set NODE_ENV=production
   ```

6. **Запусти:**
   ```bash
   git push heroku main
   ```

**URL сайта:**
- Главная: https://твое-приложение.herokuapp.com
- Админка: https://твое-приложение.herokuapp.com/admin
- Блог: https://твое-приложение.herokuapp.com/blog.html

---

### **Вариант 2: VPS/Dedicated сервер (если у тебя уже есть)**

1. **SSH на сервер:**
   ```bash
   ssh user@твойсервер.com
   ```

2. **Установи Node.js:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Клонируй репо:**
   ```bash
   git clone https://github.com/gio232/-tefinalfix.git
   cd -tefinalfix
   npm install
   ```

4. **Создай .env:**
   ```bash
   echo "PORT=3000" > .env
   echo "ADMIN_PASSWORD=твой_пароль" >> .env
   ```

5. **Используй PM2 для автоперезагрузки:**
   ```bash
   npm install -g pm2
   pm2 start backend/server.js --name "blog"
   pm2 startup
   pm2 save
   ```

6. **Настрой Nginx (reverse proxy):**
   ```nginx
   server {
       listen 80;
       server_name твойдомен.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

7. **Включи SSL (Let's Encrypt):**
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d твойдомен.com
   ```

---

### **Вариант 3: Replit (самый простой)**

1. Перейди на https://replit.com
2. Нажми "Create Repl" → "Import from GitHub"
3. Введи: `https://github.com/gio232/-tefinalfix.git`
4. Нажми "Run"
5. Сайт будет на https://твойнейм--tefinalfix.repl.co

---

## **Подключение своего домена**

### **На Heroku:**
```bash
heroku domains:add твойдомен.com
```

### **На VPS:**
1. Укажи DNS записи в регистраторе домена:
   ```
   A record: твой_ip_адрес_сервера
   ```
2. Жди 1-24 часов пока распространится

### **На Replit:**
Просит купить платный план для своего домена (дороговато)

---

## **API Endpoints**

### **GET /api/posts**
Получить все опубликованные посты

Query параметры:
- `?lang=ru` - только русские посты
- `?published=true` - только опубликованные

**Пример:**
```bash
curl http://localhost:3000/api/posts?lang=ru&published=true
```

### **GET /api/posts/:slug**
Получить пост по slug-у (все языки)

### **POST /api/posts** (требует авторизацию)
Создать новый пост

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "title": "Заголовок",
  "description": "Краткое описание",
  "content": "Содержание статьи",
  "lang": "ru",
  "image": "https://...",
  "author": "Автор"
}
```

### **PUT /api/posts/:slug** (требует авторизацию)
Обновить пост

### **DELETE /api/posts/:slug** (требует авторизацию)
Удалить пост (все языки)

### **POST /api/auth/login**
Получить токен

**Body:**
```json
{
  "password": "12345"
}
```

**Response:**
```json
{
  "success": true,
  "token": "базированный64токен"
}
```

---

## **Структура файлов**

```
/
├── backend/
│   ├── server.js           - Главный сервер
│   ├── routes/
│   │   └── posts.js        - API для постов
│   ├── middleware/
│   │   └── auth.js         - Авторизация
│   └── data/
│       └── posts/          - JSON файлы статей
├── admin-panel/
│   ├── index.html          - Админка (интерфейс)
│   ├── admin.js            - Логика админки
│   └── admin.css           - Стили админки
├── blog.html               - Страница блога
├── blog-loader.js          - Загрузчик статей
├── .env                    - Конфигурация
├── package.json            - Зависимости Node.js
└── ...остальные файлы сайта
```

---

## **Устранение проблем**

### **"Cannot find module 'express'"**
```bash
npm install
```

### **"ADMIN_PASSWORD не определен"**
Создай .env файл с:
```
ADMIN_PASSWORD=12345
```

### **"Port 3000 already in use"**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

Или используй другой порт в .env:
```
PORT=3001
```

---

## **Безопасность**

### **Перед продакшеном:**

1. **Сменить пароль на сложный:**
   ```
   ADMIN_PASSWORD=YourVerySecurePassword123!@#
   ```

2. **Не коммитить .env в Git:**
   - `.env` уже в `.gitignore` ✓

3. **Использовать HTTPS:**
   - На Heroku: автоматически ✓
   - На VPS: настроить Let's Encrypt ✓

4. **Регулярно бэкапить посты:**
   ```bash
   # Скопируй папку backend/data/posts/
   # на безопасное место (GitHub, облако, etc.)
   ```

---

## **Контакты для поддержки**

Если что-то не работает:
1. Проверь консоль браузера (F12)
2. Посмотри логи сервера (npm run dev)
3. Убедись что .env файл создан
4. Пересоздай node_modules: `rm -rf node_modules && npm install`

---

**Готово к использованию! 🎉**
