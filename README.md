# Video Library Backend

This is the backend service for the Video Library app, built with **Node.js**, **Express**, and **SQLite**. It supports video listing with **pagination**, **search**, and **sorting**, using a clean and scalable architecture.

---

## Features

- SQLite database seeded from `videos.json`
- REST API to fetch videos
- Pagination, title search, and sort by title/date
- Modular architecture: controller → service → repository
- Centralized error handling middleware
- MUI-powered frontend (WIP)

---

## Setup

```bash
# 1. Clone the repo and install dependencies
npm install

# 2. Seed the database
node src/db/init.js

# 3. Run the server
npm run dev

Server runs at: http://localhost:3001

## API: `GET /videos
```
| Param     | Description                               |
|-----------|-------------------------------------------|
| `page`    | Page number (default: 1)                  |
| `limit`   | Items per page (default: 10)              |
| `search`  | Title filter (optional)                   |
| `sort_by` | `created_at` or `title` (default: `created_at`) |
| `order`   | `asc` or `desc` (default: `desc`)         |

## Example Requests
```
curl "http://localhost:3001/videos"
curl "http://localhost:3001/videos?search=editor"
curl "http://localhost:3001/videos?sort_by=title&order=asc&page=2&limit=5"
```

## Architecture
- routes/: Express routers
- controllers/: Handles HTTP layer
- services/: Business logic and validation
- repositories/: SQLite queries and DB access
- middlewares/: Global error handler

## Next Steps
- Add filtering by date range and tags
- Add unit and integration tests with Jest
- Add OpenAPI docs and request validation (zod or express-validator)
- Add authentication (admin vs regular user)
- Enable detailed query logging and metrics
- Move to TypeScript for type safety and better tooling
