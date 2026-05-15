const express = require('express');
const path = require('path');
const auth = require('../middleware/auth');
const { upload, processImage, processFile } = require('../services/upload');

const router = express.Router();

/**
 * POST /api/upload - Загрузить изображение
 * Обрабатывает изображения и создает версии для разных экранов
 */
router.post('/image', auth, upload, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Файл не загружен'
      });
    }

    if (!req.file.mimetype.startsWith('image/')) {
      return res.status(400).json({
        success: false,
        message: 'Это не изображение'
      });
    }

    const imageInfo = await processImage(req.file);

    res.json({
      success: true,
      data: imageInfo,
      message: 'Изображение загружено'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/upload/file - Загрузить любой файл
 */
router.post('/file', auth, upload, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Файл не загружен'
      });
    }

    const fileInfo = await processFile(req.file);

    res.json({
      success: true,
      data: fileInfo,
      message: 'Файл загружен'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
