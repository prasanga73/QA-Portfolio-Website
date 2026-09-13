import React, { useState, useEffect } from 'react';
import {
  darazTestCases,
  secondTestCases,
  jmeterScenarios,
  apiEndpoints,
  metrics
} from '../data/portfolioData';

/* ── Tiny helpers ─────────────────────────────────────────── */
const all = [...darazTestCases, ...secondTestCases];
const total = all.length;
const darazCount = darazTestCases.length;
const secCount = secondTestCases.length;
const passCount = all.filter(t => t.status === 'Pass').length;
const failCount = total - passCount;
const passRate = Math.round((passCount / total) * 100);

const highCount = all.filter(t => t.priority === 'High').length;
const medCount = all.filter(t => t.priority === 'Medium').length;

const authCount = secondTestCases.filter(t => t.category === 'Authentication').length;
const securityCount = secondTestCases.filter(t => t.category === 'Security').length;

const apiMethods = apiEndpoints.reduce((acc, ep) => {
  acc[ep.method] = (acc[ep.method] || 0) + 1;
  return acc;
}, {});

/* ── Donut component (pure SVG) ───────────────────────────── */
function Donut({ segments, size = 120, stroke = 14, label }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="dash-donut-wrap">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {segments.map((seg, i) => {
          const dash = (seg.value / 100) * c;
          const el = (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={stroke}
              strokeDasharray={`${dash} ${c - dash}`}
              strokeDashoffset={-offset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dasharray 0.8s ease, stroke-dashoffset 0.8s ease' }}
            />
          );
          offset += dash;
          return el;
        })}
      </svg>
      <div className="dash-donut-label">{label}</div>
    </div>
  );
}

