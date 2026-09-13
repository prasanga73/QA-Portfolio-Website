import React from 'react';
import { personalInfo } from '../data/portfolioData';

export default function Header({ onTabSelect }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand-mark">
          <span className="name">{personalInfo.name}</span>
          <span className="role-tag">QA & Automation</span>
        </div>

        <nav className="nav-menu">
          <button className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => onTabSelect('manual')}>
            Manual & RTM
          </button>
          <button className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => onTabSelect('automation')}>
            Automation
          </button>
          <button className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => onTabSelect('api')}>
            API Testing
          </button>
          <button className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => onTabSelect('performance')}>
            Performance
          </button>
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="nav-link" style={{ textDecoration: 'none' }}>
            GitHub ↗
          </a>
          <a href={`mailto:${personalInfo.email}`} className="nav-cta">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
