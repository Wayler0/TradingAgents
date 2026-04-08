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

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send form data to backend API
    alert(`Submitted: ${ticker}, ${date}, ${analysts.join(', ')}, ${depth}, ${provider}`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: '2rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>New Analysis</h2>
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
      <button type="submit" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>Start Analysis</button>
    </form>
  );
};

export default NewAnalysisForm;
