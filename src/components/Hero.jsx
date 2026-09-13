import React from 'react';
import { personalInfo } from '../data/portfolioData';

export default function Hero({ onExploreClick }) {
  return (
    <section className="hero-section">
      <div className="hero-meta">
        <span className="status-badge">
          <span>●</span> Certified by TechAxis (Nepal)
        </span>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          {personalInfo.location}
        </span>
      </div>

      <h1 className="hero-title">
        Deliberate, robust <em>quality engineering</em> from specification to load.
      </h1>

      <p className="hero-summary">
        {personalInfo.bio}
      </p>

      <div className="hero-actions">
        <button className="btn-natural btn-natural-primary" onClick={onExploreClick}>
          Explore Test Suites ↓
        </button>
      </div>
    </section>
  );
}
