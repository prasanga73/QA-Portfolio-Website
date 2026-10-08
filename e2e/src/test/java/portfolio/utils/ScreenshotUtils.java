package portfolio.utils;

import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public final class ScreenshotUtils {

    private static final Path SCREENSHOT_DIR = Path.of("target", "screenshots");

    private ScreenshotUtils() {
    }

    /** Saves a PNG of the current page to target/screenshots/&lt;name&gt;.png. */
    public static void capture(WebDriver driver, String name) {
        try {
            Files.createDirectories(SCREENSHOT_DIR);
            byte[] png = ((TakesScreenshot) driver).getScreenshotAs(OutputType.BYTES);
            Path file = SCREENSHOT_DIR.resolve(name.replaceAll("[^A-Za-z0-9._-]", "_") + ".png");
            Files.write(file, png);
            System.out.println("Screenshot saved: " + file.toAbsolutePath());
        } catch (IOException | RuntimeException error) {
            System.out.println("Could not save screenshot for " + name + ": " + error.getMessage());
        }
    }
}
