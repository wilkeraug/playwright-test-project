import { test, expect } from '@playwright/test';

test.describe('Users API', () => {
  test('GET /api/users returns user list', async ({ request }) => {
    const response = await request.get('/api/users');
    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    
    const users = await response.json();
    expect(Array.isArray(users)).toBeTruthy();
  });

  test('POST /api/users creates new user', async ({ request }) => {
    const newUser = {
      name: 'Test User',
      email: 'test@example.com',
      role: 'user'
    };

    const response = await request.post('/api/users', {
      data: newUser
    });

    expect(response.status()).toBe(201);
    
    const createdUser = await response.json();
    expect(createdUser).toMatchObject(newUser);
  });
});