const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbFile = path.resolve(__dirname, '../../../db.sqlite');
const db = new sqlite3.Database(dbFile);

function getVideoCount(search = '') {
  const whereClause = search ? `WHERE title LIKE ?` : '';
  const query = `SELECT COUNT(*) as total FROM videos ${whereClause}`;
  const params = search ? [`%${search}%`] : [];

  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) return reject(err);
      resolve(row.total);
    });
  });
}

function getVideos({ search = '', limit = 10, offset = 0, sortBy = 'created_at', order = 'DESC' }) {
  const whereClause = search ? `WHERE title LIKE ?` : '';
  const query = `
    SELECT * FROM videos
    ${whereClause}
    ORDER BY ${sortBy} ${order}
    LIMIT ? OFFSET ?
  `;
  const params = search
    ? [`%${search}%`, limit, offset]
    : [limit, offset];

  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) return reject(err);
      const parsed = rows.map(row => ({
        ...row,
        tags: JSON.parse(row.tags || '[]'),
      }));
      resolve(parsed);
    });
  });
}

module.exports = {
  getVideoCount,
  getVideos
};
