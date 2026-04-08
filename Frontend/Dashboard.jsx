import React from 'react';

const Dashboard = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>TradingAgents Dashboard</h1>
      <p>Welcome! Here you can view recent analyses and reports, or start a new analysis.</p>
      {/* Add summary cards, recent activity, and quick links here */}
      <div style={{ marginTop: '2rem' }}>
        <button style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
          Start New Analysis
        </button>
      </div>
      {/* Recent Reports Section (placeholder) */}
      <div style={{ marginTop: '3rem' }}>
        <h2>Recent Reports</h2>
        <ul>
          <li>No recent reports yet.</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
