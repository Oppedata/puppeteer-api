const express = require("express");
const puppeteer = require("puppeteer-core");

const app = express();

app.get("/scrape", async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      executablePath: "/usr/bin/google-chrome-stable", // ใช้ Chrome ติดตั้งใน Render
      headless: true,
    });
    const page = await browser.newPage();
    await page.goto("http://182.52.47.34/#/landing", { waitUntil: "domcontentloaded" });

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
    res.status(500).send("Error scraping data");
  }
});

// ใช้ PORT จาก process.env
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
