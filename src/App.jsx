import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Homepage from './Homepage';
import Leads from './Leads';
import Profile from './Profile';
import Login from './Login';
import Blogs from './Blogs';
import LeadsCal from './LeadsCal';

const App = () => {
  const [leads, setLeads] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
    fetchLeads();
    const interval = setInterval(fetchLeads, 5000); // Auto-update every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/form/leads');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setLeads(data);
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Layout onLogout={handleLogout} /> : <Navigate to="/login" />} >
          <Route index element={<Homepage leads={leads} refreshData={fetchLeads} />} />
          <Route path="leads" element={<Leads leads={leads} refreshData={fetchLeads} />} />
          <Route path="leads-cal" element={<LeadsCal/>} />
          <Route path="profile" element={<Profile />} />
          <Route path="blogs" element={<Blogs />} />
        </Route>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
};

export default App;
