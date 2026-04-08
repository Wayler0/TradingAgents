import React, { useState } from 'react';

const analystOptions = [
  { label: 'Market Analyst', value: 'market' },
  { label: 'Social Media Analyst', value: 'social' },
  { label: 'News Analyst', value: 'news' },
  { label: 'Fundamentals Analyst', value: 'fundamentals' },
];

const researchDepthOptions = [
  { label: 'Shallow - Quick research', value: 'shallow' },
  { label: 'Medium - Balanced', value: 'medium' },
  { label: 'Deep - In-depth, more debate', value: 'deep' },
];

const llmProviders = [
  { label: 'OpenAI', value: 'openai' },
  { label: 'Google', value: 'google' },
  { label: 'Anthropic', value: 'anthropic' },
];

const NewAnalysisForm = () => {
  const [ticker, setTicker] = useState('SPY');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [analysts, setAnalysts] = useState([]);
  const [depth, setDepth] = useState('shallow');
  const [provider, setProvider] = useState('openai');

  const handleAnalystChange = (e) => {
    const { value, checked } = e.target;
    setAnalysts((prev) =>
      checked ? [...prev, value] : prev.filter((a) => a !== value)
    );
  };


  const [loading, setLoading] = useState(false);
  const [taskId, setTaskId] = useState(null);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setProgress(null);
    setTaskId(null);
    try {
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticker,
          analysis_date: date,
          analysts,
          research_depth: depth,
          llm_provider: provider,
          shallow_thinker: provider, // Placeholder, adjust as needed
          deep_thinker: provider,    // Placeholder, adjust as needed
        })
      });
      const data = await response.json();
      if (data.task_id) {
        setTaskId(data.task_id);
        pollProgress(data.task_id);
      } else {
        setError('Failed to start analysis.');
      }
    } catch (err) {
      setError('Error connecting to backend.');
    }
    setLoading(false);
  };

  const pollProgress = (taskId) => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/progress/${taskId}`);
        const data = await res.json();
        setProgress(data);
        if (data.status === 'completed' || data.status === 'error') {
          clearInterval(interval);
        }
      } catch (err) {
        setError('Error polling progress.');
        clearInterval(interval);
      }
    }, 2000);
  };

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>New Analysis</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>Ticker Symbol:</label>
          <input value={ticker} onChange={e => setTicker(e.target.value)} style={{ width: '100%' }} required />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Analysis Date:</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ width: '100%' }} required />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Analyst Team:</label>
          <div>
            {analystOptions.map(opt => (
              <label key={opt.value} style={{ marginRight: 12 }}>
                <input
                  type="checkbox"
                  value={opt.value}
                  checked={analysts.includes(opt.value)}
                  onChange={handleAnalystChange}
                /> {opt.label}
              </label>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Research Depth:</label>
          <div>
            {researchDepthOptions.map(opt => (
              <label key={opt.value} style={{ marginRight: 12 }}>
                <input
                  type="radio"
                  name="depth"
                  value={opt.value}
                  checked={depth === opt.value}
                  onChange={e => setDepth(e.target.value)}
                /> {opt.label}
              </label>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>LLM Provider:</label>
          <select value={provider} onChange={e => setProvider(e.target.value)} style={{ width: '100%' }}>
            {llmProviders.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <button type="submit" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }} disabled={loading}>
          {loading ? 'Starting...' : 'Start Analysis'}
        </button>
      </form>
      {error && <div style={{ color: 'red', marginTop: 16 }}>{error}</div>}
      {taskId && <div style={{ marginTop: 16 }}>Task ID: {taskId}</div>}
      {progress && (
        <div style={{ marginTop: 16 }}>
          <div>Status: {progress.status}</div>
          {progress.status === 'completed' && (
            <pre style={{ background: '#f4f4f4', padding: 12, borderRadius: 4, maxHeight: 200, overflow: 'auto' }}>
              {JSON.stringify(progress.result, null, 2)}
            </pre>
          )}
          {progress.status === 'error' && (
            <div style={{ color: 'red' }}>Error: {progress.result}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default NewAnalysisForm;
