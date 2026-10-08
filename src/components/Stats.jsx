import { metrics } from '../data/portfolioData';

export default function Stats() {
  return (
    <section className="metrics-section" aria-label="Highlights">
      <dl className="metrics-strip">
        {metrics.map(metric => (
          <div className="metric-item" key={metric.label}>
            <dt className="metric-label">{metric.label}</dt>
            <dd className="metric-value">{metric.value}</dd>
            <dd className="metric-note">{metric.note}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
