
import React from 'react';
import { Link } from 'react-router-dom';

const navStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '2rem',
  background: '#222',
  color: '#fff',
  padding: '1rem 0',
  fontSize: '1.1rem',
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontWeight: 'bold',
};

const Navigation = () => {
  return (
    <nav style={navStyle}>
      <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
      <Link to="/new-analysis" style={linkStyle}>New Analysis</Link>
      <Link to="/progress" style={linkStyle}>Progress</Link>
      <Link to="/reports" style={linkStyle}>Reports</Link>
      <Link to="/profile" style={linkStyle}>Profile</Link>
    </nav>
  );
};

export default Navigation;
