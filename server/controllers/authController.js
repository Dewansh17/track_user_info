// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const LoginHistory = require('../models/LoginHistory');

exports.login = async (req, res) => {
  const { email, password, deviceInfo } = req.body;
  const ip = req.ip;
  const currentHour = new Date().getHours();

  try {
    if (!deviceInfo) {
      return res.status(400).json({ message: 'Device information is missing' });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Restrict mobile access between 10 AM and 1 PM
    if (deviceInfo.isMobile && (currentHour >= 10 && currentHour < 13)) {
      return res.status(403).json({ message: 'Mobile access restricted between 10 AM and 1 PM' });
    }

    // Save login history
    const loginHistory = new LoginHistory({
      userId: user._id,
      ipAddress: ip,
      deviceInfo: JSON.stringify(deviceInfo),
      date: new Date(),      
    });
    await loginHistory.save();

    // Update user's login history
    user.loginHistory.push(loginHistory._id);
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ success: true, token, user, deviceInfo });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