/* ── Animated counter ─────────────────────────────────────── */
function AnimNum({ value }) {
  const [cur, setCur] = useState(0);
  const strVal = String(value);
  const numPart = strVal.replace(/[^0-9]/g, '');
  const suffix = strVal.replace(/[0-9,]/g, '');
  
  useEffect(() => {
    const target = parseInt(numPart, 10);
    if (isNaN(target)) { setCur(strVal); return; }
    let raf;
    const dur = 900;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / dur, 1);
      setCur(Math.round(target * t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <>{typeof cur === 'number' ? cur.toLocaleString() : cur}{suffix}</>;
}

/* ── Sparkline (JMeter latency) ───────────────────────────── */
function Sparkline({ data, height = 52, color = 'var(--accent-sage)' }) {
  const max = Math.max(...data);
  const w = 200;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = height - (v / max) * (height - 8);
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="dash-sparkline" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,${height} ${pts} ${w},${height}`}
        fill="url(#sparkGrad)"
      />
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {data.map((v, i) => {
        const x = (i / (data.length - 1)) * w;
        const y = height - (v / max) * (height - 8);
        return (
          <circle key={i} cx={x} cy={y} r="3.5" fill="var(--bg-card)" stroke={color} strokeWidth="2" />
        );
      })}
    </svg>
  );
}

/* ── Horizontal bar ───────────────────────────────────────── */
function HBar({ label, value, max, color, suffix = '' }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="dash-hbar">
      <div className="dash-hbar-head">
        <span className="dash-hbar-label">{label}</span>
        <span className="dash-hbar-val">{value}{suffix}</span>
      </div>
      <div className="dash-hbar-track">
        <div className="dash-hbar-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   DASHBOARD
   ══════════════════════════════════════════════════════════════ */
export default function Dashboard() {
  const [selectedScenario, setSelectedScenario] = useState(0);

  const loginAvgs = jmeterScenarios.map(s => s.loginAvg);
  const profileErrs = jmeterScenarios.map(s => parseFloat(s.profileErr));

  return (
    <div className="dash">
      {/* ── Row 1: Quick stats ─────────────────────────────── */}
      <div className="dash-stats-row">
        {metrics.map((m, i) => (
          <div key={i} className="dash-stat-card">
            <div className="dash-stat-value"><AnimNum value={m.value} /></div>
            <div className="dash-stat-label">{m.label}</div>
          </div>
        ))}
      </div>

      {/* ── Row 2: Donut + Breakdown ───────────────────────── */}
      <div className="dash-grid-2">
        {/* Test Case Distribution */}
        <div className="natural-card dash-card">
          <div className="card-category">Test Distribution</div>
          <h3 className="card-heading" style={{ fontSize: '1.15rem' }}>Case Composition</h3>

          <div className="dash-donut-row">
            <Donut
              size={130}
              stroke={16}
              label={`${total} Total`}
              segments={[
                { value: (darazCount / total) * 100, color: 'var(--accent-sage)' },
                { value: (secCount / total) * 100, color: 'var(--accent-terracotta)' }
              ]}
            />
            <div className="dash-legend">
              <div className="dash-legend-item">
                <span className="dash-dot" style={{ background: 'var(--accent-sage)' }} />
                <span>Daraz Search &amp; Filters</span>
                <strong>{darazCount}</strong>
              </div>
              <div className="dash-legend-item">
                <span className="dash-dot" style={{ background: 'var(--accent-terracotta)' }} />
                <span>Auth &amp; Security</span>
                <strong>{secCount}</strong>
              </div>

              <div className="dash-legend-divider" />

              <div className="dash-legend-item">
                <span className="dash-dot" style={{ background: '#22c55e' }} />
                <span>Pass</span>
                <strong>{passCount}</strong>
              </div>
              <div className="dash-legend-item">
                <span className="dash-dot" style={{ background: 'var(--accent-rose)' }} />
                <span>Fail</span>
                <strong>{failCount}</strong>
              </div>
            </div>
          </div>

          {/* Pass rate bar */}
          <div className="dash-pass-bar">
            <div className="dash-pass-bar-label">
              <span>Pass Rate</span>
              <strong>{passRate}%</strong>
            </div>
            <div className="dash-pass-track">
              <div className="dash-pass-fill" style={{ width: `${passRate}%` }} />
            </div>
          </div>
        </div>

        {/* Priority & Category Breakdown */}
        <div className="natural-card dash-card">
          <div className="card-category">Quality Breakdown</div>
          <h3 className="card-heading" style={{ fontSize: '1.15rem' }}>Priority &amp; Categories</h3>

          <div className="dash-breakdown">
            <div className="dash-breakdown-section">
              <div className="dash-breakdown-title">By Priority</div>
              <HBar label="High" value={highCount} max={total} color="var(--accent-rose)" />
              <HBar label="Medium" value={medCount} max={total} color="var(--accent-terracotta)" />
            </div>

            <div className="dash-breakdown-section">
              <div className="dash-breakdown-title">Auth &amp; Security Suite</div>
              <HBar label="Authentication" value={authCount} max={secCount} color="var(--accent-slate)" />
              <HBar label="Security" value={securityCount} max={secCount} color="var(--accent-rose)" />
            </div>

            <div className="dash-breakdown-section">
              <div className="dash-breakdown-title">API Methods Tested</div>
              {Object.entries(apiMethods).map(([method, count]) => (
                <HBar
                  key={method}
                  label={method}
                  value={count}
                  max={apiEndpoints.length}
                  color={
                    method === 'GET' ? 'var(--accent-slate)' :
                    method === 'POST' ? 'var(--accent-sage)' :
                    method === 'PUT' ? 'var(--accent-terracotta)' :
                    'var(--accent-rose)'
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Row 3: JMeter Performance ──────────────────────── */}
      <div className="natural-card dash-card dash-perf">
        <div className="dash-perf-header">
          <div>
            <div className="card-category">JMeter Load Testing</div>
            <h3 className="card-heading" style={{ fontSize: '1.15rem' }}>Latency &amp; Error Trend</h3>
          </div>
          <div className="dash-perf-pills">
            {jmeterScenarios.map((sc, i) => (
              <button
                key={sc.id}
                className={`dash-perf-pill ${selectedScenario === i ? 'active' : ''}`}
                onClick={() => setSelectedScenario(selectedScenario === i ? null : i)}
              >
                S{i + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="dash-perf-body">
          <div className="dash-perf-chart">
            <div className="dash-perf-chart-label">Login Avg Latency (ms)</div>
            <Sparkline data={loginAvgs} color="var(--accent-sage)" />
            <div className="dash-spark-labels">
              {jmeterScenarios.map((sc, i) => (
                <span key={i}>{sc.threads}t</span>
              ))}
            </div>
          </div>

          <div className="dash-perf-chart">
            <div className="dash-perf-chart-label">Profile Error Rate (%)</div>
            <Sparkline data={profileErrs} color="var(--accent-rose)" height={52} />
            <div className="dash-spark-labels">
              {jmeterScenarios.map((sc, i) => (
                <span key={i}>{sc.threads}t</span>
              ))}
            </div>
          </div>
        </div>

        {/* Detail card for selected scenario */}
        {selectedScenario !== null && (
          <div className="dash-scenario-detail">
            <div className="dash-scenario-name">
              {jmeterScenarios[selectedScenario].id}: {jmeterScenarios[selectedScenario].name}
            </div>
            <div className="dash-scenario-grid">
              <div className="dash-scenario-stat">
                <span className="dash-scenario-stat-val">{jmeterScenarios[selectedScenario].threads}</span>
                <span className="dash-scenario-stat-label">Threads</span>
              </div>
              <div className="dash-scenario-stat">
                <span className="dash-scenario-stat-val">{jmeterScenarios[selectedScenario].rampUp}</span>
                <span className="dash-scenario-stat-label">Ramp-Up</span>
              </div>
              <div className="dash-scenario-stat">
                <span className="dash-scenario-stat-val">{jmeterScenarios[selectedScenario].samples.toLocaleString()}</span>
                <span className="dash-scenario-stat-label">Samples</span>
              </div>
              <div className="dash-scenario-stat">
                <span className="dash-scenario-stat-val">{jmeterScenarios[selectedScenario].loginAvg}ms</span>
                <span className="dash-scenario-stat-label">Login Avg</span>
              </div>
              <div className="dash-scenario-stat">
                <span className="dash-scenario-stat-val">{jmeterScenarios[selectedScenario].profileErr}</span>
                <span className="dash-scenario-stat-label">Profile Err</span>
              </div>
              <div className="dash-scenario-stat">
                <span className="dash-scenario-stat-val">{jmeterScenarios[selectedScenario].p90}ms</span>
                <span className="dash-scenario-stat-label">p90</span>
              </div>
            </div>
            <p className="dash-scenario-summary">{jmeterScenarios[selectedScenario].summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}
