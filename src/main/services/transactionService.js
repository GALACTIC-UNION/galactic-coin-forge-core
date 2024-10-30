// src/main/services/transactionService.js

const Transaction = require('../models/Transaction'); // Assuming you have a Transaction model
const UserService = require('./userService'); // Assuming you have a UserService for user-related operations
const { createError } = require('../utils/errorHandler');

/**
 * Creates a new transaction.
 * @param {Object} transactionData - The data for the new transaction.
 * @param {string} userId - The ID of the user making the transaction.
 * @returns {Promise<Object>} - The created transaction.
 */
const createTransaction = async (transactionData, userId) => {
    // Validate transaction data
    if (!transactionData.amount || !transactionData.type) {
        throw createError('Transaction amount and type are required', 400);
    }

    // Check if user exists
    const user = await UserService.getUser ById(userId);
    if (!user) {
        throw createError('User  not found', 404);
    }

    // Create the transaction
    const transaction = await Transaction.create({
        ...transactionData,
        userId,
        createdAt: new Date(),
    });

    return transaction;
};

/**
 * Retrieves all transactions for a user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array>} - An array of transactions.
 */
const getTransactionsByUser Id = async (userId) => {
    const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 });
    return transactions;
};

/**
 * Retrieves a specific transaction by ID.
 * @param {string} transactionId - The ID of the transaction.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Object>} - The transaction object.
 */
const getTransactionById = async (transactionId, userId) => {
    const transaction = await Transaction.findOne({ _id: transactionId, userId });
    if (!transaction) {
        throw createError('Transaction not found', 404);
    }
    return transaction;
};

/**
 * Updates a transaction by ID.
 * @param {string} transactionId - The ID of the transaction.
 * @param {Object} updateData - The data to update.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Object>} - The updated transaction.
 */
const updateTransaction = async (transactionId, updateData, userId) => {
    const transaction = await getTransactionById(transactionId, userId);

    // Validate update data
    if (updateData.amount && updateData.amount <= 0) {
        throw createError('Transaction amount must be greater than zero', 400);
    }

    Object.assign(transaction, updateData);
    await transaction.save();

    return transaction;
};

/**
 * Deletes a transaction by ID.
 * @param {string} transactionId - The ID of the transaction.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<void>}
 */
const deleteTransaction = async (transactionId, userId) => {
    const transaction = await getTransactionById(transactionId, userId);
    await transaction.remove();
};

module.exports = {
    createTransaction,
    getTransactionsByUser Id,
    getTransactionById,
    updateTransaction,
    deleteTransaction,
};
