package portfolio.tests;

import org.openqa.selenium.WebElement;
import org.testng.Assert;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;
import portfolio.base.BaseTest;

public class NavigationTest extends BaseTest {

    @DataProvider(name = "navLinks")
    public Object[][] navLinks() {
        return new Object[][]{
                {"Skills", "skills"},
                {"Work", "work"},
                {"Contact", "contact"}
        };
    }

    @Test(dataProvider = "navLinks")
    public void navLinkScrollsToSectionBelowStickyHeader(String linkText, String sectionId) {
        homePage.clickNavLink(linkText);
        homePage.waitForUrlFragment(sectionId);
        homePage.waitForScrollToSettle();

        assertSectionVisibleBelowHeader(sectionId);
    }

    @Test
    public void seeWorkButtonScrollsToProjects() {
        homePage.heroAction("See work").click();
        homePage.waitForUrlFragment("work");
        homePage.waitForScrollToSettle();

        assertSectionVisibleBelowHeader("work");
    }

    @Test
    public void heroActionsPointToWorkResumeAndEmail() {
        Assert.assertTrue(homePage.heroAction("See work").getDomAttribute("href").equals("#work"));
        Assert.assertTrue(homePage.heroAction("Resume (PDF)").getDomAttribute("href").endsWith(".pdf"),
                "Resume button should link straight to the PDF");
        Assert.assertTrue(homePage.heroAction("Email me").getDomAttribute("href").startsWith("mailto:"),
                "Email button should open a mail client");
    }

    @Test
    public void skipLinkIsFirstTabStopAndMovesFocusToMainContent() {
        homePage.pressTab();
        WebElement focused = homePage.focusedElement();

        Assert.assertEquals(focused.getText(), "Skip to content", "First Tab should land on the skip link");
        Assert.assertTrue(homePage.isOnScreen(focused), "Focused skip link should be visible");

        homePage.pressEnter();
        Assert.assertEquals(homePage.focusedElement().getDomAttribute("id"), "main",
                "Skip link should move keyboard focus to the main content");
    }

    private void assertSectionVisibleBelowHeader(String sectionId) {
        double sectionTop = homePage.sectionTop(sectionId);
        double headerBottom = homePage.headerBottom();

        Assert.assertTrue(sectionTop >= headerBottom - 1,
                "#" + sectionId + " starts at " + sectionTop + "px, hidden behind the header ending at " + headerBottom + "px");
        Assert.assertTrue(sectionTop < homePage.viewportHeight(),
                "#" + sectionId + " starts at " + sectionTop + "px, below the visible viewport");
    }
}
