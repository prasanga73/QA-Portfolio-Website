import { personalInfo } from '../data/portfolioData';

export default function Hero() {
  return (
    <section className="identity-section" aria-labelledby="identity-title">
      <p className="identity-location">{personalInfo.location}</p>
      <h1 id="identity-title">{personalInfo.name}</h1>
      <p className="identity-role">{personalInfo.title}</p>
      <p className="identity-focus">
        Manual testing, Selenium and Page Object Model automation, Postman API verification, and JMeter load testing.
      </p>
    </section>
  );
}
