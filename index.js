const express = require("express");
const mongoose = require("mongoose");
const scrapeData = require("./Scraper/scraper");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/status", (request, response) => {
  const status = {
    "Status":  "Running"
  };

  response.send(status)
});


app.get("/api/data", async(req, res) => {
  try {
    const page = await openPage();
    const dataScraped = await scrapeData();
      res.json(scrapeData);
      await page.browser().close();
  } catch (error) {
      res.status(500).json({ error: "An error occurred while fetching data." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});