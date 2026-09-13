import React from 'react';
import { jmeterScenarios, GITHUB_LINKS } from '../data/portfolioData';

export default function PerformanceView() {
  return (
    <div>
      <div className="cards-grid-2">
        <div className="natural-card">
          <div className="card-category">Load & Stress Engineering · JMeter</div>
          <h3 className="card-heading">RemoteAxle API Concurrency Benchmarking</h3>
          <p className="card-text">
            Conducted multi-scenario load testing using Apache JMeter to evaluate authentication and user profile retrieval endpoints under increasing concurrency thresholds.
          </p>
          <ul className="bullet-points">
            <li><strong>Chained Request Architecture:</strong> <code>POST /login</code> extracts JWT bearer token via JSON Extractor and injects it into downstream <code>GET /users/profile</code> requests.</li>
            <li><strong>Data-Driven Parameterization:</strong> Utilized <code>data.csv</code> with 10 credential pairs, including 1 deliberate invalid entry to establish a baseline 10.0% error rate.</li>
            <li><strong>Think Time Simulation:</strong> Configured Uniform Random Timer (2000ms base offset + 1000ms max random delay) to model authentic human interactions.</li>
          </ul>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '20px' }}>
            <a 
              href={GITHUB_LINKS.jmeterDir}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-natural btn-natural-primary"
            >
              View Directory on GitHub ↗
            </a>
            <a 
              href={GITHUB_LINKS.jmeterPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-natural btn-natural-outline"
            >
              Formal PDF Report ↗
            </a>
            <a 
              href={GITHUB_LINKS.jmeterJmx}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-natural btn-natural-outline"
            >
              QA TechAxis.jmx ↗
            </a>
          </div>
        </div>

        <div className="natural-card">
          <div className="card-category">Performance Engineering Findings</div>
          <h3 className="card-heading">Token Bottleneck & Latency Analysis</h3>
          <p className="card-text">
            Evaluation across 5 scenarios revealed critical insights for backend engineering teams:
          </p>
          <ul className="bullet-points">
            <li><strong>Auth Token Bottleneck:</strong> While Login API errors held constant at 10.0% across all runs, Profile API errors exploded to <strong>91.35% – 93.40%</strong> under concurrent load, identifying a severe bottleneck in downstream token authorization rather than credential validity.</li>
            <li><strong>Latency Spike at 200 Threads:</strong> Average login response time degraded from 754ms to <strong>3,930ms</strong>, with 99th percentile reaching <strong>5,905ms</strong> and peak maximum hitting <strong>9,389ms</strong>.</li>
            <li><strong>Ramp-Up Tuning:</strong> Extending ramp-up time to 100s in Scenario 5 permitted 20,000 requests to complete with an average latency of only 544ms.</li>
          </ul>
        </div>
      </div>

      {/* Scenario Benchmark Table */}
      <div className="section-heading" style={{ marginTop: '40px' }}>
        <div className="section-label">Empirical Benchmark Data</div>
        <h3 style={{ fontSize: '1.4rem' }}>Load Execution Scenarios</h3>
      </div>

      <div className="table-wrapper">
        <table className="natural-table">
          <thead>
            <tr>
              <th style={{ width: '130px' }}>Scenario</th>
              <th style={{ width: '90px' }}>Threads</th>
              <th style={{ width: '90px' }}>Ramp-Up</th>
              <th style={{ width: '100px' }}>Samples</th>
              <th style={{ width: '100px' }}>Login Avg</th>
              <th style={{ width: '100px' }}>Profile Avg</th>
              <th style={{ width: '100px' }}>Login Err</th>
              <th style={{ width: '100px' }}>Profile Err</th>
              <th>Key Performance Observation</th>
            </tr>
          </thead>
          <tbody>
            {jmeterScenarios.map(sc => (
              <tr key={sc.id}>
                <td>
                  <div style={{ fontWeight: 600 }}>{sc.id}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{sc.name}</div>
                </td>
                <td>{sc.threads}</td>
                <td>{sc.rampUp}</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>{sc.samples.toLocaleString()}</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>{sc.loginAvg} ms</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>{sc.profileAvg} ms</td>
                <td>
                  <span className={`tag-pill ${sc.loginErr === '0.0%' ? 'tag-sage' : 'tag-slate'}`}>
                    {sc.loginErr}
                  </span>
                </td>
                <td>
                  <span className={`tag-pill ${parseFloat(sc.profileErr) > 50 ? 'tag-rose' : 'tag-sage'}`}>
                    {sc.profileErr}
                  </span>
                </td>
                <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  {sc.summary}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
