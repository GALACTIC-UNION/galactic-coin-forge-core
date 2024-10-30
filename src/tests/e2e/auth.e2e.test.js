// src/tests/e2e/auth.e2e.test.js

const request = require('supertest');
const app = require('../../main/app');

describe('Auth End-to-End Tests', () => {
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/v1/auth/register')
            .send({ username: 'newuser', password: 'password123' });

        expect(response.status).toBe(201);
        expect(response.body.data.user).toHaveProperty('id');
        expect(response.body.data.user.username).toBe('newuser');
    });

    it('should log in an existing user', async () => {
        const response = await request(app)
            .post('/api/v1/auth/login')
            .send({ username: 'newuser', password: 'password123' });

        expect(response.status).toBe(200);
        expect(response.body.data.token).toBeDefined();
    });

    it('should not log in with invalid credentials', async () => {
        const response = await request(app)
            .post('/api/v1/auth/login')
            .send({ username: 'wronguser', password: 'wrongpassword' });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid credentials');
    });
});
