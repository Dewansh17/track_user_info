import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import './loginHistory.css';

const LoginHistory = () => {
  const [history, setHistory] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchLoginHistory = async () => {
      try {
        const response = await fetch(`http://localhost:2000/api/loginHistory/${auth.userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.token}` // Assuming you are using JWT for authentication
          }
        });
        
        const data = await response.json();
        
        if (response.ok) {
          setHistory(data.loginHistory);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('Error fetching login history:', error);
        alert('Failed to fetch login history. Please try again later.');
      }
    };

    if (auth && auth.userId) {
      fetchLoginHistory();
    }
  }, [auth]);

  return (
    <div className="login-history-container">
      <h2>Login History</h2>
      {history.length > 0 ? (
        <ul>
          {history.map((entry, index) => (
            <li key={index}>
              <p><strong>IP Address:</strong> {entry.ipAddress}</p>
              <p><strong>Device Info:</strong> {entry.deviceInfo}</p>
              <p><strong>Date:</strong> {new Date(entry.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No login history available.</p>
      )}
    </div>
  );
};

export default LoginHistory;
