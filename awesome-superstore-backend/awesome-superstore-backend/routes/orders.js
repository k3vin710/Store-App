const express = require("express");
const { query, param} = require("express-validator");

const orderController = require("../controller/orders");

const router = express.Router();

const isAuthenticated = require("../middleware/is-auth");

router.post("/", isAuthenticated, orderController.insertOrders);

router.get(
    '/',
    isAuthenticated,
    [
        query('customerId')
            .trim()
            .isLength({max:20}),
        query('isReturned')
            .isBoolean()
    ],
    orderController.getOrdersByCustomerAndReturned
)

router.post(
    '/return/:orderId',
    isAuthenticated,
    [
        param('orderId')
            .trim()
            .isLength({max:40})
    ],
    orderController.postOrderReturnedByCustomer
)

router.get(
    '/details/:orderId',
    isAuthenticated,
    [
        param('orderId')
            .trim()
            .isLength({max:40})
    ],
    orderController.getOrderDetails
)

module.exports = router;
