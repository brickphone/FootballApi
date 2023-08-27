require('dotenv').config();
const mongoose = require("mongoose");
const getData = require("./Scraper/altscraper");

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
     console.log(`Connected to database`);
  })
  .catch(error => {
    console.error("Error connecting to database: ", error);
  })
module.exports = mongoose;