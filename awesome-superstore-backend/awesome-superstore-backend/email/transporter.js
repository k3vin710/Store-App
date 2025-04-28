const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPASSWORD,
    },
    secure: true,
})


const constructOTPEmail = (otp, recipientEmail) => {
    return {
        from: process.env.EMAIL,  // sender address
        to: recipientEmail,  
        subject: 'Your OTP Code',
        text: `Your OTP Code for Awesome Superstore is ${otp}`,
    }
}

module.exports = { transporter, constructOTPEmail };
