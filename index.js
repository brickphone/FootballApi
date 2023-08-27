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


app.post("/data", async(req, res) => {
  try {
    console.log("Trying to get data");
    const scrapedData = await getData();
    const savedMatches = await Match.insertMany(scrapedData);
    console.log("Saving data to db");
    console.log(savedMatches);
    
    return res.json(savedMatches);
  } catch (error) {
    res.status(500).json({error: "An error occured while fetching data."});
  };
}); 

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});