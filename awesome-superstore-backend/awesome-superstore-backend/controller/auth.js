const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const CustomerAccessor = require('../model/customer');
const { transporter, constructOTPEmail } = require('../email/transporter');

exports.postSignUp = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
		return res.status(400).json({
            message: "Validation error",
            errors: errors.array()
        });
	}
    const name = req.body.name;
    const segment = req.body.segment;
    const email = req.body.email;
    const password = req.body.password;

    const customerFound = await CustomerAccessor.findOneByEmail(email);
    if (customerFound) {
        return res.status(400).json({
            message: "Email already exists"
        });
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const custId = await CustomerAccessor.insert(name, segment, email, hashedPassword)
    return res.status(200).json({
        message: "Customer registered successfully.",
        customer_id: custId
    });
}

exports.postLogin = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
		return res.status(400).json({
            message: "Validation error",
            errors: errors.array()
        });
	}
    const email = req.body.email;
    const password = req.body.password;
    const customerFound = await CustomerAccessor.findOneByEmail(email);
    if (!customerFound) {
        return res.status(400).json({
            message: "Email is not registered"
        });
    }

    const passwordIsMatching = await bcrypt.compare(password, customerFound.password);
    if (!passwordIsMatching) {
        return res.status(400).json({
            message: "Invalid password"
        });
    }

    const token = jwt.sign(
        { customerId: customerFound.cust_id },
        process.env.SECRETKEY,
        { expiresIn: "2h" }
    );
    return res.status(200).json({
        message: "Customer logged in successfully",
        customer: {
            cust_id: customerFound.cust_id,
            cust_name: customerFound.cust_name,
            segment: customerFound.segment,
            email: customerFound.email
        },
        token: token
    })
};

exports.postSendOTP = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
		return res.status(400).json({
            message: "Validation error",
            errors: errors.array()
        });
	}
    const email = req.params.email;
    const customerFound = await CustomerAccessor.findOneByEmail(email);
    if (!customerFound) {
        return res.status(400).json({
            message: "Email doesn't exist"
        });
    }
    const result = await CustomerAccessor.setAndGetOTP(email);
    const otpCode = result.otp_code;
    transporter.sendMail(constructOTPEmail(otpCode, email), (err, info) => {
        if (err) {
            return res.status(400).json({
                message: "OTP send failed"
            });
        }
        else {
            return res.status(200).json({
                message: "OTP code sent successfully",
            })
        }
     })
}

exports.postPasswordByCustId = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
		return res.status(400).json({
            message: "Validation error",
            errors: errors.array()
        });
	}
    const customerId = req.body.customerId;
    const otpCode = req.body.otpCode;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const currentCustomer = await CustomerAccessor.findOneById(customerId);
    if (!currentCustomer) {
        return res.status(400).json({
            message: "Can't find customer id"
        })
    }
    if (password !== confirmPassword) {
        return res.status(400).json({
            message: "Password doesn't match!"
        })
    }
    if (currentCustomer.otp_code !== otpCode) {
        return res.status(400).json({
            message: "OTP code doesn't match!"
        })
    }
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const newCustomer = await CustomerAccessor.update(customerId, currentCustomer.cust_name, currentCustomer.segment, currentCustomer.email, hashedPassword);
    return res.status(200).json(newCustomer);
}

exports.postCheckOTPByEmail = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
		return res.status(400).json({
            message: "Validation error",
            errors: errors.array()
        });
	}
    const email = req.body.email;
    const otpCode = req.body.otpCode;
    const customerFound = await CustomerAccessor.findOneByEmail(email);
    if (otpCode !== customerFound.otp_code) {
        return res.status(400).json({
            message: "OTP code doesn't match!"
        })
    } else {
        return res.status(200).json({
            message: "OTP matched successfully"
        })
    }
}

exports.postChangePasswordByEmail = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
		return res.status(400).json({
            message: "Validation error",
            errors: errors.array()
        });
	}
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const currentCustomer = await CustomerAccessor.findOneByEmail(email);
    if (!currentCustomer) {
        return res.status(400).json({
            message: "Can't find email"
        })
    }
    if (password !== confirmPassword) {
        return res.status(400).json({
            message: "Password doesn't match!"
        })
    }
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const newCustomer = await CustomerAccessor.update(currentCustomer.cust_id, currentCustomer.cust_name, currentCustomer.segment, currentCustomer.email, hashedPassword);
    return res.status(200).json({
        message: "Password changed successfully"
    })
}