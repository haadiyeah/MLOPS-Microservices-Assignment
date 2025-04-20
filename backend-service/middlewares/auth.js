const jwt = require('jsonwebtoken');
const axios = require('axios');

// JWT Secret (should match auth service)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

exports.protect = async (req, res, next) => {
    try {
        let token;

        // Check if token exists in headers
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'You are not logged in' });
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Set user ID in request
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({ message: 'Not authorized' });
    }
};