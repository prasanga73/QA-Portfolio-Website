import React, { useState } from 'react';
import { darazTestCases, secondTestCases, GITHUB_LINKS } from '../data/portfolioData';

export default function ManualTestingView() {
  const [activeSuite, setActiveSuite] = useState('daraz'); // 'daraz' or 'second'
  const [searchTerm, setSearchTerm] = useState('');
  const [secFilter, setSecFilter] = useState('All');

  const activeCases = activeSuite === 'daraz' ? darazTestCases : secondTestCases;

  const filteredCases = activeCases.filter(tc => {
    const matchesCategory = activeSuite !== 'second' || secFilter === 'All' || tc.category === secFilter;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = tc.title.toLowerCase().includes(searchLower) ||
                          tc.id.toLowerCase().includes(searchLower) ||
                          tc.reqId.toLowerCase().includes(searchLower) ||
                          tc.scenarioId.toLowerCase().includes(searchLower);
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Overview Cards */}
      <div className="cards-grid-2">
        <div className="natural-card">
          <div className="card-category">Folder: Manual Test Cases /Daraz Manual/</div>
          <h3 className="card-heading">Daraz.com.np Search & Filters</h3>
          <p className="card-text">
            Derived directly from formal requirement specification <code>REQ-DZ-SEARCH-01</code>. Covers search keyword handling, auto-suggestions, multi-attribute filter compounding, and catalog sorting algorithms.
          </p>
          <ul className="bullet-points">
            <li><strong>Requirement Traceability Matrix (RTM):</strong> Bidirectional mapping across 17 test scenarios and functional requirements (REQ-01 to REQ-17).</li>
            <li><strong>Compound Filter Matrix:</strong> Validated simultaneous filter logic (Price range + Brand + Customer rating 4★+).</li>
            <li><strong>Data Integrity & Edge Cases:</strong> Covered case insensitivity, whitespace trimming, and empty states.</li>
          </ul>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a 
              href={GITHUB_LINKS.manualDarazDir}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-natural btn-natural-primary"
            >
              View Directory on GitHub ↗
            </a>
            <a 
              href={GITHUB_LINKS.darazExcel}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-natural btn-natural-outline"
            >
              DarazTestCases.xlsx ↗
            </a>
            <a 
              href={GITHUB_LINKS.darazPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-natural btn-natural-outline"
            >
              Requirements PDF ↗
            </a>
          </div>
        </div>

        <div className="natural-card">
          <div className="card-category">Folder: Manual Test Cases /Second/</div>
          <h3 className="card-heading">Enterprise Auth & Security Suite</h3>
          <p className="card-text">
            Comprehensive audit of user authentication modules, field validations, inactivity timeouts, and application resistance against OWASP vulnerabilities.
          </p>
          <ul className="bullet-points">
            <li><strong>SQL Injection (SQLi):</strong> Input field sanitization tested with injection literals (<code>' OR 1=1 --</code>).</li>
            <li><strong>Cross-Site Scripting (XSS):</strong> Verification of script tag entity encoding (<code>&lt;script&gt;alert(1)&lt;/script&gt;</code>).</li>
            <li><strong>Brute-Force Attack Mitigation:</strong> Account lockout threshold activation after multiple failed login attempts.</li>
            <li><strong>Session Management:</strong> Inactivity timeout detection and visual masking in password fields.</li>
          </ul>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a 
              href={GITHUB_LINKS.manualSecurityDir}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-natural btn-natural-primary"
            >
              View Directory on GitHub ↗
            </a>
            <a 
              href={GITHUB_LINKS.securityExcel}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-natural btn-natural-outline"
            >
              AssignmentEdited.xlsx ↗
            </a>
          </div>
        </div>
      </div>

      {/* Separated Test Case Explorer */}
      <div className="section-heading" style={{ marginTop: '44px' }}>
        <div className="section-label">Documented Test Case Explorer</div>
        <h3 style={{ fontSize: '1.4rem' }}>
          {activeSuite === 'daraz' ? 'Daraz Manual Test Cases (17 Scenarios)' : 'Second Folder: Enterprise Auth & Security Cases'}
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
          {activeSuite === 'daraz' 
            ? 'Source: Manual Test Cases /Daraz Manual/DarazTestCases.xlsx · Scenarios TS-01 through TS-17' 
            : 'Source: Manual Test Cases /Second/AssignmentEdited.xlsx · Scenarios TS-01 through TS-09'}
        </p>
      </div>

      {/* Suite Tabs (Separating Daraz from Second) */}
      <div style={{ display: 'flex', gap: '10px', margin: '20px 0 16px', flexWrap: 'wrap' }}>
        <button
          onClick={() => { setActiveSuite('daraz'); setSearchTerm(''); }}
          className={`btn-natural ${activeSuite === 'daraz' ? 'btn-natural-primary' : 'btn-natural-outline'}`}
          style={{ padding: '8px 18px', fontWeight: activeSuite === 'daraz' ? 600 : 400 }}
        >
          Daraz Manual Suite ({darazTestCases.length} Cases · TC-01 to TC-17)
        </button>
        <button
          onClick={() => { setActiveSuite('second'); setSearchTerm(''); }}
          className={`btn-natural ${activeSuite === 'second' ? 'btn-natural-primary' : 'btn-natural-outline'}`}
          style={{ padding: '8px 18px', fontWeight: activeSuite === 'second' ? 600 : 400 }}
        >
          Second Folder Suite ({secondTestCases.length} Cases · Auth & Security)
        </button>
      </div>

      {/* Search and Secondary Filter Row */}
      <div className="filter-row">
        {activeSuite === 'second' && (
          <div className="filter-pills">
            {['All', 'Authentication', 'Security'].map(cat => (
              <button
                key={cat}
                className={`filter-pill-btn ${secFilter === cat ? 'active' : ''}`}
                onClick={() => setSecFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
        <input
          type="text"
          className="search-box"
          placeholder={activeSuite === 'daraz' ? "Search Daraz test cases (e.g. TC-07, Price, TS-13)..." : "Search Second folder cases (e.g. SQL, Lockout, TC-05)..."}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Test Cases Table */}
      <div className="table-wrapper">
        <table className="natural-table">
          <thead>
            <tr>
              <th style={{ width: '90px' }}>Case ID</th>
              <th style={{ width: '90px' }}>Scenario</th>
              <th style={{ width: '90px' }}>Req ID</th>
              <th>Test Case Title & Verification Objective</th>
              {activeSuite === 'second' && <th style={{ width: '120px' }}>Category</th>}
              <th style={{ width: '90px' }}>Priority</th>
              <th style={{ width: '80px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredCases.map(tc => (
              <tr key={`${activeSuite}-${tc.id}`}>
                <td>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 600 }}>
                    {tc.id}
                  </span>
                </td>
                <td>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {tc.scenarioId}
                  </span>
                </td>
                <td>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    {tc.reqId}
                  </span>
                </td>
                <td>
                  <div style={{ fontWeight: 500, marginBottom: '4px' }}>{tc.title}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <strong>Expected:</strong> {tc.expected}
                  </div>
                </td>
                {activeSuite === 'second' && (
                  <td>
                    <span className={`tag-pill ${tc.category === 'Security' ? 'tag-rose' : 'tag-slate'}`}>
                      {tc.category}
                    </span>
                  </td>
                )}
                <td>
                  <span className={`tag-pill ${tc.priority === 'High' ? 'tag-rose' : 'tag-terracotta'}`}>
                    {tc.priority}
                  </span>
                </td>
                <td>
                  <span className="tag-pill tag-sage">
                    {tc.status}
                  </span>
                </td>
              </tr>
            ))}
            {filteredCases.length === 0 && (
              <tr>
                <td colSpan={activeSuite === 'second' ? 7 : 6} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                  No test cases matched your search query.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
