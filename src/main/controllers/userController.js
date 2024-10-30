// src/main/controllers/userController.js

const UserService = require('../services/userService');
const { validationResult } = require('express-validator');

class UserController {
    // Register a new user
    static async register(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;

        try {
            const token = await UserService.register(username, email, password);
            return res.status(201).json({ token });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    // Authenticate a user
    static async authenticate(req, res) {
        const { email, password } = req.body;

        try {
            const token = await UserService.authenticate(email, password);
            return res.status(200).json({ token });
        } catch (error) {
            return res.status(401).json({ message: error.message });
        }
    }

    // Get user profile
    static async getUser Profile(req, res) {
        const userId = req.user.id; // Assuming user ID is stored in req.user by authentication middleware

        try {
            const userProfile = await UserService.getUser Profile(userId);
            return res.status(200).json(userProfile);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    }

    // Update user profile
    static async updateUser Profile(req, res) {
        const userId = req.user.id; // Assuming user ID is stored in req.user by authentication middleware
        const updates = req.body;

        try {
            const updatedProfile = await UserService.updateUser Profile(userId, updates);
            return res.status(200).json(updatedProfile);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    // Delete user account
    static async deleteUser (req, res) {
        const userId = req.user.id; // Assuming user ID is stored in req.user by authentication middleware

        try {
            const response = await UserService.deleteUser (userId);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

module.exports = UserController;
