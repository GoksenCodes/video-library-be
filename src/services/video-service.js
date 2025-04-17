const { getVideos, getVideoCount } = require('../repositories/videoRepository');

async function fetchVideos({ page = 1, limit = 10, search = '', sort_by = 'created_at', order = 'DESC' }) {
  const offset = (page - 1) * limit;

  const [videos, total] = await Promise.all([
    getVideos({ search, limit, offset, sortBy: sort_by, order }),
    getVideoCount(search)
  ]);

  return {
    data: videos,
    meta: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    }
  };
}

module.exports = {
  fetchVideos
};
