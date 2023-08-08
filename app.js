const express = require("express")
const axios = require("axios")
const cheerio = require("cheerio")

const app = express()

const PORT = process.env.port || 3000;

const website = "https://www.livescore.com/en/"

async function scrapeData() {
  try {
    console.log("Initiating scraping process")
    axios(website).then((res) => {
      const data = res.data;
      const $ = cheerio.load(data);

      let content = [];

      $(".np", data).each(function () {
        const title = $(this).text();
        const url = $(this).find("a").attr("href");

        content.push({
          match,
          teams,
        });

        console.log("Scraping process completed.")

        app.get("/", (req, res) => {
          res.json(content);
        })
      });
    });
  } catch (error) {
    console.log(error, error.message)
  }
}

app.listen(PORT, () => {
  console.log(`server is running on PORT:${PORT}`);
});