package portfolio.tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import portfolio.base.BaseTest;
import portfolio.base.DriverFactory;

public class ResponsiveTest extends BaseTest {

    @Override
    protected DriverFactory.Viewport viewport() {
        return DriverFactory.Viewport.PHONE;
    }

    @Test
    public void noSidewaysScrollingOnPhone() {
        Assert.assertFalse(homePage.hasHorizontalScroll(), "Page scrolls sideways at 375px");

        homePage.expandAllDetails();
        Assert.assertFalse(homePage.hasHorizontalScroll(),
                "Page scrolls sideways at 375px once case study details and tables are open");
    }

    @Test
    public void navigationStacksBelowNameOnPhone() {
        Assert.assertTrue(homePage.navTop() >= homePage.brandBottom(),
                "Navigation should sit below the name on narrow screens");
    }

    @Test
    public void workLinkClearsTallerPhoneHeader() {
        homePage.clickNavLink("Work");
        homePage.waitForUrlFragment("work");
        homePage.waitForScrollToSettle();

        double sectionTop = homePage.sectionTop("work");
        double headerBottom = homePage.headerBottom();
        Assert.assertTrue(sectionTop >= headerBottom - 1,
                "#work starts at " + sectionTop + "px, hidden behind the header ending at " + headerBottom + "px");
    }
}
