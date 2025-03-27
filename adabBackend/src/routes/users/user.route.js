const express = require('express');
const { check } = require('express-validator');
const {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword,
    updateProfile,
    getUserProfile,
    checkVerificationStatus,SendEmailVerification,
    VerifyEmailOTP

} = require('../../controllers/users/user.controller');
const authMiddleware = require('./authMiddleware');

const router = express.Router();

// Register Route
router.post(
    '/register',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please enter a valid email').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
        check('phone', 'Phone number is required').not().isEmpty(),
        check('phone', 'Phone number must be valid').isMobilePhone(),
        check('address', 'Address is required').not().isEmpty(),
    ],
    registerUser
);

// Login Route
router.post(
    '/login',
    [
        check('email', 'Please enter a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    loginUser
);

router.get('/me', authMiddleware, getUserProfile);

// Forgot Password Route
router.post(
    '/forgot-password',
    [check('email', 'Please enter a valid email').isEmail()],
    forgotPassword
);

// Reset Password Route
router.post(
    '/reset-password',
    [
        check('token', 'Token is required').not().isEmpty(),
        check('newPassword', 'Password must be at least 6 characters').isLength({ min: 6 })
    ],
    resetPassword
); 

// Update Profile Route (Protected)
router.put(
    '/update-profile',
    authMiddleware,
    [
        check('name', 'Name is required').optional().not().isEmpty(),
        check('email', 'Please enter a valid email').optional().isEmail(),
        check('password', 'Password must be at least 6 characters').optional().isLength({ min: 6 })
    ],
    updateProfile
);


// Email Verification Routes
router.get('/check-verification', authMiddleware, checkVerificationStatus);
router.post('/send-verification', authMiddleware, SendEmailVerification);
router.post('/verify-emailotp', authMiddleware, VerifyEmailOTP);
 



module.exports = router;
