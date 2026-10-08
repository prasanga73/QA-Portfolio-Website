import { Moon, Sun } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Header({ theme, onThemeToggle }) {
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand-mark">
          <span className="brand-index">QA / 2026</span>
          <span className="name">{personalInfo.name}</span>
          <span className="role-tag">QA & Automation</span>
        </div>

        <nav className="nav-menu" aria-label="Primary">
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#work" className="nav-link">Work</a>
          <a href="#contact" className="nav-link">Contact</a>
          <a href={personalInfo.resume} target="_blank" rel="noopener noreferrer" className="nav-link">Resume</a>
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="nav-link">GitHub</a>
          <button
            type="button"
            className="theme-toggle"
            onClick={onThemeToggle}
            aria-label={`Switch to ${nextTheme} theme`}
            title={`Switch to ${nextTheme} theme`}
          >
            {theme === 'dark' ? <Sun size={16} strokeWidth={1.8} /> : <Moon size={16} strokeWidth={1.8} />}
          </button>
        </nav>
      </div>
    </header>
  );
}
