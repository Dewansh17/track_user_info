import React from 'react';
import { BrowserRouter as Router, Routes, Route , Navigate} from 'react-router-dom';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<Navigate to="/auth" />} /> {/* Redirect root to /auth */}
    </Routes>
  </Router>
);

export default AppRoutes;
