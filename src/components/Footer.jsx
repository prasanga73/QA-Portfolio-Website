import React from 'react';
import { personalInfo, GITHUB_LINKS } from '../data/portfolioData';

export default function Footer({ onTabSelect }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-links">
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }} onClick={() => onTabSelect('manual')}>
            Manual & RTM
          </button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }} onClick={() => onTabSelect('automation')}>
            Automation Frameworks
          </button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }} onClick={() => onTabSelect('api')}>
            API Testing
          </button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }} onClick={() => onTabSelect('performance')}>
            JMeter Benchmarks
          </button>
          <a href={GITHUB_LINKS.repo} target="_blank" rel="noopener noreferrer">
            GitHub Repository ↗
          </a>
        </div>
        <p>
          © {new Date().getFullYear()} {personalInfo.name} · {personalInfo.training} · {personalInfo.location}
        </p>
      </div>
    </footer>
  );
}
