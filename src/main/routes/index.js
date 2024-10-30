// src/main/routes/index.js

const express = require('express');
const authRoutes = require('./authRoutes'); // Assuming you have an authRoutes file
const transactionRoutes = require('./transactionRoutes'); // Assuming you have a transactionRoutes file
const { errorHandler } = require('../utils/errorHandler'); // Centralized error handler

const router = express.Router();

// Health check route
router.get('/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'API is running smoothly',
    });
});

// User authentication routes
router.use('/auth', authRoutes);

// Transaction routes
router.use('/transactions', transactionRoutes);

// Catch-all route for undefined routes
router.all('*', (req, res) => {
    res.status(404).json({
        status: 'fail',
        message: 'Route not found',
    });
});

// Error handling middleware
router.use(errorHandler);

module.exports = router;
