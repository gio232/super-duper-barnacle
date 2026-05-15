const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');

const UPLOAD_DIR = process.env.UPLOAD_DIR || 'uploads';
const MAX_FILE_SIZE = (process.env.MAX_FILE_SIZE || 10) * 1024 * 1024; // в байтах

// Убедимся, что директория существует
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Конфигурация multer
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'application/pdf',
    'video/mp4',
    'video/webm'
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Неподдерживаемый тип файла'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE
  }
});

/**
 * Обработка загруженного изображения
 * Оптимизирует размер и создает версии для разных экранов
 */
async function processImage(file) {
  if (!file) return null;

  const uniqueName = `${uuidv4()}-${Date.now()}`;

  try {
    // Основное изображение (оптимизировано для web)
    const originalPath = path.join(UPLOAD_DIR, `${uniqueName}.webp`);
    await sharp(file.buffer)
      .resize(1200, 800, {
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality: 80 })
      .toFile(originalPath);

    // Миниатюра (для списка статей)
    const thumbPath = path.join(UPLOAD_DIR, `${uniqueName}-thumb.webp`);
    await sharp(file.buffer)
      .resize(400, 300, {
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality: 75 })
      .toFile(thumbPath);

    // Мобильная версия
    const mobileePath = path.join(UPLOAD_DIR, `${uniqueName}-mobile.webp`);
    await sharp(file.buffer)
      .resize(600, 400, {
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality: 75 })
      .toFile(mobileePath);

    return {
      name: uniqueName,
      original: `/uploads/${uniqueName}.webp`,
      thumb: `/uploads/${uniqueName}-thumb.webp`,
      mobile: `/uploads/${uniqueName}-mobile.webp`,
      size: file.size,
      type: file.mimetype
    };
  } catch (error) {
    console.error('Ошибка при обработке изображения:', error);
    throw error;
  }
}

/**
 * Обработка видео или других файлов
 */
async function processFile(file) {
  if (!file) return null;

  const uniqueName = `${uuidv4()}-${Date.now()}`;
  const ext = path.extname(file.originalname);
  const filename = `${uniqueName}${ext}`;
  const filepath = path.join(UPLOAD_DIR, filename);

  try {
    fs.writeFileSync(filepath, file.buffer);

    return {
      name: uniqueName,
      url: `/uploads/${filename}`,
      originalName: file.originalname,
      size: file.size,
      type: file.mimetype
    };
  } catch (error) {
    console.error('Ошибка при сохранении файла:', error);
    throw error;
  }
}

module.exports = {
  upload: upload.single('file'),
  processImage,
  processFile,
  UPLOAD_DIR
};
