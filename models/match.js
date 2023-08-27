const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  league: String,
  country: String,
  home: String,
  away: String, 
  homeTeamScore: Number,
  awayTeamScore: Number,
  status: mongoose.Schema.Types.Mixed,
  time: Number,
});

const Model = mongoose.model("Match", matchSchema);

module.exports = Model;