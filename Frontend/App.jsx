
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './Navigation';
import Dashboard from './Dashboard';
import NewAnalysisForm from './NewAnalysisForm';
import AnalysisProgress from './AnalysisProgress';
import ReportsPage from './ReportsPage';
import Profile from './Profile';

function App() {
  return (
    <Router>
      <Navigation />
      <div style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new-analysis" element={<NewAnalysisForm />} />
          <Route path="/progress" element={<AnalysisProgress currentStep={0} />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
