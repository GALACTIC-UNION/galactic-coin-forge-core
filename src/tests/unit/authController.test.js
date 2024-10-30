// src/tests/unit/authController.test.js

const request = require('supertest');
const app = require('../../main/app');
const AuthService = require('../../services/authService');

jest.mock('../../services/authService');

describe('Auth Controller', () => {
    describe('POST /auth/login', () => {
        it('should log in a user and return a token', async () => {
            const mockUser  = { id: '1', username: 'testuser', token: 'mock_token' };
            AuthService.login.mockResolvedValue(mockUser );

            const response = await request(app)
                .post('/api/v1/auth/login')
                .send({ username: 'testuser', password: 'password' });

            expect(response.status).toBe(200);
            expect(response.body.data.token).toBe(mockUser .token);
        });

        it('should return 401 if credentials are invalid', async () => {
            AuthService.login.mockRejectedValue(new Error('Invalid credentials'));

            const response = await request(app)
                .post('/api/v1/auth/login')
                .send({ username: 'wronguser', password: 'wrongpassword' });

            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Invalid credentials');
        });
    });
});
