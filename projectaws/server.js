app.get("/scrape", async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      executablePath: puppeteer.executablePath(),
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
    console.error("Error scraping data:", error);
    res.status(500).send("Error scraping data");
  } finally {
    console.log("Request completed.");
  }
});
