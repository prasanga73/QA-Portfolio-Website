import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="container contact-section" aria-labelledby="contact-title">
        <div className="section-intro">
          <p className="section-kicker">Contact</p>
          <h2 id="contact-title">Open to careful testing work.</h2>
        </div>

        <div className="contact-links">
          <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
          <a href={personalInfo.resume} target="_blank" rel="noopener noreferrer">Resume (PDF)</a>
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>

        <p className="contact-location">{personalInfo.location}</p>
        <p className="footer-note">{personalInfo.training}</p>
        <p className="footer-note">
          This site is tested with Selenium WebDriver and TestNG on every push.{' '}
          <a href={`${personalInfo.siteRepo}/actions/workflows/e2e.yml`} target="_blank" rel="noopener noreferrer">
            See the test runs
          </a>
        </p>
      </div>
    </footer>
  );
}
