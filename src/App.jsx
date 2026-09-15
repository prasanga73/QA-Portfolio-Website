import React, { useEffect, useState, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/Footer';
import PointerTrail from './components/PointerTrail';

export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('qa-portfolio-theme') || 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('qa-portfolio-theme', theme);
    } catch {
      // Theme still works for the current session when storage is unavailable.
    }
  }, [theme]);

  return (
    <div className="portfolio-app">
      <PointerTrail />
      <Header theme={theme} onThemeToggle={() => setTheme(currentTheme => currentTheme === 'dark' ? 'light' : 'dark')} />
      
      <main className="container">
        <Hero />
        <SkillsSection />
        <ProjectsSection />
      </main>

      <Footer />
    </div>
  );
}
