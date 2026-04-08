import React, { useState } from 'react';

const Profile = () => {
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    // TODO: Save API key securely (e.g., to localStorage or backend)
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Profile & Settings</h2>
      <form onSubmit={handleSave}>
        <div style={{ marginBottom: 16 }}>
          <label>API Key:</label>
          <input
            type="text"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            style={{ width: '100%' }}
            placeholder="Enter your API key"
          />
        </div>
        <button type="submit" style={{ padding: '0.5rem 1.5rem' }}>Save</button>
        {saved && <span style={{ color: 'green', marginLeft: 12 }}>Saved!</span>}
      </form>
      {/* Add more user preferences here as needed */}
    </div>
  );
};

export default Profile;
