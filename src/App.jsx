import React, { useState, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';

import TabsNav from './components/TabsNav';
import Dashboard from './components/Dashboard';
import ManualTestingView from './components/ManualTestingView';
import AutomationView from './components/AutomationView';
import ApiTestingView from './components/ApiTestingView';
import PerformanceView from './components/PerformanceView';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const contentRef = useRef(null);

  const scrollToContent = (tabId) => {
    if (tabId) setActiveTab(tabId);
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="portfolio-app">
      <Header onTabSelect={scrollToContent} />
      
      <main className="container">
        <Hero onExploreClick={() => scrollToContent('dashboard')} />


        <div ref={contentRef} style={{ paddingTop: '20px' }}>
          <div className="section-heading">
            <div className="section-label">Testing Disciplines</div>
            <h2 className="section-title">Verified QA Work & Deliverables</h2>
          </div>

          <TabsNav activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="tab-pane-content" style={{ minHeight: '400px' }}>
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'manual' && <ManualTestingView />}
            {activeTab === 'automation' && <AutomationView />}
            {activeTab === 'api' && <ApiTestingView />}
            {activeTab === 'performance' && <PerformanceView />}
          </div>
        </div>
      </main>

      <Footer onTabSelect={scrollToContent} />
    </div>
  );
}
