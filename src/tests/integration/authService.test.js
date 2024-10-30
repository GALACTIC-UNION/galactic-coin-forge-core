// src/tests/integration/authService.test.js

const AuthService = require('../../services/authService');
const db = require('../../config/db');

describe('Auth Service', () => {
    beforeAll(async () => {
        await db.connect();
    });

    afterAll(async () => {
        await db.disconnect();
    });

    it('should register a new user', async () => {
        const userData = { username: 'newuser', password: 'password123' };
        const user = await AuthService.register(userData);

        expect(user).toHaveProperty('id');
        expect(user.username).toBe(userData.username);
    });

    it('should authenticate a user with valid credentials', async () => {
        const userData = { username: 'existinguser', password: 'password123' };
        const token = await AuthService.login(userData);

        expect(token).toBeDefined();
    });

    it('should throw an error for invalid credentials', async () => {
        const userData = { username: 'wronguser', password: 'wrongpassword' };

        await expect(AuthService.login(userData)).rejects.toThrow('Invalid credentials');
    });
});
