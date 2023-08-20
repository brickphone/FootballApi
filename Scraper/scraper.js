const puppeteer = require("puppeteer");

async function openPage() {
  const browser = await puppeteer.launch( {headless: true} );
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1000, height: 926 });
  await page.goto("https://www.livescore.com/en/");
 
  return page;
}

async function scrapeData(page) {
  let content = [];

  // Get competition data
  await page.waitForSelector(".Gd");
  const compElement = await page.$$(".Gd");
  console.log("trying to get comp elements");
  
  // Loop through competition elements
  for (let i=0; i < compElement.length; i++) {
    let typeCompElement = await compElement[i].$(".Hd");
    
    if (typeCompElement) {
      console.log("looping through type of comp");
      const typeCompText = await typeCompElement.evaluate(node => node.textContent);
        content.push({
          competitionName: typeCompText,
        });
    }; 
  };
 
  // Getting match elements
  await page.waitForSelector(".Ip")
  const matchElements = await page.$$(".Ip")
  console.log("trying to select team element")


   for (let i=0; i < matchElements.length; i++) {
    let homeTeamElement = await matchElements[i].$(".vp")
    let awayTeamElement = await matchElements[i].$(".wp")
    let homeScoreElement = await matchElements[i].$(".Cp")
    let awayScoreElement = await matchElements[i].$(".Dp")

    
    if (homeTeamElement && awayTeamElement && homeScoreElement && awayScoreElement) {
      console.log("looping through match");
      const homeTeamText = await homeTeamElement.evaluate(node => node.textContent);
      const awayTeamText = await awayTeamElement.evaluate(node =>node.textContent);
      const homeScoreText = await homeScoreElement.evaluate(node => node.textContent);
      const awayScoreText = await awayTeamElement.evaluate(node => node.textContent);

        
      content.push({
          homeTeam:homeTeamText,
          awayTeam:awayTeamText,
          HomeScore:homeScoreText,
          awayScore:awayScoreText,
        });
    };
  };

  return content;
};

const formatOuput = (content) => {
  let output = "";
  let compMap = new Map();

  for (let match of content) {
    let compName = match.competition;
    let matchString = `$(match.homeTeam) vs $(match.awayTeam)`;
    
  }
};

(async () => {
  const page = await openPage();
  const dataScraped = await scrapeData(page);
  console.log(dataScraped) 

  await page.browser().close();
})();

