import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Login successful!');
        setUser({ username: data.username, email: data.email });
        setTimeout(() => navigate('/dashboard'), 500);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Error connecting to backend');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '2rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Login</h2>
      <div style={{ marginBottom: 16 }}>
        <label>Username:</label>
        <input value={username} onChange={e => setUsername(e.target.value)} required style={{ width: '100%' }} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>Password:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%' }} />
      </div>
      <button type="submit" disabled={loading} style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <div style={{ color: 'red', marginTop: 16 }}>{error}</div>}
      {success && <div style={{ color: 'green', marginTop: 16 }}>{success}</div>}
      <div style={{ marginTop: 16 }}>
        Don't have an account? <Link to="/register">Register</Link>
      </div>
    </form>
  );
};

export default LoginForm;
