const express = require('express');
const { getVideosController } = require('../controllers/videoController');

const router = express.Router();
router.get('/', getVideosController);

module.exports = router;
