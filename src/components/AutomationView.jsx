import React from 'react';
import { GITHUB_LINKS } from '../data/portfolioData';

export default function AutomationView() {
  return (
    <div>
      <div className="cards-grid-2">
        <div className="natural-card">
          <div className="card-category">Framework A · CI/CD Ready</div>
          <h3 className="card-heading">SauceDemo Automation Suite</h3>
          <p className="card-text">
            Engineered with the <strong>Page Object Model (POM)</strong> for SauceDemo. Implements a 9-permutation decision table covering valid, invalid, and missing credential vectors, alongside cart state transitions.
          </p>
          <ul className="bullet-points">
            <li><strong>9-Case Decision Table:</strong> Valid/Valid, Valid/Invalid, Valid/Empty, Invalid/Valid, Invalid/Invalid, Invalid/Empty, Empty/Valid, Empty/Invalid, Empty/Empty.</li>
            <li><strong>Cart State Integrity:</strong> Item addition, state toggle to 'Remove', cart item removal, and rollback to 'Add to cart'.</li>
            <li><strong>Headless CI/CD Optimization:</strong> Configured for headless execution in Linux/Jenkins containers.</li>
          </ul>

          <div className="natural-code-block">
            <span className="comment">// Modern Headless Chrome CI/CD Options</span><br />
            <span className="function">ChromeOptions</span> options = <span className="keyword">new</span> ChromeOptions();<br />
            options.addArguments(<span className="string">"--headless=new"</span>);<br />
            options.addArguments(<span className="string">"--no-sandbox"</span>);<br />
            options.addArguments(<span className="string">"--disable-dev-shm-usage"</span>);<br />
            options.addArguments(<span className="string">"--window-size=1920,1080"</span>);<br />
            driver = <span className="keyword">new</span> ChromeDriver(options);
          </div>

          <div style={{ marginTop: '16px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Command to run: </span>
            <code style={{ fontSize: '0.82rem', background: 'var(--bg-tag)', padding: '3px 8px', borderRadius: '4px' }}>
              mvn clean test
            </code>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a 
              href={GITHUB_LINKS.sauceDemoDir}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-natural btn-natural-primary"
            >
              View Directory on GitHub ↗
            </a>
          </div>
        </div>

        <div className="natural-card">
          <div className="card-category">Framework B · Enterprise Reporting</div>
          <h3 className="card-heading">AutomationExercise Suite</h3>
          <p className="card-text">
            Multi-tier Maven automation architecture featuring dynamic test data generators, ExtentReports 5 dashboards, automated failure screenshot listeners, and email dispatchers.
          </p>
          <ul className="bullet-points">
            <li><strong>Dynamic Email Generation:</strong> <code>EmailsUtils.java</code> generates timestamped unique user emails, ensuring idempotent registration test runs.</li>
            <li><strong>Automated Failure Capture:</strong> <code>CustomTestListener</code> intercepts test failures and automatically embeds PNG screenshots into Extent HTML reports.</li>
            <li><strong>Architectural Evolution:</strong> Demonstrates migration from procedural baseline scripts (<code>WithoutPOM/</code>) to structured enterprise POM (<code>UsingPOM/</code>).</li>
          </ul>

          <div className="natural-code-block">
            <span className="comment">// Dynamic email generation prevents database collision</span><br />
            <span className="keyword">public static</span> String <span className="function">generateUniqueEmail</span>() &#123;<br />
            &nbsp;&nbsp;<span className="keyword">return</span> <span className="string">"testuser"</span> + System.currentTimeMillis() + <span className="string">"@gmail.com"</span>;<br />
            &#125;
          </div>

          <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a 
              href={GITHUB_LINKS.automationExerciseDir}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-natural btn-natural-primary"
            >
              View Directory on GitHub ↗
            </a>
            <a 
              href={GITHUB_LINKS.automationReport}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-natural btn-natural-outline"
            >
              ExtentReport on GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
