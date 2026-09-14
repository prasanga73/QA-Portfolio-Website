const skillGroups = [
  {
    label: 'Manual testing',
    tools: 'Test planning, functional testing, regression testing, exploratory testing, requirements traceability'
  },
  {
    label: 'UI automation',
    tools: 'Java, Selenium WebDriver, TestNG, Page Object Model, Maven, headless Chrome'
  },
  {
    label: 'API and contracts',
    tools: 'Postman, REST APIs, CRUD verification, chained JWT flows, JSON Schema validation'
  },
  {
    label: 'Performance',
    tools: 'Apache JMeter, concurrency testing, load testing, latency analysis, error-rate analysis'
  }
];

export default function SkillsSection() {
  return (
    <section id="skills" className="editorial-section skills-section" aria-labelledby="skills-title">
      <div className="section-intro">
        <p className="section-kicker">Capabilities</p>
        <h2 id="skills-title">Skills and tools</h2>
      </div>

      <dl className="skills-list">
        {skillGroups.map(group => (
          <div className="skill-row" key={group.label}>
            <dt>{group.label}</dt>
            <dd>{group.tools}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
