// src/tests/integration/transactionService.test.js

const TransactionService = require('../../services/transactionService');
const db = require('../../config/db'); // Assuming you have a db connection module

describe('Transaction Service', () => {
    beforeAll(async () => {
        await db.connect(); // Connect to the database
    });

    afterAll(async () => {
        await db.disconnect(); // Disconnect from the database
    });

    it('should create a transaction in the database', async () => {
        const transactionData = { amount: 100, description: 'Integration test transaction' };
        const transaction = await TransactionService.createTransaction(transactionData, 'userId');

        expect(transaction).toHaveProperty('id');
        expect(transaction.amount).toBe(transactionData.amount);
    });

    it('should retrieve transactions for a user', async () => {
        const transactions = await TransactionService.getTransactionsByUserId('userId');
        expect(transactions).toBeInstanceOf(Array);
    });
});
