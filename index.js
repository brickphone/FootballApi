require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const scrapeData = require("./Scraper/scraper");
const mongoose = require("mongoose");
const routes = require("./routes/routes");

const mongoString = process.env.DATABASE_URL
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

<<<<<<< HEAD
app.use(express.json());

app.get("/status", (request, response) => {
  const status = {
    "Status":  "Running"
  };

  response.send(status)
});


app.get("/api/data", async(req, res) => {
=======
app.use('/api', routes);

router.get("/api/data", async(req, res) => {
>>>>>>> 44b4076241d843d3e6cb8f9d68eb6842153f98ee
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