const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

const authMiddleware = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = authHeader.split(' ')[1]; 

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = await User.findById(decoded.id).select('-password'); 
        
        if (!req.user) {
            return res.status(404).json({ message: 'User not found' });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
