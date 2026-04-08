import React from 'react';

// Example report data structure
const exampleReports = [
  {
    id: 1,
    title: 'Market Report',
    date: '2026-04-08',
    summary: 'Summary of market trends and analysis.',
    link: '#',
  },
  {
    id: 2,
    title: 'Sentiment Report',
    date: '2026-04-08',
    summary: 'Sentiment analysis from news and social media.',
    link: '#',
  },
  {
    id: 3,
    title: 'Investment Plan',
    date: '2026-04-08',
    summary: 'Recommended investment strategies and allocations.',
    link: '#',
  },
];

const ReportsPage = ({ reports = exampleReports }) => {
  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', padding: '2rem' }}>
      <h2>Analysis Reports</h2>
      {reports.length === 0 ? (
        <p>No reports available yet.</p>
      ) : (
        <div>
          {reports.map((report) => (
            <div key={report.id} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, marginBottom: 20 }}>
              <h3>{report.title}</h3>
              <div style={{ color: '#888', fontSize: 14 }}>{report.date}</div>
              <p>{report.summary}</p>
              <a href={report.link} download style={{ color: '#1976d2' }}>
                Download Report
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
