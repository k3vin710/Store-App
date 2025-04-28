const express = require('express');
const { param, body } = require('express-validator');

const customerController = require('../controller/customer');

const router = express.Router();

const isAuthenticated = require("../middleware/is-auth");

router.post(
    '/',
    isAuthenticated,
    [
        body('customerId')
            .trim()
            .isLength({max:20}),
        body('customerName')
            .trim()
            .isLength({max: 100}),
        body('segment')
            .trim()
            .isLength({max: 1})
            .isInt(),
        body('email')
            .trim()
            .isEmail()
            .withMessage('Invalid email value')
            .normalizeEmail()
    ],
    customerController.postCustomer
)

router.get(
    '/:customerId',
    isAuthenticated,
    [
        param('customerId')
            .trim()
            .isLength({max:20})
    ],
    customerController.getCustomerById
)

module.exports = router;