// src/main/utils/errorHandler.js

const logger = require('./logger'); // Assuming you have a logger utility

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true; // Operational errors are expected and can be handled
        Error.captureStackTrace(this, this.constructor);
    }
}

// Middleware for handling errors
const errorHandler = (err, req, res, next) => {
    // Log the error details
    logger.error(err);

    // Set default values for status code and message
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // Handle operational errors
    if (err.isOperational) {
        return res.status(statusCode).json({
            status: 'error',
            statusCode,
            message,
        });
    }

    // For programming errors, send a generic message
    return res.status(500).json({
        status: 'error',
        statusCode: 500,
        message: 'Something went wrong! Please try again later.',
    });
};

// Function to create a new AppError
const createError = (message, statusCode) => {
    return new AppError(message, statusCode);
};

module.exports = {
    errorHandler,
    createError,
};
