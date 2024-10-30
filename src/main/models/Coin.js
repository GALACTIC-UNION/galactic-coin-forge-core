// src/main/models/Coin.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Coin schema
const coinSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    symbol: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true,
    },
    marketCap: {
        type: Number,
        required: true,
        min: 0,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    volume: {
        type: Number,
        required: true,
        min: 0,
    },
    circulatingSupply: {
        type: Number,
        required: true,
        min: 0,
    },
    totalSupply: {
        type: Number,
        required: true,
        min: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Middleware to update the updatedAt field before saving
coinSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Static method to find a coin by symbol
coinSchema.statics.findBySymbol = async function (symbol) {
    return await this.findOne({ symbol });
};

// Instance method to update the price
coinSchema.methods.updatePrice = async function (newPrice) {
    this.price = newPrice;
    await this.save();
};

// Instance method to get the coin's market cap in a formatted string
coinSchema.methods.getMarketCapFormatted = function () {
    return `$${this.marketCap.toLocaleString()}`;
};

// Create the Coin model
const Coin = mongoose.model('Coin', coinSchema);

module.exports = Coin;
