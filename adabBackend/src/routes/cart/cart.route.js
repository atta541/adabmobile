const express = require('express');
const router = express.Router();
const cartController = require('../../controllers/cart/cart.controller');
const authMiddleware = require('../users/authMiddleware');



// Add to Cart
router.post('/add',authMiddleware, cartController.addToCart);

// Update Cart
router.put('/update',authMiddleware, cartController.updateCart);

// Delete from Cart
router.delete('/delete',authMiddleware, cartController.deleteFromCart);

// Get Cart
router.post('/', authMiddleware, cartController.getCart);




module.exports = router;