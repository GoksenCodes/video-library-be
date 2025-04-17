const { fetchVideos } = require('../services/video-service');

const SORT_COLUMNS = {
  CREATED_AT: 'created_at',
  TITLE: 'title'
};

const ORDER = {
  ASC: 'ASC',
  DESC: 'DESC'
};

async function getVideosController(req, res, next) {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      sort_by,
      order
    } = req.query;

    const safeSortBy = Object.values(SORT_COLUMNS).includes(sort_by) ? sort_by : SORT_COLUMNS.CREATED_AT;
    const safeOrder = Object.values(ORDER).includes(order?.toUpperCase()) ? order.toUpperCase() : ORDER.DESC;

    const result = await fetchVideos({
      page: Number(page),
      limit: Number(limit),
      search,
      sort_by: safeSortBy,
      order: safeOrder
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getVideosController
};
