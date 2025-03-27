const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String, 
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    isEmailVerified: {
        type: Boolean,
        default: false, 
    },
    fcmToken: {
        type: String,
    },
    emailVerificationCode: { type: String }, 
    emailVerificationExpires: { type: Date }, 
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
