// server/routes/loginHistoryRoutes.js
const express = require('express');
const { getLoginHistory } = require('../controllers/loginHistoryController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/history/:userId',getLoginHistory);

module.exports = router;
