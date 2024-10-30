// src/main/routes/index.js

const express = require('express');
const userRoutes = require('./userRoutes');
const coinRoutes = require('./coinRoutes');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// Health check route
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// User routes
router.use('/users', userRoutes);

// Coin routes
router.use('/coins', authenticate, coinRoutes); // Protect coin routes with authentication middleware

// 404 Not Found handler
router.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
});

// Global error handler
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = router;
