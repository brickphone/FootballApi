const puppeteer = require("puppeteer");

async function openPage() {
  const browser = await puppeteer.launch( {headless: true} );
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1000, height: 926 });
  await page.goto("https://www.livescore.com/en/");

  // accepting cookies 
  const button = await page.waitForSelector('#onetrust-accept-btn-handler');
  if (button) {
    await button.click();
    console.log("clicked cookie button");
  };
  
  return page;
}

async function scrapeData(page) {
  let content = [];

  // Getting match elements
  let elements = await page.waitForSelector(".Ip")
  console.log("trying to select team element")


  for (let i=0; i < elements.length; i++) {
    let homeTeamElement = await elements[i].$(".Ip")
    if (homeTeamElement) {
      const homeTeamText = await homeTeamElement.evaluate(node => node.textContent);
      content.push(homeTeamText);
      console.log(content)
    }
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

