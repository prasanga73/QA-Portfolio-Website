import React from 'react';

export default function TabsNav({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'dashboard', label: '◈ Dashboard' },
    { id: 'manual', label: 'Manual & RTM' },
    { id: 'automation', label: 'Web UI Automation' },
    { id: 'api', label: 'REST API Testing' },
    { id: 'performance', label: 'JMeter Load Testing' }
  ];

  return (
    <div className="tabs-nav">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab-trigger ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
