# Video Library Backend

This is the backend service for the Video Library app, built with **Node.js**, **Express**, and **SQLite**. It supports video listing with **pagination**, **search**, and **sorting**, using a clean and scalable architecture.

---

## Features

- SQLite database seeded from `videos.json`
- REST API to fetch videos
- Pagination, title search, and sort by title/date
- Modular architecture: controller → service → repository
- Input validation with clear error responses
- Centralized error handling middleware

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

# 4. Run tests
npm run test

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

## What was deferred and why
To stay focused on delivering core functionality and high-quality code within the time limit, the following features were intentionally deferred:
### Date range filtering: 
It requires: 
- Additional query logic to handle ISO date formats in SQLite
- A proper UX component on the frontend (date pickers, validation)
### Tag filtering
Tag data is currently stored as a JSON string in a single column, making efficient filtering non-trivial without schema normalization.

