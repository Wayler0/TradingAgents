
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

const Navigation = ({ user, setUser }) => {
  return (
    <nav style={navStyle}>
      {user && <>
        <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
        <Link to="/new-analysis" style={linkStyle}>New Analysis</Link>
        <Link to="/progress" style={linkStyle}>Progress</Link>
        <Link to="/reports" style={linkStyle}>Reports</Link>
        <Link to="/profile" style={linkStyle}>Profile</Link>
        <span style={{ color: '#fff', marginLeft: 16 }}>Hi, {user.username}</span>
        <button style={{ marginLeft: 16 }} onClick={() => setUser(null)}>Logout</button>
      </>}
      {!user && <>
        <Link to="/login" style={linkStyle}>Login</Link>
        <Link to="/register" style={linkStyle}>Register</Link>
      </>}
    </nav>
  );
};

export default Navigation;
