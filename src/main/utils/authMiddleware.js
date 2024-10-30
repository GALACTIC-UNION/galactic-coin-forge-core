// src/main/utils/authMiddleware.js

const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const UserService = require('../services/userService');

const verifyToken = promisify(jwt.verify);

const authMiddleware = async (req, res, next) => {
    // Get the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ message: 'Access token is required' });
    }

    try {
        // Verify the token
        const decoded = await verifyToken(token, process.env.JWT_SECRET);
        
        // Fetch user from the database
        const user = await UserService.getUser ById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'User  not found' });
        }

        // Attach user information to the request object
        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;
