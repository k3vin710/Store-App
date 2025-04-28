const express = require('express');
const { body, param } = require('express-validator');

const authController = require('../controller/auth');

const router = express.Router();

const isAuthenticated = require("../middleware/is-auth");

router.post(
    '/register',
    [
        body('name')
            .trim()
            .isLength({ max: 100 })
            .withMessage('Name is too long'),
        body('segment')
            .trim()
            .isLength({ max: 1 })
            .isInt(),
        body('email')
            .trim()
            .isEmail()
            .withMessage('Invalid email value')
            .normalizeEmail(),
        body('password')
            .trim()
            .isLength({ min: 5 })
            .withMessage('Weak password'),
    ],
    authController.postSignUp
);

router.post(
    '/login',
    [
        body('email')
            .trim()
            .isEmail()
            .normalizeEmail(),
        body('password')
            .trim()
            .isLength({ min: 5 }),
    ],
    authController.postLogin
);

router.post(
    '/sendOTP/:email',
    [
        param('email')
            .trim()
            .isEmail()
            .normalizeEmail(),
    ],
    authController.postSendOTP
)

router.post(
    '/changePassword/custId',
    isAuthenticated,
    [
        body('customerId')
            .trim()
            .isLength({ max: 20 }),
        body('otpCode')
            .trim()
            .isLength({ max: 5 }),
        body('password')
            .trim()
            .isLength({ min: 5 })
            .withMessage('Weak password'),
        body('confirmPassword')
            .trim()
            .isLength({ min: 5 })
            .withMessage('Weak password')
    ],
    authController.postPasswordByCustId
)

router.post(
    '/forgotPassword/validateOTP',
    [
        body('email')
            .trim()
            .isEmail()
            .normalizeEmail(),
        body('otpCode')
            .trim()
            .isLength({ max: 5 })
    ],
    authController.postCheckOTPByEmail
)

router.post(
    '/forgotPassword/change',
    [
        body('email')
            .trim()
            .isEmail()
            .normalizeEmail(),
        body('password')
            .trim()
            .isLength({ min: 5 })
            .withMessage('Weak password'),
        body('confirmPassword')
            .trim()
            .isLength({ min: 5 })
            .withMessage('Weak password')
    ],
    authController.postChangePasswordByEmail
)

module.exports = router;
