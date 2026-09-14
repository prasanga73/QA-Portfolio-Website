import React from 'react';
import { personalInfo, GITHUB_LINKS } from '../data/portfolioData';

export default function Footer({ onTabSelect }) {
  return (
    <footer id="contact" className="site-footer">
      <div className="container contact-section" aria-labelledby="contact-title">
        <div className="section-intro">
          <p className="section-kicker">Contact</p>
          <h2 id="contact-title">Open to careful testing work.</h2>
        </div>

        <div className="contact-links">
          <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/prasanga-niraula-7bb8242a6/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={`mailto:${personalInfo.email}?subject=Resume%20request`}>Request resume</a>
        </div>

        <p className="contact-location">{personalInfo.location}</p>
        <p className="footer-note">{personalInfo.training}</p>
      </div>
    </footer>
  );
}
