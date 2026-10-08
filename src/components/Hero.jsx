import { personalInfo } from '../data/portfolioData';

export default function Hero() {
  return (
    <section className="identity-section" aria-labelledby="identity-title">
      <p className="identity-location">{personalInfo.location}</p>
      <h1 id="identity-title">{personalInfo.name}</h1>
      <p className="identity-role">{personalInfo.title}</p>
      <p className="identity-focus">{personalInfo.bio}</p>

      <div className="identity-actions">
        <a href="#work" className="button button-primary">See work</a>
        <a href={personalInfo.resume} target="_blank" rel="noopener noreferrer" className="button">
          Resume (PDF)
        </a>
        <a href={`mailto:${personalInfo.email}`} className="button">Email me</a>
      </div>
    </section>
  );
}
