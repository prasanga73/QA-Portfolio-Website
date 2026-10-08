package portfolio.base;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chromium.HasCdp;
import org.testng.ITestResult;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import portfolio.pages.HomePage;
import portfolio.utils.ScreenshotUtils;

import java.util.List;
import java.util.Map;

public class BaseTest {

    public static final String BASE_URL = System.getProperty("baseUrl", "http://127.0.0.1:4173");

    protected WebDriver driver;
    protected HomePage homePage;

    /** Subclasses override this to run on a phone-sized viewport. */
    protected DriverFactory.Viewport viewport() {
        return DriverFactory.Viewport.DESKTOP;
    }

    @BeforeMethod(alwaysRun = true)
    public void setUp() {
        driver = DriverFactory.create(viewport());
        homePage = new HomePage(driver, BASE_URL);
        homePage.open();
    }

    @AfterMethod(alwaysRun = true)
    public void tearDown(ITestResult result) {
        if (driver == null) {
            return;
        }
        if (result.getStatus() == ITestResult.FAILURE) {
            ScreenshotUtils.capture(driver, result.getTestClass().getRealClass().getSimpleName()
                    + "-" + result.getMethod().getMethodName());
        }
        driver.quit();
    }

    /** Makes the page see the operating system as using a light or dark color scheme. */
    protected void emulateColorScheme(String scheme) {
        ((HasCdp) driver).executeCdpCommand("Emulation.setEmulatedMedia", Map.of(
                "features", List.of(Map.of("name", "prefers-color-scheme", "value", scheme))
        ));
    }
}
