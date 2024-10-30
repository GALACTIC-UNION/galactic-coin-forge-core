// src/main/controllers/coinController.js

const CoinService = require('../services/coinService');
const { validationResult } = require('express-validator');

class CoinController {
    // Create a new coin
    static async createCoin(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, symbol, marketCap, price } = req.body;

        try {
            const newCoin = await CoinService.createCoin(name, symbol, marketCap, price);
            return res.status(201).json(newCoin);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    // Get all coins
    static async getAllCoins(req, res) {
        try {
            const coins = await CoinService.getAllCoins();
            return res.status(200).json(coins);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // Get coin by ID
    static async getCoinById(req, res) {
        const { coinId } = req.params;

        try {
            const coin = await CoinService.getCoinById(coinId);
            return res.status(200).json(coin);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    }

    // Update coin details
    static async updateCoin(req, res) {
        const { coinId } = req.params;
        const updates = req.body;

        try {
            const updatedCoin = await CoinService.updateCoin(coinId, updates);
            return res.status(200).json(updatedCoin);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    // Delete a coin
    static async deleteCoin(req, res) {
        const { coinId } = req.params;

        try {
            const response = await CoinService.deleteCoin(coinId);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    // Fetch market data for a coin
    static async fetchMarketData(req, res) {
        const { coinId } = req.params;

        try {
            const marketData = await CoinService.fetchMarketData(coinId);
            return res.status(200).json(marketData);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // Record a transaction for a coin
    static async recordTransaction(req, res) {
        const { userId } = req.user; // Assuming user ID is stored in req.user by authentication middleware
        const { coinId, amount, priceAtTransaction, transactionType } = req.body;

        try {
            const transaction = await CoinService.recordTransaction(userId, coinId, amount, priceAtTransaction, transactionType);
            return res.status(201).json(transaction);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

module.exports = CoinController;
