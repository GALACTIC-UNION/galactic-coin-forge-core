// src/main/models/Transaction.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Transaction schema
const transactionSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User ', // Reference to the User model
    },
    coinId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Coin', // Reference to the Coin model
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    priceAtTransaction: {
        type: Number,
        required: true,
        min: 0,
    },
    totalValue: {
        type: Number,
        required: true,
        min: 0,
    },
    transactionType: {
        type: String,
        enum: ['buy', 'sell'],
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
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
transactionSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    this.totalValue = this.amount * this.priceAtTransaction; // Calculate total value
    next();
});

// Static method to find transactions by user
transactionSchema.statics.findByUser Id = async function (userId) {
    return await this.find({ userId }).populate('coinId'); // Populate coin details
};

// Instance method to update transaction status
transactionSchema.methods.updateStatus = async function (newStatus) {
    this.status = newStatus;
    await this.save();
};

// Instance method to get a summary of the transaction
transactionSchema.methods.getSummary = function () {
    return {
        id: this._id,
        userId: this.userId,
        coinId: this.coinId,
        amount: this.amount,
        priceAtTransaction: this.priceAtTransaction,
        totalValue: this.totalValue,
        transactionType: this.transactionType,
        status: this.status,
        createdAt: this.createdAt,
    };
};

// Create the Transaction model
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
