import { app } from '../..';
import supertest from 'supertest';

const request = supertest(app);

describe('Test endpoint suite', () => {
  it('resize image that does not exist', async () => {
    const response = await request.get('/api/v1/images?name=image&width=200&height=562');
    expect(response.status).toBe(404);
  });

  it('return validation error', async () => {
    const response = await request.get('/api/v1/images?name=encenadaport&width=jjj&height=562');
    expect(response.status).toBe(400);
  });
});
