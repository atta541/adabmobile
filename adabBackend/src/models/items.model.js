const mongoose = require('mongoose');

const ItemsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
    category: {  
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Items', ItemsSchema);
