const express = require("express");
const puppeteer = require("puppeteer");

const app = express();

// Route for root path
app.get("/", (req, res) => {
  res.send("Welcome to Puppeteer API! Use /scrape to get the data.");
});

// Scrape route
app.get("/scrape", async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      executablePath: process.env.CHROME_BIN || "/usr/bin/google-chrome-stable",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: true,
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
    res.status(500).send(`Error scraping data: ${error.message}`);
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
