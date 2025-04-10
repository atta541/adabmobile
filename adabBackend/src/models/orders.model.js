const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true }, 
    phone: { type: String, required: true },
    address: { type: String, required: true },
    nearestPlace: { type: String },
    city: { type: String, default: 'Lahore' },
    cartItems: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            name: { type: String, required: true },
            picture: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }

        }
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Confirmed', 'Delivered'], default: 'Pending' },
    userId: { type: String, required: true }, 
    orderType:{type: String, required: false},


    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
