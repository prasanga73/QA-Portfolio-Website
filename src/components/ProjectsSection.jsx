import {
  GITHUB_LINKS,
  darazTestCases,
  darazRequirementCount,
  secondTestCases,
  apiRequests,
  jmeterScenarios
} from '../data/portfolioData';

const findTestCase = (testCases, id) => testCases.find(testCase => testCase.id === id);

// SauceDemo login results, one row per username, one column per password.
const loginMatrix = [
  { username: 'Valid', results: ['Logs in', 'No match', 'Password required'] },
  { username: 'Invalid', results: ['No match', 'No match', 'Password required'] },
  { username: 'Empty', results: ['Username required', 'Username required', 'Username required'] }
];

const projects = [
  {
    name: 'Daraz search and filters',
    metric: `${darazTestCases.length} test cases · ${darazRequirementCount} requirements`,
    tools: 'Manual testing, requirements traceability, functional testing',
    outcome: 'Documented search, suggestion, filtering, sorting, edge-case, and empty-state coverage, with every test case traced to a requirement.',
    approach: [
      `Mapped each test case to one of ${darazRequirementCount} requirements (REQ-01 to REQ-${darazRequirementCount}) from the Daraz search specification in a traceability matrix.`,
      'Covered single and combined filters (price range, brand, rating, location, free shipping), five sort orders, and pagination.',
      'Checked edge cases: lowercase, uppercase and mixed-case keywords, and the “No results found” state with suggested alternatives.'
    ],
    featuredTestCase: findTestCase(darazTestCases, 'TC-11'),
    testCases: darazTestCases,
    links: [
      { label: 'Test cases', href: GITHUB_LINKS.darazExcel },
      { label: 'Requirements', href: GITHUB_LINKS.darazPdf }
    ]
  },
  {
    name: 'Enterprise authentication and security',
    metric: `${secondTestCases.length} test cases · all high priority`,
    tools: 'Manual testing, authentication, OWASP checks, session testing',
    outcome: 'Audited validation, inactivity timeouts, SQL injection, XSS, brute-force protection, and password handling.',
    approach: [
      'Covered valid, invalid and empty usernames and passwords, plus email login and the post-login redirect.',
      <>Sent SQL injection (<code>' OR 1=1 --</code>) and XSS (<code>{'<script>alert(1)</script>'}</code>) payloads through the login fields.</>,
      'Verified account lockout after repeated failed attempts, session expiry after inactivity, and password masking.'
    ],
    featuredTestCase: findTestCase(secondTestCases, 'TC-09'),
    testCases: secondTestCases,
    links: [
      { label: 'Test suite', href: GITHUB_LINKS.securityExcel }
    ]
  },
  {
    name: 'Web UI automation suites',
    metric: '2 Selenium suites',
    tools: 'Java, Selenium WebDriver, TestNG, Page Object Model, Maven',
    outcome: 'Built maintainable browser suites for SauceDemo and AutomationExercise with reusable pages and HTML reporting.',
    approach: [
      'SauceDemo: tested all 9 combinations of valid, invalid and empty credentials, asserting the exact error message for each.',
      'SauceDemo: checked cart state, so adding a product switches its button to “Remove” and removing it switches it back.',
      'AutomationExercise: covered registration, valid and invalid login, logout, and registering with an existing email.',
      'A TestNG listener captures a screenshot when a test fails and embeds it in an ExtentReports 5 HTML report.',
      <>Runs in headless Chrome (<code>--headless=new</code>, <code>--no-sandbox</code>, <code>--disable-dev-shm-usage</code>) so it works in CI.</>
    ],
    loginMatrix: true,
    links: [
      { label: 'SauceDemo suite', href: GITHUB_LINKS.sauceDemoDir },
      { label: 'AutomationExercise suite', href: GITHUB_LINKS.automationExerciseDir }
    ]
  },
  {
    name: 'REST API contract verification',
    metric: `${apiRequests.length} automated requests`,
    tools: 'Postman, REST APIs, JWT chains, JSON Schema',
    outcome: `Automated ${apiRequests.length} requests covering CRUD, filtering, pagination, related products, response contracts, and a chained JWT login.`,
    approach: [
      <>A pre-request script generates a unique product title on every run (<code>"Prasanga-" + Date.now()</code>).</>,
      <>Saves the new <code>productId</code> and the JWT <code>access_token</code> to collection variables so later requests can use them.</>,
      'Validates the product list against a draft-07 JSON Schema and asserts status 200 with a response time under 3,500 ms.'
    ],
    apiRequests,
    links: [
      { label: 'Collection', href: GITHUB_LINKS.postmanCollection }
    ]
  },
  {
    name: 'RemoteAxle load testing',
    metric: `${jmeterScenarios.length} scenarios · up to 200 threads`,
    tools: 'Apache JMeter, concurrency testing, latency analysis',
    outcome: 'Benchmarked 20,000 requests with up to 200 concurrent threads and documented latency and token bottlenecks.',
    approach: [
      'Chained requests: a JSON Extractor pulls the JWT from POST /login and passes it as a bearer token to GET /users/profile.',
      'Drove logins from a CSV of 10 credential pairs with one deliberately invalid, giving a known 10% baseline error rate.',
      'Added a Uniform Random Timer (a 2-second delay plus up to 1 more second) to simulate real user think time.'
    ],
    finding: 'Login errors stayed at the expected 10% in every run, but profile errors jumped to 91–93% under concurrency, pointing to token authorization rather than bad credentials. At 200 threads, average login time rose from 754 ms to 3,930 ms, with the 99th percentile at 5,905 ms.',
    scenarios: jmeterScenarios,
    links: [
      { label: 'JMeter report', href: GITHUB_LINKS.jmeterPdf },
      { label: 'Test plan', href: GITHUB_LINKS.jmeterJmx }
    ]
  }
];

const toSteps = steps => steps
  .split('\n')
  .map(step => step.replace(/^\s*\d+\.\s*/, '').replace(/\s+/g, ' ').trim())
  .filter(Boolean);

function FeaturedTestCase({ testCase }) {
  return (
    <div className="test-case">
      <p className="detail-heading">
        Sample test case · {testCase.id} · {testCase.priority} priority
      </p>
      <p className="test-case-title">{testCase.title}</p>
      <ol className="test-case-steps">
        {toSteps(testCase.steps).map(step => <li key={step}>{step}</li>)}
      </ol>
      <p className="test-case-expected"><span>Expected:</span> {testCase.expected}</p>
    </div>
  );
}

function TestCaseTable({ testCases }) {
  return (
    <details className="nested-details">
      <summary>All {testCases.length} test cases</summary>
      <table className="data-table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Test case</th>
            <th scope="col">Priority</th>
          </tr>
        </thead>
        <tbody>
          {testCases.map(testCase => (
            <tr key={testCase.id}>
              <td className="cell-mono">{testCase.id}</td>
              <td>{testCase.title}</td>
              <td>{testCase.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  );
}

function LoginMatrixTable() {
  return (
    <table className="data-table">
      <caption className="detail-heading">SauceDemo login matrix · rows are usernames, columns are passwords</caption>
      <thead>
        <tr>
          <th scope="col">Username</th>
          <th scope="col">Valid</th>
          <th scope="col">Invalid</th>
          <th scope="col">Empty</th>
        </tr>
      </thead>
      <tbody>
        {loginMatrix.map(row => (
          <tr key={row.username}>
            <th scope="row">{row.username}</th>
            {row.results.map((result, index) => <td key={index}>{result}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function RequestTable({ requests }) {
  return (
    <table className="data-table">
      <caption className="detail-heading">Requests in the collection</caption>
      <thead>
        <tr>
          <th scope="col">Method</th>
          <th scope="col">Path</th>
          <th scope="col">Check</th>
        </tr>
      </thead>
      <tbody>
        {requests.map(request => (
          <tr key={request.name}>
            <td className="cell-mono">{request.method}</td>
            <td className="cell-mono cell-path">{request.path}</td>
            <td>{request.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ScenarioTable({ scenarios }) {
  return (
    <table className="data-table">
      <caption className="detail-heading">Load scenarios</caption>
      <thead>
        <tr>
          <th scope="col">Scenario</th>
          <th scope="col" className="cell-number">Threads</th>
          <th scope="col" className="cell-number">Requests</th>
          <th scope="col" className="cell-number">Login avg</th>
          <th scope="col" className="cell-number">Profile errors</th>
        </tr>
      </thead>
      <tbody>
        {scenarios.map(scenario => (
          <tr key={scenario.id}>
            <th scope="row">{scenario.name}</th>
            <td className="cell-number">{scenario.threads}</td>
            <td className="cell-number">{scenario.samples.toLocaleString('en-US')}</td>
            <td className="cell-number">{scenario.loginAvg.toLocaleString('en-US')} ms</td>
            <td className="cell-number">{scenario.profileErr}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function ProjectsSection() {
  return (
    <section id="work" className="editorial-section projects-section" aria-labelledby="projects-title">
      <div className="section-intro">
        <p className="section-kicker">Selected work</p>
        <h2 id="projects-title">Projects and case studies</h2>
      </div>

      <div className="case-study-list">
        {projects.map(project => (
          <article className="case-study" key={project.name}>
            <div className="case-study-heading">
              <h3>{project.name}</h3>
              <span className="case-study-metric">{project.metric}</span>
            </div>
            <p className="case-study-tools">{project.tools}</p>
            <p className="case-study-outcome">{project.outcome}</p>

            <details className="case-study-details">
              <summary>How I tested it</summary>
              <div className="case-study-details-body">
                <ul className="approach-list">
                  {project.approach.map((step, index) => <li key={index}>{step}</li>)}
                </ul>
                {project.finding && (
                  <p className="case-study-finding"><span>What I found:</span> {project.finding}</p>
                )}
                {project.featuredTestCase && <FeaturedTestCase testCase={project.featuredTestCase} />}
                {project.testCases && <TestCaseTable testCases={project.testCases} />}
                {project.loginMatrix && <LoginMatrixTable />}
                {project.apiRequests && <RequestTable requests={project.apiRequests} />}
                {project.scenarios && <ScenarioTable scenarios={project.scenarios} />}
              </div>
            </details>

            <div className="case-study-links">
              {project.links.map(link => (
                <a href={link.href} target="_blank" rel="noopener noreferrer" key={link.label}>
                  {link.label}
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
