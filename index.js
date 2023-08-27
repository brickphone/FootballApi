require('dotenv').config();

const express = require("express");
const scrapeData = require("./Scraper/scraper");
const routes = require("./routes/routes");

const mongoString = p<rocess.env.DATABASE_URL
mongoose.connect(mongoString);
const database = mongoose.connection

database.on("error", (error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database connected');
});


const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/api/data", async(req, res) => {
  try {
    const page = await openPage();
    const dataScraped = await scrapeData();
      res.json(scrapeData);
      await page.browser().close();
      console.log("data has been fetched");
  } catch (error) {
      res.status(500).json({ error: "An error occurred while fetching data." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});