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

  // Getting match elements
  await page.waitForSelector(".Ip")
  const elements = await page.$$(".Ip")
  console.log("trying to select team element")

  for (let i=0; i < elements.length; i++) {
    let homeTeamElement = await elements[i].$(".vp")
    let awayTeamElement = await elements[i].$(".wp")
    console.log("Looping through hometeam")
    
    if (homeTeamElement) {
      const homeTeamText = await homeTeamElement.evaluate(node => node.textContent);
        content.push(homeTeamText);
    } else if (awayTeamElement) {
      const awayTeamText = await awayTeamElement.evaluate(node => node.textContent);
        content.push(awayTeamText)
    };
  };


  // Get competition information then change place

  return content;
};

(async () => {
  const page = await openPage();
  const dataScraped = await scrapeData(page);
  console.log(dataScraped) 

  await page.browser().close();
})();

