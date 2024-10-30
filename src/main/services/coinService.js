// src/main/services/coinService.js

const Coin = require('../models/Coin');
const Transaction = require('../models/Transaction');
const axios = require('axios'); // For fetching market data
const { ValidationError } = require('mongoose').Error;

class CoinService {
    // Create a new coin
    static async createCoin(name, symbol, marketCap, price) {
        try {
            const existingCoin = await Coin.findOne({ symbol });
            if (existingCoin) {
                throw new ValidationError('Coin with this symbol already exists');
            }

            const newCoin = new Coin({ name, symbol, marketCap, price });
            await newCoin.save();
            return newCoin;
        } catch (error) {
            throw error instanceof ValidationError ? error : new Error('Failed to create coin');
        }
    }

    // Get all coins
    static async getAllCoins() {
        try {
            return await Coin.find();
        } catch (error) {
            throw new Error('Failed to retrieve coins');
        }
    }

    // Get coin by ID
    static async getCoinById(coinId) {
        try {
            const coin = await Coin.findById(coinId);
            if (!coin) {
                throw new Error('Coin not found');
            }
            return coin;
        } catch (error) {
            throw new Error('Failed to retrieve coin');
        }
    }

    // Update coin details
    static async updateCoin(coinId, updates) {
        try {
            const coin = await Coin.findById(coinId);
            if (!coin) {
                throw new Error('Coin not found');
            }

            Object.keys(updates).forEach((key) => {
                coin[key] = updates[key];
            });

            await coin.save();
            return coin;
        } catch (error) {
            throw new Error('Failed to update coin');
        }
    }

    // Delete a coin
    static async deleteCoin(coinId) {
        try {
            const coin = await Coin.findById(coinId);
            if (!coin) {
                throw new Error('Coin not found');
            }
            await coin.remove();
            return { message: 'Coin deleted successfully' };
        } catch (error) {
            throw new Error('Failed to delete coin');
        }
    }

    // Fetch market data from an external API
    static async fetchMarketData(coinId) {
        try {
            const coin = await this.getCoinById(coinId);
            const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coin.symbol}&vs_currencies=usd`);
            return {
                coinId: coin._id,
                symbol: coin.symbol,
                currentPrice: response.data[coin.symbol].usd,
            };
        } catch (error) {
            throw new Error('Failed to fetch market data');
        }
    }

    // Record a transaction for a coin
    static async recordTransaction(userId, coinId, amount, priceAtTransaction, transactionType) {
        try {
            const coin = await this.getCoinById(coinId);
            const totalValue = amount * priceAtTransaction;

            const transaction = new Transaction({
                userId,
                coinId,
                amount,
                priceAtTransaction,
                totalValue,
                transactionType,
            });

            await transaction.save();
            return transaction;
        } catch (error) {
            throw new Error('Failed to record transaction');
        }
    }
}

module.exports = CoinService;
