import { GITHUB_LINKS } from '../data/portfolioData';

const projects = [
  {
    name: 'Daraz search and filters',
    tools: 'Manual testing, requirements traceability, functional testing',
    outcome: 'Documented search, suggestion, filtering, sorting, edge-case, and empty-state coverage across 17 traced scenarios.',
    status: 'Completed',
    links: [
      { label: 'Test cases', href: GITHUB_LINKS.darazExcel },
      { label: 'Requirements', href: GITHUB_LINKS.darazPdf }
    ]
  },
  {
    name: 'Enterprise authentication and security',
    tools: 'Manual testing, authentication, OWASP checks, session testing',
    outcome: 'Audited validation, inactivity timeouts, SQL injection, XSS, brute-force protection, and password handling.',
    status: 'Completed',
    links: [
      { label: 'Test suite', href: GITHUB_LINKS.securityExcel }
    ]
  },
  {
    name: 'Web UI automation suites',
    tools: 'Java, Selenium WebDriver, TestNG, Page Object Model, Maven',
    outcome: 'Built maintainable browser suites for SauceDemo and AutomationExercise with reusable pages, data, and reporting.',
    status: 'Completed',
    links: [
      { label: 'SauceDemo suite', href: GITHUB_LINKS.sauceDemoDir },
      { label: 'AutomationExercise suite', href: GITHUB_LINKS.automationExerciseDir }
    ]
  },
  {
    name: 'REST API contract verification',
    tools: 'Postman, REST APIs, JWT chains, JSON Schema',
    outcome: 'Verified 14 endpoints across CRUD flows, authentication chains, response contracts, and negative cases.',
    status: 'Completed',
    links: [
      { label: 'Collection', href: GITHUB_LINKS.postmanCollection }
    ]
  },
  {
    name: 'RemoteAxle load testing',
    tools: 'Apache JMeter, concurrency testing, latency analysis',
    outcome: 'Benchmarked 20,000 requests with up to 200 concurrent threads and documented latency and token bottlenecks.',
    status: 'Completed',
    links: [
      { label: 'JMeter report', href: GITHUB_LINKS.jmeterPdf },
      { label: 'Test plan', href: GITHUB_LINKS.jmeterJmx }
    ]
  }
];

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
              <span className="case-study-status">{project.status}</span>
            </div>
            <p className="case-study-tools">{project.tools}</p>
            <p className="case-study-outcome">{project.outcome}</p>
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
