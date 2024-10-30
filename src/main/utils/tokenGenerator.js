// src/main/utils/tokenGenerator.js

const jwt = require('jsonwebtoken');

/**
 * Generates a JSON Web Token (JWT) for a user.
 * @param {Object} user - The user object containing user information.
 * @param {string} secret - The secret key used to sign the token.
 * @param {Object} options - Options for token generation (e.g., expiresIn).
 * @returns {string} - The generated JWT.
 */
const generateToken = (user, secret, options = {}) => {
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        // Add any other user properties you want to include in the token
    };

    return jwt.sign(payload, secret, {
        expiresIn: options.expiresIn || '1h', // Default expiration time is 1 hour
        algorithm: 'HS256', // You can change the algorithm if needed
    });
};

/**
 * Verifies a JSON Web Token (JWT).
 * @param {string} token - The JWT to verify.
 * @param {string} secret - The secret key used to verify the token.
 * @returns {Promise<Object>} - The decoded payload if the token is valid.
 * @throws {Error} - Throws an error if the token is invalid or expired.
 */
const verifyToken = (token, secret) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return reject(new Error('Invalid or expired token'));
            }
            resolve(decoded);
        });
    });
};

module.exports = {
    generateToken,
    verifyToken,
};
