const express = require("express");
const puppeteer = require("puppeteer");

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to Puppeteer Scraper API! Use /scrape to fetch data.");
});

app.get("/scrape", async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // ตั้ง User-Agent เพื่อเลียนแบบการเข้าถึงจากเบราว์เซอร์ปกติ
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    // ไปยัง URL เป้าหมาย
    await page.goto("http://182.52.47.34/#/landing", { waitUntil: "domcontentloaded" });

    // รอให้องค์ประกอบที่ต้องการโหลดเสร็จ
    await page.waitForSelector(".val.val1", { timeout: 10000 });

    // ดึงข้อมูลจาก DOM
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
    res.status(500).send("Error scraping data: " + error.message);
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
