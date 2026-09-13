import React from 'react';
import { GITHUB_LINKS } from '../data/portfolioData';
import { 
  Workflow, 
  Layers, 
  Camera, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  GitBranch,
  FileText
} from 'lucide-react';

export default function AutomationView() {
  return (
    <div>
      {/* Intro overview banner */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '20px 24px',
        marginBottom: '28px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: 'var(--radius-sm)',
          background: 'var(--accent-sage-light)',
          color: 'var(--accent-sage)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <Layers size={22} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
            UI Test Automation Architecture & Frameworks
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
            Automated test suites built on <strong>Java</strong>, <strong>Selenium WebDriver</strong>, and <strong>TestNG</strong>, structured strictly around the <strong>Page Object Model (POM)</strong>. Designed for high resilience with dynamic test data fixtures, comprehensive decision matrix validation, headless CI/CD execution, and automated failure screenshot listeners logging to <strong>ExtentReports 5</strong> dashboards.
          </p>
        </div>
      </div>

      <div className="cards-grid-2">
        {/* Framework A: SauceDemo */}
        <div className="natural-card">
          <div className="card-category">Framework A · POM & CI/CD Ready</div>
          <h3 className="card-heading">SauceDemo Automation Suite</h3>
          
          <div className="automation-badge-list">
            <span className="automation-tech-pill">Java 17</span>
            <span className="automation-tech-pill">Selenium WebDriver 4</span>
            <span className="automation-tech-pill">TestNG</span>
            <span className="automation-tech-pill">Page Object Model</span>
            <span className="automation-tech-pill">Headless Chrome</span>
            <span className="automation-tech-pill">Maven</span>
          </div>

          <p className="card-text">
            A production-ready e-commerce test suite built for SauceDemo (Swag Labs). It decouples element locators from test logic through the Page Object Model, validating multi-step user journeys and authentication boundary conditions.
          </p>

          {/* Visual Architecture Pipeline */}
          <div className="automation-visual-container">
            <div className="visual-box-header">
              <span className="visual-box-title">
                <Workflow size={14} /> Execution Pipeline
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Headless Container Ready</span>
            </div>
            <div className="pipeline-flow">
              <div className="pipeline-node">
                <span className="pipeline-step-num">Step 1</span>
                <div className="pipeline-node-name">TestNG XML</div>
                <div className="pipeline-node-sub">Suite Runner</div>
              </div>
              <div className="pipeline-node">
                <span className="pipeline-step-num">Step 2</span>
                <div className="pipeline-node-name">BaseTest</div>
                <div className="pipeline-node-sub">Headless Driver</div>
              </div>
              <div className="pipeline-node">
                <span className="pipeline-step-num">Step 3</span>
                <div className="pipeline-node-name">POM Pages</div>
                <div className="pipeline-node-sub">Login · Cart · Store</div>
              </div>
              <div className="pipeline-node">
                <span className="pipeline-step-num">Step 4</span>
                <div className="pipeline-node-name">Assertions</div>
                <div className="pipeline-node-sub">9 Permutations</div>
              </div>
            </div>
          </div>

          <ul className="bullet-points">
            <li>
              <strong>9-Permutation Decision Matrix:</strong> Systematically tests every valid, invalid, and empty credential vector across usernames and passwords, asserting exact application behavior for each case.
            </li>
            <li>
              <strong>Cart State Machine Integrity:</strong> Validates dynamic state transitions—adding products, verifying the live badge counter increment, button state toggle to 'Remove', and rollback to 'Add to cart'.
            </li>
            <li>
              <strong>Headless CI/CD Optimization:</strong> Configured with headless Chrome runtime arguments (<code>--headless=new</code>, <code>--no-sandbox</code>, <code>--disable-dev-shm-usage</code>) ensuring reliable, display-less execution inside Docker and Jenkins pipelines.
            </li>
          </ul>

          {/* Visual Matrix Display */}
          <div className="automation-visual-container" style={{ marginTop: '16px' }}>
            <div className="visual-box-header">
              <span className="visual-box-title">
                <ShieldCheck size={14} /> 9-Permutation Combinatorial Matrix
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--accent-sage)', fontWeight: 600 }}>100% Verified</span>
            </div>
            <div className="matrix-compact-grid">
              <div className="matrix-cell">
                <span className="matrix-cell-pair">Valid / Valid</span>
                <span className="matrix-cell-result matrix-pass">✓ PASS (Auth & Redirect)</span>
              </div>
              <div className="matrix-cell">
                <span className="matrix-cell-pair">Valid / Invalid</span>
                <span className="matrix-cell-result matrix-fail">✗ Reject (Wrong password)</span>
              </div>
              <div className="matrix-cell">
                <span className="matrix-cell-pair">Valid / Empty</span>
                <span className="matrix-cell-result matrix-fail">✗ Reject (Password required)</span>
              </div>
              <div className="matrix-cell">
                <span className="matrix-cell-pair">Invalid / Valid</span>
                <span className="matrix-cell-result matrix-fail">✗ Reject (No such user)</span>
              </div>
              <div className="matrix-cell">
                <span className="matrix-cell-pair">Invalid / Invalid</span>
                <span className="matrix-cell-result matrix-fail">✗ Reject (Bad credentials)</span>
              </div>
              <div className="matrix-cell">
                <span className="matrix-cell-pair">Invalid / Empty</span>
                <span className="matrix-cell-result matrix-fail">✗ Reject (Password required)</span>
              </div>
              <div className="matrix-cell">
                <span className="matrix-cell-pair">Empty / Valid</span>
                <span className="matrix-cell-result matrix-fail">✗ Reject (Username required)</span>
              </div>
              <div className="matrix-cell">
                <span className="matrix-cell-pair">Empty / Invalid</span>
                <span className="matrix-cell-result matrix-fail">✗ Reject (Username required)</span>
              </div>
              <div className="matrix-cell">
                <span className="matrix-cell-pair">Empty / Empty</span>
                <span className="matrix-cell-result matrix-fail">✗ Reject (Username required)</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '22px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a 
              href={GITHUB_LINKS.sauceDemoDir}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-natural btn-natural-primary"
            >
              View Directory on GitHub <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Framework B: AutomationExercise */}
        <div className="natural-card">
          <div className="card-category">Framework B · Enterprise Reporting</div>
          <h3 className="card-heading">AutomationExercise Suite</h3>

          <div className="automation-badge-list">
            <span className="automation-tech-pill">Java</span>
            <span className="automation-tech-pill">Selenium WebDriver</span>
            <span className="automation-tech-pill">ExtentReports 5</span>
            <span className="automation-tech-pill">TestNG Listeners</span>
            <span className="automation-tech-pill">Dynamic Data Generators</span>
            <span className="automation-tech-pill">Maven</span>
          </div>

          <p className="card-text">
            An enterprise-scale test suite covering complete e-commerce user lifecycles on AutomationExercise. Features dynamic data provisioning, failure interceptors, and automated interactive HTML test reports with embedded screenshot evidence.
          </p>

          {/* Visual Architecture Pipeline */}
          <div className="automation-visual-container">
            <div className="visual-box-header">
              <span className="visual-box-title">
                <Workflow size={14} /> Test Execution & Reporting Pipeline
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>ExtentReports 5</span>
            </div>
            <div className="pipeline-flow">
              <div className="pipeline-node">
                <span className="pipeline-step-num">Step 1</span>
                <div className="pipeline-node-name">Dynamic Data</div>
                <div className="pipeline-node-sub">EmailsUtils.java</div>
              </div>
              <div className="pipeline-node">
                <span className="pipeline-step-num">Step 2</span>
                <div className="pipeline-node-name">POM Action</div>
                <div className="pipeline-node-sub">Register & Buy</div>
              </div>
              <div className="pipeline-node">
                <span className="pipeline-step-num">Step 3</span>
                <div className="pipeline-node-name">TestListener</div>
                <div className="pipeline-node-sub">Failure Intercept</div>
              </div>
              <div className="pipeline-node">
                <span className="pipeline-step-num">Step 4</span>
                <div className="pipeline-node-name">HTML Dashboard</div>
                <div className="pipeline-node-sub">Embedded PNG</div>
              </div>
            </div>
          </div>

          <ul className="bullet-points">
            <li>
              <strong>Architectural Evolution (WithoutPOM ➔ UsingPOM):</strong> Demonstrates hands-on refactoring from procedural script baselines to a scalable, maintainable Page Object Model enterprise architecture.
            </li>
            <li>
              <strong>Dynamic Idempotent Data Provisioning:</strong> Uses <code>EmailsUtils</code> to generate unique timestamped email fixtures, preventing database collision and guaranteeing repeated test run idempotence.
            </li>
            <li>
              <strong>Automated Failure Screenshot Capture:</strong> Custom TestNG listener (<code>CustomTestListener</code>) intercepts test failure events in real-time, instantly captures high-resolution PNG screenshots, and binds them to the corresponding test case log.
            </li>
            <li>
              <strong>ExtentReports 5 Interactive Dashboard:</strong> Generates standalone HTML reports with execution timelines, pass/fail status distribution, system environment specifications, and clickable screenshot proof.
            </li>
          </ul>

          {/* Visual Failure Interception Flow */}
          <div className="automation-visual-container" style={{ marginTop: '16px' }}>
            <div className="visual-box-header">
              <span className="visual-box-title">
                <Camera size={14} /> Automated Failure Interception & Evidence
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--accent-sage)', fontWeight: 600 }}>Zero Data Collision</span>
            </div>
            <div className="listener-visual-flow">
              <div className="listener-step-card">
                <div className="listener-step-icon" style={{ background: 'var(--accent-slate-light)', color: 'var(--accent-slate)' }}>
                  <AlertCircle size={14} />
                </div>
                <div className="listener-step-title">1. Test Failure</div>
                <div className="listener-step-desc">Assertion or locator timeout occurs</div>
              </div>
              <div className="listener-step-card">
                <div className="listener-step-icon" style={{ background: 'var(--accent-terracotta-light)', color: 'var(--accent-terracotta)' }}>
                  <Workflow size={14} />
                </div>
                <div className="listener-step-title">2. Listener Hook</div>
                <div className="listener-step-desc">onTestFailure() intercepts event</div>
              </div>
              <div className="listener-step-card">
                <div className="listener-step-icon" style={{ background: 'var(--accent-rose-light)', color: 'var(--accent-rose)' }}>
                  <Camera size={14} />
                </div>
                <div className="listener-step-title">3. Capture PNG</div>
                <div className="listener-step-desc">Timestamped screenshot saved</div>
              </div>
              <div className="listener-step-card">
                <div className="listener-step-icon" style={{ background: 'var(--accent-sage-light)', color: 'var(--accent-sage)' }}>
                  <FileText size={14} />
                </div>
                <div className="listener-step-title">4. Extent HTML</div>
                <div className="listener-step-desc">Embedded in interactive report</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '22px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a 
              href={GITHUB_LINKS.automationExerciseDir}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-natural btn-natural-primary"
            >
              View Directory on GitHub <ExternalLink size={14} />
            </a>
            <a 
              href={GITHUB_LINKS.automationReport}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-natural btn-natural-outline"
            >
              ExtentReport on GitHub <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
