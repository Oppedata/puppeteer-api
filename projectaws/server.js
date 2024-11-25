const express = require("express");
const puppeteer = require("puppeteer-core");
const chromium = require("chrome-aws-lambda");

const app = express();

app.get("/", (req, res) => {
  res.send("Puppeteer API is running. Use /scrape to scrape data.");
});

app.get("/scrape", async (req, res) => {
  try {
    console.log("Launching Puppeteer...");

    // ตรวจสอบ path ของ Chromium
    const executablePath = await chromium.executablePath || "/usr/bin/google-chrome-stable";
    console.log("Chromium executable path:", executablePath);

    // เปิด Browser ด้วย Puppeteer
    const browser = await puppeteer.launch({
      args: [
        ...chromium.args,
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-background-timer-throttling",
        "--disable-backgrounding-occluded-windows",
        "--disable-renderer-backgrounding",
        "--single-process"
      ],
      defaultViewport: chromium.defaultViewport,
      executablePath,
      headless: true, // ใช้ headless mode
      ignoreHTTPSErrors: true,
    });

    console.log("Puppeteer launched successfully!");

    const page = await browser.newPage();

    // ตั้งค่า timeout ให้ยาวขึ้น (ถ้าจำเป็น)
    page.setDefaultNavigationTimeout(60000);

    await page.goto("http://182.52.47.34/#/landing", { waitUntil: "networkidle2" });

    // ดึงข้อมูลจากหน้าเว็บ
    const data = await page.evaluate(() => {
      return {
        PEA: document.querySelector(".val.val1")?.textContent.trim() || "N/A",
        MAHIDOL: document.querySelector(".val.val2")?.textContent.trim() || "N/A",
        SOLAR: document.querySelector(".val.val3")?.textContent.trim() || "N/A",
      };
    });

    // ปิด Browser
    await browser.close();
    res.json(data);
  } catch (error) {
    console.error("Error scraping data:", error.message);
    res.status(500).json({
      error: error.message,
      hint: "Ensure that your Puppeteer environment is configured correctly.",
      details: error.stack, // เพิ่มรายละเอียดข้อผิดพลาดสำหรับ Debug
    });
  }
});

// ตั้งค่าพอร์ต
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
