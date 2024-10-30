// src/tests/unit/transactionController.test.js

const request = require('supertest');
const app = require('../../main/app'); // Assuming your Express app is exported from this file
const TransactionService = require('../../services/transactionService');

jest.mock('../../services/transactionService');

describe('Transaction Controller', () => {
    describe('POST /transactions', () => {
        it('should create a new transaction', async () => {
            const mockTransaction = { id: '1', amount: 100, description: 'Test transaction' };
            TransactionService.createTransaction.mockResolvedValue(mockTransaction);

            const response = await request(app)
                .post('/api/v1/transactions')
                .send({ amount: 100, description: 'Test transaction' })
                .set('Authorization', 'Bearer valid_token'); // Mock token

            expect(response.status).toBe(201);
            expect(response.body.data.transaction).toEqual(mockTransaction);
        });

        it('should return 400 if validation fails', async () => {
            const response = await request(app)
                .post('/api/v1/transactions')
                .send({}) // Invalid data
                .set('Authorization', 'Bearer valid_token');

            expect(response.status).toBe(400);
            expect(response.body.message).toContain('Validation failed');
        });
    });
});
