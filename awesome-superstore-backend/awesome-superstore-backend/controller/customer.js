const { validationResult } = require('express-validator')

const CustomerAccessor = require('../model/customer');

exports.postCustomer = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Validation error",
            errors: errors.array()
        });
    }
    const custId = req.body.customerId;
    const currentCustomer = await CustomerAccessor.findOneById(custId);
    if (!currentCustomer) {
        return res.status(400).json({
            message: "Customer ID doesn't exist"
        });
    }
    const custName = req.body.customerName;
    const segment = req.body.segment;
    const email = req.body.email;
    const customerFound = await CustomerAccessor.findOneByEmail(email);
    if (customerFound && customerFound.email != currentCustomer.email) {
        return res.status(400).json({
            message: "Email already exists"
        });
    }
    const newCustomer = await CustomerAccessor.update(custId, custName, segment, email, currentCustomer.password);
    return res.status(200).json(newCustomer);
}

exports.getCustomerById = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Validation error",
            errors: errors.array()
        });
    }
    const custId = req.params.customerId;
    const customer = await CustomerAccessor.findOneById(custId);
    return res.status(200).json(customer);
}