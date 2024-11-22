const express = require("express");
const puppeteer = require("puppeteer-core");
const chromium = require("chrome-aws-lambda");

const app = express();

// Root Endpoint
app.get("/", (req, res) => {
  res.send("Puppeteer API is running. Use /scrape to scrape data.");
});

// Scrape Endpoint
app.get("/scrape", async (req, res) => {
  try {
    // Launch Puppeteer with chrome-aws-lambda
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath || '/usr/bin/google-chrome-stable',
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.goto("http://182.52.47.34/#/landing", { waitUntil: "networkidle2" });

    const data = await page.evaluate(() => {
      return {
        PEA: document.querySelector(".val.val1")?.textContent.trim() || "N/A",
        MAHIDOL: document.querySelector(".val.val2")?.textContent.trim() || "N/A",
        SOLAR: document.querySelector(".val.val3")?.textContent.trim() || "N/A",
      };
    });

    await browser.close();
    res.json(data);
  } catch (error) {
    console.error("Error scraping data:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
