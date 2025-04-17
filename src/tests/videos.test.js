const request = require('supertest');
const app = require('../index');

describe('GET /videos', () => {
  it('returns paginated video list', async () => {
    const res = await request(app).get('/videos?page=1&limit=5');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.meta).toMatchObject({
      page: 1,
      limit: 5
    });
  });

  it('returns validation error for negative page', async () => {
    const res = await request(app).get('/videos?page=-2');

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error.message).toBe('Invalid query parameters');
  });
});
