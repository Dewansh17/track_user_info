const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const loginHistoryRoutes = require('./routes/loginHistoryRoutes');
const connectDB = require('./config/db');
const otpRoutes=require('./routes/otpRoutes');
dotenv.config();
connectDB();



const PORT = process.env.PORT || 2000; 
const app = express();

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/login-history',loginHistoryRoutes); // Routes for getLoginHistory);
app.use('./api/auth/otp',otpRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  
  // Start server
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  console.log(PORT)
  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  
