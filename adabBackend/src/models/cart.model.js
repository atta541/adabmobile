const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Items', required: true },
  quantity: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true },
  name: { type: String, required: true },
  picture: { type: String, required: true }
});

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [cartItemSchema],
  totalPrice: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now, expires: 300 }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
