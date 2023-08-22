const express = require("express");
const scrapeData = require("/.scraper");

const app = express();
const port = process.env.PORT || 3000;

app.get("/api/data", async(req, res) => {
  try {
    const dataScraped = await scrapeData();
      res.json(scrapeData);
  } catch (error) {
      res.status(500).json({ error: "An error occurred while fetching data." });
  }
});