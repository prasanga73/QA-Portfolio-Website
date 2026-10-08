package portfolio.tests;

import com.deque.html.axecore.results.Results;
import com.deque.html.axecore.results.Rule;
import com.deque.html.axecore.selenium.AxeBuilder;
import org.testng.Assert;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;
import portfolio.base.BaseTest;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class AccessibilityTest extends BaseTest {

    private static final List<String> WCAG_TAGS = List.of("wcag2a", "wcag2aa", "wcag21a", "wcag21aa");
    private static final Set<String> BLOCKING_IMPACTS = Set.of("serious", "critical");

    @DataProvider(name = "themes")
    public Object[][] themes() {
        return new Object[][]{{"light"}, {"dark"}};
    }

    @Test(dataProvider = "themes")
    public void noSeriousWcagViolations(String theme) {
        homePage.storeTheme(theme);
        homePage.reload();
        Assert.assertEquals(homePage.currentTheme(), theme);

        // Open every case study so the tables and test cases inside are scanned too.
        homePage.expandAllDetails();

        Results results = new AxeBuilder().withTags(WCAG_TAGS).analyze(driver);
        List<Rule> blocking = results.getViolations().stream()
                .filter(rule -> BLOCKING_IMPACTS.contains(rule.getImpact()))
                .toList();

        Assert.assertTrue(blocking.isEmpty(),
                "Serious accessibility issues in " + theme + " theme:\n" + describe(blocking));
    }

    private static String describe(List<Rule> rules) {
        return rules.stream()
                .map(rule -> "- " + rule.getId() + " (" + rule.getImpact() + "): " + rule.getHelp()
                        + "\n    " + rule.getNodes().stream()
                        .map(node -> String.valueOf(node.getTarget()))
                        .limit(5)
                        .collect(Collectors.joining("\n    ")))
                .collect(Collectors.joining("\n"));
    }
}
