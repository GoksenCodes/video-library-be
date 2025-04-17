const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const router = express.Router();
const dbFile = path.resolve(__dirname, '../../db.sqlite');
const db = new sqlite3.Database(dbFile);

const SORT_COLUMNS = {
    CREATED_AT: 'created_at',
    TITLE: 'title'
  };
  
  const ORDER_DIRECTIONS = {
    ASC: 'ASC',
    DESC: 'DESC'
  };
  

router.get('/', (req, res) => {
    const {
        page = 1,
        limit = 10,
        search = '',
        sort_by,
        order
    } = req.query;

    const safeSortBy = Object.values(SORT_COLUMNS).includes(sort_by) ? sort_by : SORT_COLUMNS.CREATED_AT;
    const safeOrder = Object.values(ORDER_DIRECTIONS).includes(order?.toUpperCase()) ? order.toUpperCase() : ORDER_DIRECTIONS.DESC;
    
    const offset = (page - 1) * limit;
    const whereClause = search ? `WHERE title LIKE ?` : '';
    const queryParams = search ? [`%${search}%`] : [];

    const countSql = `SELECT COUNT(*) as total FROM videos ${whereClause}`;
    
    db.get(countSql, queryParams, (err, countRow) => {
        if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to fetch count' });
        }

        const total = countRow.total;

        const dataSql = `
        SELECT * FROM videos
        ${whereClause}
        ORDER BY ${safeSortBy} ${safeOrder}
        LIMIT ? OFFSET ?
        `;

        const dataParams = search
        ? [`%${search}%`, Number(limit), Number(offset)]
        : [Number(limit), Number(offset)];

        db.all(dataSql, dataParams, (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to fetch videos' });
            }

            const videos = rows.map(row => ({
                ...row,
                tags: JSON.parse(row.tags || '[]'),
            }));

            res.json({
                data: videos,
                meta: {
                total,
                page: Number(page),
                limit: Number(limit),
                pages: Math.ceil(total / limit),
                }
            });
        });
    });
});

module.exports = router;

