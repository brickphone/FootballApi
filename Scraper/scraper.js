const puppeteer = require("puppeteer");

async function scrapeData() {
  const browser = await puppeteer.launch( {headless: false} );
  const page = await browser.newPage("")
  await page.setViewport({ width: 1000, height: 926 });

  await page.goto("https://www.livescore.com/en/")
}

scrapeData();