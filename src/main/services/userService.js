// src/main/services/userService.js

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { ValidationError } = require('mongoose').Error;

// Configuration for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Use environment variable for security
const JWT_EXPIRATION = '1h'; // Token expiration time

class UserService {
    // Register a new user
    static async register(username, email, password) {
        try {
            const existingUser  = await User.findByEmail(email);
            if (existingUser ) {
                throw new ValidationError('Email already in use');
            }

            const newUser  = new User({ username, email, password });
            await newUser .save();
            return this.generateToken(newUser );
        } catch (error) {
            throw error instanceof ValidationError ? error : new Error('Registration failed');
        }
    }

    // Authenticate a user
    static async authenticate(email, password) {
        try {
            const user = await User.findByEmail(email);
            if (!user || !(await user.comparePassword(password))) {
                throw new Error('Invalid email or password');
            }
            return this.generateToken(user);
        } catch (error) {
            throw new Error('Authentication failed');
        }
    }

    // Generate JWT token
    static generateToken(user) {
        const payload = { id: user._id, username: user.username, email: user.email };
        return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    }

    // Get user profile
    static async getUser Profile(userId) {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User  not found');
            }
            return {
                id: user._id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
            };
        } catch (error) {
            throw new Error('Failed to retrieve user profile');
        }
    }

    // Update user profile
    static async updateUser Profile(userId, updates) {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User  not found');
            }

            // Update fields
            Object.keys(updates).forEach((key) => {
                if (key !== 'password') {
                    user[key] = updates[key];
                }
            });

            // If password is being updated, hash it
            if (updates.password) {
                user.password = await bcrypt.hash(updates.password, 10);
            }

            await user.save();
            return this.getUser Profile(userId);
        } catch (error) {
            throw new Error('Failed to update user profile');
        }
    }

    // Delete user account
    static async deleteUser (userId) {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User  not found');
            }
            await user.remove();
            return { message: 'User  account deleted successfully' };
        } catch (error) {
            throw new Error('Failed to delete user account');
        }
    }
}

module.exports = UserService;
