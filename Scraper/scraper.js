const puppeteer = require("puppeteer");

async function openPage() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewport({ width: 1000, height: 926 });
  await page.goto("https://www.livescore.com/en/");

  return page;
}

async function scrapeData(page) {
  let content = [];

  // Get competition data
  await page.waitForSelector(".Gd");
  const compElements = await page.$$(".Gd");

  // Loop through competition elements
  for (let i = 0; i < compElements.length; i++) {
    let compName = await compElements[i].$(".Hd");
    console.log("looping trough comp elements")

    if (compName) {
      const typeCompText = await compName.evaluate(node => node.textContent);
      const currentComp = typeCompText; // Assign the competition here
      
      let matchElements = await page.$$(".Ip");

      // Looping through match elements
      for (let j = 0; j < matchElements.length; j++) {
        let homeTeamElement = await matchElements[j].$(".vp");
        let awayTeamElement = await matchElements[j].$(".wp");
        let homeScoreElement = await matchElements[j].$(".Cp");
        let awayScoreElement = await matchElements[j].$(".Dp");
        let matchTime = await matchElements[j].$(".qs", ".vs");

        if (homeTeamElement && awayTeamElement && homeScoreElement && awayScoreElement) {
          const homeTeamText = await homeTeamElement.evaluate(node => node.textContent);
          const awayTeamText = await awayTeamElement.evaluate(node => node.textContent);
          const homeScoreText = await homeScoreElement.evaluate(node => node.textContent);
          const awayScoreText = await awayScoreElement.evaluate(node => node.textContent);
          const matchTimeText = await matchTime.evaluate(node => node.textContent);

          content.push({
            matchTime: matchTimeText,
            homeTeam: homeTeamText,
            awayTeam: awayTeamText,
            homeScore: homeScoreText,
            awayScore: awayScoreText,
            competition: currentComp,
          });
        };
      };
    };
  };

  return content;
};

(async () => {
  const page = await openPage();
  const dataScraped = await scrapeData(page);
  console.log(dataScraped);

  await page.browser().close();
})();
