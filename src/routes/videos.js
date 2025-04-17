const express = require('express');
const { getVideosController } = require('../controllers/video-controller');
const { validateVideoQuery } = require('../middlewares/validate-query');

const router = express.Router();
router.get('/', validateVideoQuery, getVideosController);

module.exports = router;
