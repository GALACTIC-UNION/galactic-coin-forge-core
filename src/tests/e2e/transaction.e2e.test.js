// src/tests/e2e/transaction.e2e.test.js

const request = require('supertest');
const app = require('../../main/app');

describe('Transaction End-to-End Tests', () => {
    let token;

    beforeAll(async () => {
        // Log in to get a token
        const loginResponse = await request(app)
            .post('/api/v1/auth/login')
            .send({ username: 'testuser', password: 'password' });

        token = loginResponse.body.data.token;
    });

    it('should create a new transaction', async () => {
        const response = await request(app)
            .post('/api/v1/transactions')
            .send({ amount: 150, description: 'E2E test transaction' })
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(201);
        expect(response.body.data.transaction).toHaveProperty('id');
        expect(response.body.data.transaction.amount).toBe(150);
    });

    it('should retrieve all transactions', async () => {
        const response = await request(app)
            .get('/api/v1/transactions')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.data.transactions).toBeInstanceOf(Array);
    });
});
