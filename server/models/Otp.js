// services/otpService.js
const crypto = require('crypto');
const nodemailer = require('nodemailer'); // For sending OTP via email
const User = require('../models/User');

// Generate a random OTP
const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// Send OTP to user's email
const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  });
};

// Save OTP and send email
const generateAndSendOtp = async (user) => {
  const otp = generateOtp();
  user.otp = otp;
  user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
  await user.save();
  await sendOtpEmail(user.email, otp);
};

module.exports = { generateAndSendOtp };
