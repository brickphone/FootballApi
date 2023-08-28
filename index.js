const express = require("express");
const getData = require("./Scraper/altscraper");
const routes = require("./routes/routes");
const mongoose = require("./db");
const Model = require("./models/match");
const app = express();

// Middleware
app.use(express.json());

app.use("/status", (req, res) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  };
}); 

app.get("/", (req, res) => {
  return res.send("Recieved get method");
});

app.get("/data", async(req, res) => {
  console.log("Get data");
  const scrapedData = await getData();
  console.log(scrapedData);
  return res.json(scrapedData);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});