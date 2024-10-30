// src/main/controllers/transactionController.js

const TransactionService = require('../services/transactionService');
const { createError } = require('../utils/errorHandler');

/**
 * Creates a new transaction.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const createTransaction = async (req, res, next) => {
    try {
        const userId = req.user.id; // Assuming user ID is attached to the request
        const transactionData = req.body;

        const transaction = await TransactionService.createTransaction(transactionData, userId);
        res.status(201).json({
            status: 'success',
            data: {
                transaction,
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Retrieves all transactions for the authenticated user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const getTransactions = async (req, res, next) => {
    try {
        const userId = req.user.id; // Assuming user ID is attached to the request
        const transactions = await TransactionService.getTransactionsByUser Id(userId);
        res.status(200).json({
            status: 'success',
            results: transactions.length,
            data: {
                transactions,
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Retrieves a specific transaction by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const getTransaction = async (req, res, next) => {
    try {
        const userId = req.user.id; // Assuming user ID is attached to the request
        const transactionId = req.params.id;

        const transaction = await TransactionService.getTransactionById(transactionId, userId);
        res.status(200).json({
            status: 'success',
            data: {
                transaction,
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Updates a transaction by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const updateTransaction = async (req, res, next) => {
    try {
        const userId = req.user.id; // Assuming user ID is attached to the request
        const transactionId = req.params.id;
        const updateData = req.body;

        const updatedTransaction = await TransactionService.updateTransaction(transactionId, updateData, userId);
        res.status(200).json({
            status: 'success',
            data: {
                transaction: updatedTransaction,
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Deletes a transaction by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const deleteTransaction = async (req, res, next) => {
    try {
        const userId = req.user.id; // Assuming user ID is attached to the request
        const transactionId = req.params.id;

        await TransactionService.deleteTransaction(transactionId, userId);
        res.status(204).json({
            status: 'success',
            message: 'Transaction deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createTransaction,
    getTransactions,
    getTransaction,
    updateTransaction,
    deleteTransaction,
};
