
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './Navigation';
import Dashboard from './Dashboard';
import NewAnalysisForm from './NewAnalysisForm';
import AnalysisProgress from './AnalysisProgress';
import ReportsPage from './ReportsPage';
import Profile from './Profile';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  return (
    <Router>
      <Navigation user={user} setUser={setUser} />
      <div style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" replace />} />
          <Route path="/new-analysis" element={user ? <NewAnalysisForm /> : <Navigate to="/login" replace />} />
          <Route path="/progress" element={user ? <AnalysisProgress currentStep={0} /> : <Navigate to="/login" replace />} />
          <Route path="/reports" element={user ? <ReportsPage /> : <Navigate to="/login" replace />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" replace />} />
          <Route path="/register" element={<RegisterForm setUser={setUser} />} />
          <Route path="/login" element={<LoginForm setUser={setUser} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
