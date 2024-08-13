// server/controllers/loginHistoryController.js
const LoginHistory = require('../models/LoginHistory');

exports.getLoginHistory = async (req, res) => {
  const { userId } = req.params;
  console.log("hello",userId)
  try {
    const history = await LoginHistory.find({ userId }).sort({ createdAt: -1 });
    console.log(history)
    res.json({ success: true, history });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
