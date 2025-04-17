const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbFile = path.resolve(__dirname, '../../db.sqlite');
const db = new sqlite3.Database(dbFile);

const raw = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/videos.json'), 'utf-8'));
const videos = raw.videos;


db.serialize(() => {
  db.run(`DROP TABLE IF EXISTS videos`);

  db.run(`
    CREATE TABLE videos (
      id TEXT PRIMARY KEY,
      title TEXT,
      thumbnail_url TEXT,
      created_at TEXT,
      duration INTEGER,
      views INTEGER,
      tags TEXT
    )
  `);

  const stmt = db.prepare(`
    INSERT INTO videos (id, title, thumbnail_url, created_at, duration, views, tags)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  videos.forEach((video) => {
    stmt.run(
      video.id,
      video.title,
      video.thumbnail_url,
      video.created_at,
      video.duration,
      video.views,
      JSON.stringify(video.tags)
    );
  });

  stmt.finalize();

  console.log(`Seeded ${videos.length} videos into db`);
});

db.close();
