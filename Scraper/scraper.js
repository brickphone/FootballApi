const puppeteer = require("puppeteer");
const fs = require("fs");
const { scrollPageToBottom } = require("puppeteer-autoscroll-down");

const url = "https://www.livescore.com/en/";

let browser;

async function openPage () {
  browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: "domcontentloaded"});

  return page;
};

async function scrapeData(page) {
  await page.waitForSelector(".Fp");

  const data = await page.$$eval(".Fp", els => els.map(e=> {
    const text = (id, container = e) => 
    container.querySelector(`[id*=${id}]`).textContent.trim();

    const league = e.closest("[data-known-size]");
    return {
      competition: text("category-header__stage", league),
      country: text("category-header__category", league),
      time: text("status-or-time"),
      home: text("home-team-name"),
      away: text("away-team-name"),
      homeTeamScore: +text("home-team-score"),
      awayTeamScore: +text("away-team-score"),
    }
  }));
  
  return data;
}


(async () => {
  const page = await openPage();
  const dataScraped = await scrapeData(page);
  console.log(dataScraped);

  await page.browser().close();
})();

module.exports = { openPage, scrapeData };