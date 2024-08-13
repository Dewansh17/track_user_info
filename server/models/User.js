// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  loginHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LoginHistory' }]
});

module.exports = mongoose.model('User', userSchema);
