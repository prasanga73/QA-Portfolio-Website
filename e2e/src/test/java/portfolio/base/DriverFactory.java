package portfolio.base;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.logging.LogType;
import org.openqa.selenium.logging.LoggingPreferences;

import java.util.Map;
import java.util.logging.Level;

public final class DriverFactory {

    public enum Viewport { DESKTOP, PHONE }

    private DriverFactory() {
    }

    public static WebDriver create(Viewport viewport) {
        ChromeOptions options = new ChromeOptions();
        if (!Boolean.getBoolean("headed")) {
            options.addArguments("--headless=new");       // run with -Dheaded=true to watch the browser
        }
        options.addArguments("--no-sandbox");             // required in CI containers
        options.addArguments("--disable-dev-shm-usage");  // avoids /dev/shm exhaustion in CI
        options.addArguments("--window-size=1366,900");

        if (viewport == Viewport.PHONE) {
            // iPhone-sized viewport (375 x 812) through Chrome's device emulation.
            options.setExperimentalOption("mobileEmulation", Map.of(
                    "deviceMetrics", Map.of("width", 375, "height", 812, "pixelRatio", 2.0)
            ));
        }

        // Keep browser console output so tests can fail on JavaScript errors.
        LoggingPreferences logging = new LoggingPreferences();
        logging.enable(LogType.BROWSER, Level.ALL);
        options.setCapability("goog:loggingPrefs", logging);

        return new ChromeDriver(options);
    }
}
