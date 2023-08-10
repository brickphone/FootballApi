const express = require("express")
const axios = require("axios")
const cheerio = require("cheerio")

const app = express()

const PORT = process.env.port || 3000;

const website = "https://www.livescore.bz/"

console.log("Before scraping process")

async function scrapeData() {
  try {
      console.log("Initiating scraping process")

      const response = await axios.get(website, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
        }
      })
      const data = response.data;
      const $ = cheerio.load(data);

      let content = [];
      let currentCompetition = null;

      // Looks for html tags and loops over to scrape
      $("a.m.live.meven,a.m.meven, m.ft.meven, a.m.modd,1").each(function () {
        const matchTime = $(this).find("st").text().trim();
        const homeTeam = $(this).find("t1").eq(0).text().trim();
        const awayTeam = $(this).find("t").eq(1).text().trim();
        const matchScore = $(this).find("sc").text().trim();
        const startTime = $(this).find("a").find("sa").text().trim();       
        
        $("h2.l a:last-child").each(function () { 
          const competition = $(this).text().trim();
        
          content.push({
            competition: competition,
          });
        });
        
        content.push({
          matchTime: matchTime,
          startTime: startTime,
          homeTeam: homeTeam,
          awayTeam: awayTeam,
          matchScore: matchScore,
        });
      });

      //Getting competition data
     /*  $("h2.l a:last-child").each(function () { 
        const competition = $(this).text().trim();
      
        content.push({
          competition: competition,
        });
      }); */

    console.log(content)
    console.log("Scraping process completed.")

  } catch (error) {
    console.log(error, error.message,)
    return [];
  }
}

// node router
app.get("/", async (req, res) => {
  try {
    const scrapedData = await scrapeData();

    res.json(scrapeData);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});

scrapeData();

app.listen(PORT, () => {
  console.log(`server is running on PORT:${PORT}`);
});