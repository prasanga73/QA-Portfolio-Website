package portfolio.tests;

import org.openqa.selenium.WebElement;
import org.testng.Assert;
import org.testng.annotations.Test;
import portfolio.base.BaseTest;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

public class LinksTest extends BaseTest {

    private static final HttpClient HTTP = HttpClient.newBuilder()
            .version(HttpClient.Version.HTTP_1_1)
            .followRedirects(HttpClient.Redirect.NORMAL)
            .connectTimeout(Duration.ofSeconds(10))
            .build();

    @Test
    public void linksOpeningNewTabsUseNoopenerAndNoreferrer() {
        List<WebElement> links = homePage.newTabLinks();
        Assert.assertFalse(links.isEmpty(), "Expected external links on the page");

        List<String> unsafe = new ArrayList<>();
        for (WebElement link : links) {
            String rel = String.valueOf(link.getDomAttribute("rel"));
            if (!rel.contains("noopener") || !rel.contains("noreferrer")) {
                unsafe.add(link.getDomAttribute("href") + " (rel=\"" + rel + "\")");
            }
        }
        Assert.assertTrue(unsafe.isEmpty(), "Links missing rel=\"noopener noreferrer\": " + unsafe);
    }

    @Test
    public void noBrokenLinks() throws InterruptedException {
        List<String> urls = homePage.outboundLinkUrls();
        Assert.assertFalse(urls.isEmpty(), "Expected outbound links on the page");

        List<String> broken = new ArrayList<>();
        for (String url : urls) {
            if (URI.create(url).getHost().endsWith("linkedin.com")) {
                // LinkedIn answers automated requests with status 999, so it can't be checked this way.
                System.out.println("Skipped (blocks bots): " + url);
                continue;
            }
            try {
                int status = get(url).statusCode();
                System.out.println(status + " " + url);
                if (status >= 400) {
                    broken.add(status + " " + url);
                }
            } catch (IOException error) {
                broken.add("unreachable " + url + " (" + error.getMessage() + ")");
            }
        }
        Assert.assertTrue(broken.isEmpty(), "Broken links: " + broken);
    }

    @Test
    public void resumeIsServedAsPdf() throws IOException, InterruptedException {
        String resumeUrl = homePage.heroAction("Resume (PDF)").getDomProperty("href");
        HttpResponse<Void> response = get(resumeUrl);

        Assert.assertEquals(response.statusCode(), 200, "Resume should be downloadable: " + resumeUrl);
        Assert.assertEquals(response.headers().firstValue("content-type").orElse(""), "application/pdf");
    }

    private HttpResponse<Void> get(String url) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder(URI.create(url.split("#")[0]))
                .timeout(Duration.ofSeconds(20))
                .header("User-Agent", "Mozilla/5.0 (portfolio link checker)")
                .GET()
                .build();
        return HTTP.send(request, HttpResponse.BodyHandlers.discarding());
    }
}
