package portfolio.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class HomePage {

    private static final String THEME_STORAGE_KEY = "qa-portfolio-theme";

    private final WebDriver driver;
    private final JavascriptExecutor js;
    private final WebDriverWait wait;
    private final String baseUrl;

    private final By pageTitle = By.id("identity-title");
    private final By header = By.cssSelector("header.site-header");
    private final By brand = By.cssSelector(".brand-mark");
    private final By primaryNav = By.cssSelector("nav[aria-label='Primary']");
    private final By themeToggle = By.cssSelector("button.theme-toggle");
    private final By heroActions = By.cssSelector(".identity-actions");
    private final By metricItems = By.cssSelector(".metric-item");
    private final By caseStudies = By.cssSelector("article.case-study");
    private final By newTabLinks = By.cssSelector("a[target='_blank']");

    private final By metricLabel = By.cssSelector(".metric-label");
    private final By metricValue = By.cssSelector(".metric-value");
    private final By caseStudyName = By.tagName("h3");
    private final By caseStudyMetric = By.cssSelector(".case-study-metric");
    private final By caseStudySummary = By.cssSelector("details.case-study-details > summary");
    private final By caseStudyDetails = By.cssSelector("details.case-study-details");
    private final By caseStudyBody = By.cssSelector(".case-study-details-body");
    private final By caseStudyLinks = By.cssSelector(".case-study-links a");

    public HomePage(WebDriver driver, String baseUrl) {
        this.driver = driver;
        this.js = (JavascriptExecutor) driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        this.baseUrl = baseUrl;
    }

    public void open() {
        driver.get(baseUrl + "/");
        waitUntilLoaded();
    }

    public void reload() {
        driver.navigate().refresh();
        waitUntilLoaded();
    }

    private void waitUntilLoaded() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(pageTitle));
    }

    // ---------- Navigation ----------

    public void clickNavLink(String text) {
        driver.findElement(primaryNav).findElement(By.linkText(text)).click();
    }

    public WebElement heroAction(String text) {
        return driver.findElement(heroActions).findElement(By.linkText(text));
    }

    public void waitForUrlFragment(String fragment) {
        wait.until(ExpectedConditions.urlContains("#" + fragment));
    }

    /** Smooth scrolling takes a moment; wait until the scroll position stops changing. */
    public void waitForScrollToSettle() {
        long[] lastPosition = {-1};
        new WebDriverWait(driver, Duration.ofSeconds(5))
                .pollingEvery(Duration.ofMillis(150))
                .until(d -> {
                    long position = ((Number) js.executeScript("return Math.round(window.scrollY);")).longValue();
                    boolean settled = position == lastPosition[0];
                    lastPosition[0] = position;
                    return settled;
                });
    }

    public double sectionTop(String sectionId) {
        return number("return document.getElementById(arguments[0]).getBoundingClientRect().top;", sectionId);
    }

    public double headerBottom() {
        return number("return arguments[0].getBoundingClientRect().bottom;", driver.findElement(header));
    }

    public double viewportHeight() {
        return number("return window.innerHeight;");
    }

    public void pressTab() {
        new Actions(driver).sendKeys(Keys.TAB).perform();
    }

    public void pressEnter() {
        new Actions(driver).sendKeys(Keys.ENTER).perform();
    }

    public WebElement focusedElement() {
        return driver.switchTo().activeElement();
    }

    public boolean isOnScreen(WebElement element) {
        return (Boolean) js.executeScript(
                "const r = arguments[0].getBoundingClientRect();"
                        + "return r.bottom > 0 && r.top < window.innerHeight && r.right > 0 && r.left < window.innerWidth;",
                element);
    }

    // ---------- Theme ----------

    public String currentTheme() {
        return (String) js.executeScript("return document.documentElement.dataset.theme;");
    }

    public void toggleTheme() {
        driver.findElement(themeToggle).click();
    }

    public String themeToggleLabel() {
        return driver.findElement(themeToggle).getDomAttribute("aria-label");
    }

    public String pageBackgroundColor() {
        return (String) js.executeScript("return getComputedStyle(document.body).backgroundColor;");
    }

    public void clearStoredTheme() {
        js.executeScript("localStorage.removeItem(arguments[0]);", THEME_STORAGE_KEY);
    }

    public void storeTheme(String theme) {
        js.executeScript("localStorage.setItem(arguments[0], arguments[1]);", THEME_STORAGE_KEY, theme);
    }

    // ---------- Links ----------

    public List<WebElement> newTabLinks() {
        return driver.findElements(newTabLinks);
    }

    /** Absolute URLs of every link that leaves the page (skips #anchors and mailto:). */
    @SuppressWarnings("unchecked")
    public List<String> outboundLinkUrls() {
        return (List<String>) js.executeScript(
                "return [...new Set([...document.querySelectorAll('a[href]')]"
                        + ".filter(a => /^(https?:|\\/)/.test(a.getAttribute('href')))"
                        + ".map(a => a.href))];");
    }

    // ---------- Highlights and case studies ----------

    /** Metric label (e.g. "manual test cases") mapped to its value (e.g. "52"), in page order. */
    public Map<String, String> metrics() {
        Map<String, String> metrics = new LinkedHashMap<>();
        for (WebElement item : driver.findElements(metricItems)) {
            metrics.put(item.findElement(metricLabel).getText(), item.findElement(metricValue).getText());
        }
        return metrics;
    }

    public List<WebElement> caseStudies() {
        return driver.findElements(caseStudies);
    }

    public String caseStudyName(WebElement caseStudy) {
        return caseStudy.findElement(caseStudyName).getText();
    }

    public String caseStudyMetric(WebElement caseStudy) {
        return caseStudy.findElement(caseStudyMetric).getText();
    }

    public String caseStudySummaryText(WebElement caseStudy) {
        return caseStudy.findElement(caseStudySummary).getText();
    }

    public void expandCaseStudy(WebElement caseStudy) {
        WebElement summary = caseStudy.findElement(caseStudySummary);
        scrollIntoViewInstantly(summary);
        summary.click();
    }

    public boolean isCaseStudyExpanded(WebElement caseStudy) {
        return caseStudy.findElement(caseStudyDetails).getDomProperty("open").equals("true");
    }

    public boolean isCaseStudyBodyVisible(WebElement caseStudy) {
        return caseStudy.findElement(caseStudyBody).isDisplayed();
    }

    public int caseStudyLinkCount(WebElement caseStudy) {
        return caseStudy.findElements(caseStudyLinks).size();
    }

    /** Opens every collapsible section so layout and accessibility checks cover hidden content too. */
    public void expandAllDetails() {
        js.executeScript("document.querySelectorAll('details').forEach(details => details.open = true);");
    }

    // ---------- Layout ----------

    public boolean hasHorizontalScroll() {
        return (Boolean) js.executeScript(
                "return document.documentElement.scrollWidth > document.documentElement.clientWidth;");
    }

    public double brandBottom() {
        WebElement element = driver.findElement(brand);
        return element.getRect().getY() + element.getRect().getHeight();
    }

    public double navTop() {
        return driver.findElement(primaryNav).getRect().getY();
    }

    /**
     * The site uses CSS smooth scrolling, which also animates WebDriver's own scroll-before-click,
     * so clicks can land mid-animation. Jump straight to the element instead.
     */
    private void scrollIntoViewInstantly(WebElement element) {
        js.executeScript("arguments[0].scrollIntoView({block: 'center', behavior: 'instant'});", element);
    }

    private double number(String script, Object... args) {
        return ((Number) js.executeScript(script, args)).doubleValue();
    }
}
