// routes/otpRoutes.js
const express = require('express');
const router = express.Router();
const { verifyOtp } = require('../controllers/otpController');

router.post('/verify', verifyOtp);

module.exports = router;
