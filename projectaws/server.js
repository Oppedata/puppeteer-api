const puppeteer = require("puppeteer");

(async () => {
  try {
    // ติดตั้ง Chromium ถ้ายังไม่ได้ติดตั้ง
    const browserFetcher = puppeteer.createBrowserFetcher();
    const revisionInfo = await browserFetcher.download('1210945'); // ระบุ revision ของ Chromium
    console.log(`Chromium installed at: ${revisionInfo.executablePath}`);
  } catch (err) {
    console.error("Error installing Chromium:", err.message);
  }
})();

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Puppeteer API is running. Use /scrape to scrape data.");
});

app.get("/scrape", async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--single-process",
      ],
      headless: "new",
    });

    const page = await browser.newPage();
    await page.goto("http://182.52.47.34/#/landing", { waitUntil: "networkidle2" });

    const data = await page.evaluate(() => ({
      PEA: document.querySelector(".val.val1")?.textContent.trim() || "N/A",
      MAHIDOL: document.querySelector(".val.val2")?.textContent.trim() || "N/A",
      SOLAR: document.querySelector(".val.val3")?.textContent.trim() || "N/A",
    }));

    await browser.close();
    res.json(data);
  } catch (error) {
    console.error("Error scraping data:", error.message);
    res.status(500).json({
      error: error.message,
      hint: "Ensure Puppeteer is configured and Chromium is properly installed.",
    });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
