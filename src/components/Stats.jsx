import React from 'react';
import { metrics } from '../data/portfolioData';

export default function Stats() {
  return (
    <div className="metrics-strip">
      {metrics.map((m, idx) => (
        <div key={idx} className="metric-item">
          <div className="metric-number">{m.value}</div>
          <div className="metric-title">{m.label}</div>
          <div className="metric-desc">{m.note}</div>
        </div>
      ))}
    </div>
  );
}
