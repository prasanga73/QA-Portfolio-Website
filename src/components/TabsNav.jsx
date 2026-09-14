import React from 'react';

export default function TabsNav({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'dashboard', number: '01', label: 'Overview' },
    { id: 'manual', number: '02', label: 'Manual & RTM' },
    { id: 'automation', number: '03', label: 'UI Automation' },
    { id: 'api', number: '04', label: 'REST API' },
    { id: 'performance', number: '05', label: 'Load Testing' }
  ];

  return (
    <div className="tabs-nav">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab-trigger ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          <span className="tab-number">{tab.number}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
}
