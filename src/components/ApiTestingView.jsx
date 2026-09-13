import React from 'react';
import { apiEndpoints, GITHUB_LINKS } from '../data/portfolioData';

export default function ApiTestingView() {
  const getBadgeClass = (method) => {
    switch (method) {
      case 'GET': return 'tag-slate';
      case 'POST': return 'tag-sage';
      case 'PUT': return 'tag-terracotta';
      case 'DELETE': return 'tag-rose';
      default: return 'tag-slate';
    }
  };

  return (
    <div>
      <div className="cards-grid-2">
        <div className="natural-card">
          <div className="card-category">REST API Collection · Postman</div>
          <h3 className="card-heading">Platzi Fake Store API Test Suite</h3>
          <p className="card-text">
            Comprehensive 14-request automated Postman collection validating full CRUD lifecycle, query parameters, category lookups, and chained JWT authentication against <code>https://api.escuelajs.co/api/v1</code>.
          </p>
          <ul className="bullet-points">
            <li><strong>Dynamic Pre-Request Scripting:</strong> Unique title injection via JavaScript (<code>pm.variables.set("randomTitle", "Prasanga-" + Date.now())</code>).</li>
            <li><strong>Token & ID Chaining:</strong> Captures generated <code>productId</code> and JWT <code>access_token</code> into collection variables to drive subsequent requests.</li>
            <li><strong>SLA Latency Assertions:</strong> Asserts response codes (200, 201) and response duration &lt; 3500ms.</li>
          </ul>

          <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a 
              href={GITHUB_LINKS.apiTestingDir}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-natural btn-natural-primary"
            >
              View Directory on GitHub ↗
            </a>
            <a 
              href={GITHUB_LINKS.postmanCollection}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-natural btn-natural-outline"
            >
              Platzi API Collection on GitHub ↗
            </a>
          </div>
        </div>

        <div className="natural-card">
          <div className="card-category">Contract Verification</div>
          <h3 className="card-heading">Draft-07 JSON Schema Validation</h3>
          <p className="card-text">
            Prevents breaking contract mutations by applying strict schema assertions using TV4. Validates payload structure, property types, and mandatory keys.
          </p>

          <div className="natural-code-block">
            <span className="comment">// JSON Schema validation in Postman test script</span><br />
            <span className="keyword">const</span> schema = &#123;<br />
            &nbsp;&nbsp;<span className="string">"type"</span>: <span className="string">"array"</span>,<br />
            &nbsp;&nbsp;<span className="string">"items"</span>: &#123;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="string">"type"</span>: <span className="string">"object"</span>,<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="string">"required"</span>: [<span className="string">"id"</span>, <span className="string">"title"</span>, <span className="string">"price"</span>, <span className="string">"images"</span>],<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="string">"properties"</span>: &#123;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="string">"id"</span>: &#123; <span className="string">"type"</span>: <span className="string">"number"</span> &#125;,<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="string">"title"</span>: &#123; <span className="string">"type"</span>: <span className="string">"string"</span> &#125;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
            &nbsp;&nbsp;&#125;<br />
            &#125;;<br />
            pm.test(<span className="string">"Schema Valid"</span>, () =&gt; &#123;<br />
            &nbsp;&nbsp;pm.expect(tv4.validate(pm.response.json(), schema)).to.be.<span class="keyword">true</span>;<br />
            &#125;);
          </div>

          <div style={{ marginTop: '16px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>CLI Automation: </span>
            <code style={{ fontSize: '0.8rem', background: 'var(--bg-tag)', padding: '3px 8px', borderRadius: '4px' }}>
              newman run "Platzi API.postman_collection.json"
            </code>
          </div>
        </div>
      </div>

      {/* Endpoint Table */}
      <div className="section-heading" style={{ marginTop: '40px' }}>
        <div className="section-label">Endpoint Inventory</div>
        <h3 style={{ fontSize: '1.4rem' }}>Automated API Endpoints</h3>
      </div>

      <div className="table-wrapper">
        <table className="natural-table">
          <thead>
            <tr>
              <th style={{ width: '80px' }}>Method</th>
              <th style={{ width: '220px' }}>Endpoint Path</th>
              <th style={{ width: '180px' }}>Action Name</th>
              <th>Verification Purpose & Chained Data</th>
            </tr>
          </thead>
          <tbody>
            {apiEndpoints.map((ep, idx) => (
              <tr key={idx}>
                <td>
                  <span className={`tag-pill ${getBadgeClass(ep.method)}`}>
                    {ep.method}
                  </span>
                </td>
                <td>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                    {ep.path}
                  </span>
                </td>
                <td style={{ fontWeight: 500 }}>
                  {ep.name}
                </td>
                <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  {ep.purpose}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
