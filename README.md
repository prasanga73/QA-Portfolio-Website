# QA Portfolio Website

Source for [qa.prasanganiraula.com.np](https://qa.prasanganiraula.com.np/), the portfolio of Prasanga Niraula, a QA engineer working in manual testing, Selenium automation, Postman API testing, and JMeter load testing.

The test artifacts the site links to (test cases, automation suites, Postman collection, JMeter plans) live in [prasanga73/QA-Portfolio](https://github.com/prasanga73/QA-Portfolio).

## Stack

- React 18 and Vite
- Plain CSS with light and dark themes (`src/index.css`)
- Content and test data in `src/data/portfolioData.js`; the headline numbers are calculated from that data
- Deployed on Vercel

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

## Tests

The site has its own end-to-end suite in `e2e/`, written with Java, Selenium WebDriver, and TestNG using the Page Object Model.

| Test class | What it checks |
|---|---|
| `NavigationTest` | Menu links and the "See work" button scroll to their sections without hiding them under the sticky header; the skip link is the first Tab stop and moves focus to the content |
| `ThemeTest` | First visit follows the system light/dark setting; the toggle switches themes, updates its label, and the choice survives a reload |
| `ContentTest` | Every case study has a metric, evidence links, and expandable details; the headline test case count matches the case studies; no JavaScript console errors |
| `ResponsiveTest` | At 375px (phone) there is no sideways scrolling, even with every table open, and the taller header doesn't cover sections |
| `AccessibilityTest` | No serious or critical WCAG 2.1 AA issues from axe-core, in both themes, with all details expanded |
| `LinksTest` | Every outbound link responds; links that open a new tab use `rel="noopener noreferrer"`; the resume is served as a PDF |

Requirements: Java 21, Maven, and Google Chrome. Selenium Manager downloads the matching ChromeDriver.

```bash
npm run build
npm run preview          # serves the build at http://127.0.0.1:4173
npm run test:e2e         # in a second terminal
```

Options:

- `mvn -f e2e/pom.xml test -Dheaded=true` shows the browser while the tests run.
- `mvn -f e2e/pom.xml test -DbaseUrl=https://qa.prasanganiraula.com.np` runs the suite against the live site.
- Screenshots of failed tests are saved to `e2e/target/screenshots/`.

### Continuous integration

`.github/workflows/e2e.yml` builds the site and runs the suite on every push and pull request, and weekly to catch GitHub links that break. Test reports and failure screenshots are uploaded as a build artifact.
