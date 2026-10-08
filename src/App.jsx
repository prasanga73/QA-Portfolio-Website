import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/Footer';
import PointerTrail from './components/PointerTrail';

const THEME_STORAGE_KEY = 'qa-portfolio-theme';

export default function App() {
  // index.html picks the starting theme before first paint: the saved choice, else the system setting.
  const [theme, setTheme] = useState(() => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // Theme still works for the current session when storage is unavailable.
    }
  };

  return (
    <div className="portfolio-app">
      <a href="#main" className="skip-link">Skip to content</a>
      <PointerTrail />
      <Header theme={theme} onThemeToggle={toggleTheme} />

      <main id="main" className="container" tabIndex={-1}>
        <Hero />
        <Stats />
        <SkillsSection />
        <ProjectsSection />
      </main>

      <Footer />
    </div>
  );
}
