const mongoose = require('mongoose');

const SubItemsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Items',
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('SubItems', SubItemsSchema);