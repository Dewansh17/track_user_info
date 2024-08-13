import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
import axios from 'axios'

const Dashboard = () => {
  const { auth } = useContext(AuthContext);
  const [loginHistory, setLoginHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate('/auth');
    } else {
      const fetchLoginHistory = async () => {
        try {
          const response = await axios.get(`http://localhost:2000/api/login-history/history/${auth._id}`, {
            withCredentials: true,
            headers: {
              'Authorization': `Bearer ${auth.resetPasswordToken}` // Assuming you have an auth token
            }
          });
          setLoginHistory(response.data.history);
        } catch (error) {
          console.error('Failed to fetch login history', error);
        }
      };
      fetchLoginHistory();
    }
  }, [auth, navigate]);

  return (
    <div className="dashboard-container">
      <h2>Welcome, {auth?.name}</h2>
      <h3>Login History</h3>
      <ul>
      {loginHistory && loginHistory.length > 0 ? (
  loginHistory?.map((entry, index) => (
    <li key={index}>
      <span>{new Date(entry.date).toLocaleString()}</span>
      <span>{entry.ipAddress}</span>
      <span>{entry.deviceInfo}</span>
    </li>
  ))
) : (
  <li>No login history available</li>
)}

      </ul>
    </div>
  );
};

export default Dashboard;
