const express = require("express");
const puppeteer = require("puppeteer");

const app = express();

// เพิ่ม root endpoint เพื่อแสดงข้อความต้อนรับ
app.get("/", (req, res) => {
  res.send("Welcome to Puppeteer Scraper API! Use /scrape to fetch data.");
});

// Endpoint สำหรับการ scrape ข้อมูล
app.get("/scrape", async (req, res) => {
  try {
    console.log("Starting Puppeteer...");
    const browser = await puppeteer.launch({
      headless: true, // รันแบบ headless
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // สำหรับ environment บนเซิร์ฟเวอร์
    });

    const page = await browser.newPage();
    console.log("Navigating to the target page...");
    await page.goto("http://182.52.47.34/#/landing", { waitUntil: "networkidle2" });

    console.log("Extracting data from the page...");
    const data = await page.evaluate(() => {
      return {
        PEA: document.querySelector(".val.val1")?.textContent.trim() || "N/A",
        MAHIDOL: document.querySelector(".val.val2")?.textContent.trim() || "N/A",
        SOLAR: document.querySelector(".val.val3")?.textContent.trim() || "N/A",
      };
    });

    await browser.close();
    console.log("Data scraped successfully:", data);

    // ส่งข้อมูลกลับเป็น JSON
    res.json(data);
  } catch (error) {
    console.error("Error scraping data:", error);
    res.status(500).send("Error scraping data");
  }
});

// ตั้งค่า PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
