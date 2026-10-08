package portfolio.tests;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.logging.LogEntry;
import org.openqa.selenium.logging.LogType;
import org.testng.Assert;
import org.testng.annotations.Test;
import portfolio.base.BaseTest;

import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ContentTest extends BaseTest {

    private static final int EXPECTED_CASE_STUDIES = 5;

    @Test
    public void everyCaseStudyHasMetricLinksAndExpandableDetails() {
        List<WebElement> caseStudies = homePage.caseStudies();
        Assert.assertEquals(caseStudies.size(), EXPECTED_CASE_STUDIES);

        for (WebElement caseStudy : caseStudies) {
            String name = homePage.caseStudyName(caseStudy);

            Assert.assertFalse(homePage.caseStudyMetric(caseStudy).isBlank(), name + " has no headline metric");
            Assert.assertTrue(homePage.caseStudyLinkCount(caseStudy) > 0, name + " has no evidence links");
            Assert.assertEquals(homePage.caseStudySummaryText(caseStudy), "How I tested it");
            Assert.assertFalse(homePage.isCaseStudyExpanded(caseStudy), name + " should start collapsed");

            homePage.expandCaseStudy(caseStudy);
            Assert.assertTrue(homePage.isCaseStudyExpanded(caseStudy), name + " did not expand");
            Assert.assertTrue(homePage.isCaseStudyBodyVisible(caseStudy), name + " details are not visible");
        }
    }

    @Test
    public void headlineTestCaseCountMatchesCaseStudies() {
        Map<String, String> metrics = homePage.metrics();
        int headlineCount = Integer.parseInt(metrics.get("manual test cases"));

        int caseStudyTotal = 0;
        Pattern testCaseCount = Pattern.compile("(\\d+) test cases");
        for (WebElement caseStudy : homePage.caseStudies()) {
            Matcher match = testCaseCount.matcher(homePage.caseStudyMetric(caseStudy));
            if (match.find()) {
                caseStudyTotal += Integer.parseInt(match.group(1));
            }
        }

        Assert.assertEquals(caseStudyTotal, headlineCount,
                "The headline test case count should equal the sum shown on the manual testing case studies");
    }

    @Test
    public void noJavaScriptErrorsWhileUsingThePage() {
        homePage.toggleTheme();
        homePage.toggleTheme();
        homePage.expandAllDetails();

        List<LogEntry> errors = driver.manage().logs().get(LogType.BROWSER).getAll().stream()
                .filter(entry -> entry.getLevel().intValue() >= Level.SEVERE.intValue())
                .toList();

        Assert.assertTrue(errors.isEmpty(), "Browser console errors: " + errors);
    }
}
