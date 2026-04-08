import React from 'react';

const steps = [
  'Analyst Team',
  'Research Team',
  'Trader',
  'Risk Management',
  'Portfolio Management',
  'Complete',
];

const AnalysisProgress = ({ currentStep = 0 }) => {
  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h2>Analysis Progress</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {steps.map((step, idx) => (
          <div key={step} style={{ textAlign: 'center', flex: 1 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: idx <= currentStep ? '#4caf50' : '#ccc',
                color: '#fff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                fontWeight: 'bold',
              }}
            >
              {idx + 1}
            </div>
            <div style={{ marginTop: 8, fontSize: 14 }}>{step}</div>
            {idx < steps.length - 1 && (
              <div
                style={{
                  height: 4,
                  background: idx < currentStep ? '#4caf50' : '#ccc',
                  margin: '0 8px',
                  borderRadius: 2,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalysisProgress;
