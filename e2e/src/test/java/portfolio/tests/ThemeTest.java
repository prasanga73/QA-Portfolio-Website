package portfolio.tests;

import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import portfolio.base.BaseTest;

public class ThemeTest extends BaseTest {

    private static final String LIGHT_BACKGROUND = "rgb(250, 250, 248)";
    private static final String DARK_BACKGROUND = "rgb(26, 26, 24)";

    @BeforeMethod
    public void startAsFirstTimeVisitorOnLightSystem() {
        emulateColorScheme("light");
        homePage.clearStoredTheme();
        homePage.reload();
    }

    @Test
    public void firstVisitFollowsLightSystemSetting() {
        Assert.assertEquals(homePage.currentTheme(), "light");
        Assert.assertEquals(homePage.pageBackgroundColor(), LIGHT_BACKGROUND);
    }

    @Test
    public void firstVisitFollowsDarkSystemSetting() {
        emulateColorScheme("dark");
        homePage.reload();

        Assert.assertEquals(homePage.currentTheme(), "dark");
        Assert.assertEquals(homePage.pageBackgroundColor(), DARK_BACKGROUND);
    }

    @Test
    public void toggleSwitchesThemeAndUpdatesButtonLabel() {
        Assert.assertEquals(homePage.themeToggleLabel(), "Switch to dark theme");

        homePage.toggleTheme();
        Assert.assertEquals(homePage.currentTheme(), "dark");
        Assert.assertEquals(homePage.pageBackgroundColor(), DARK_BACKGROUND);
        Assert.assertEquals(homePage.themeToggleLabel(), "Switch to light theme");

        homePage.toggleTheme();
        Assert.assertEquals(homePage.currentTheme(), "light");
        Assert.assertEquals(homePage.themeToggleLabel(), "Switch to dark theme");
    }

    @Test
    public void chosenThemeSurvivesReloadAndOverridesSystemSetting() {
        homePage.toggleTheme();
        homePage.reload();

        Assert.assertEquals(homePage.currentTheme(), "dark",
                "A theme the visitor picked should win over the light system setting");
        Assert.assertEquals(homePage.themeToggleLabel(), "Switch to light theme");
    }
}
