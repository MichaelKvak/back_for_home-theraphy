const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const pillsScheme = new Schema({
  title: String,
  date: String,
  description: String,
  tags: String,
});

module.exports = mongoose.model("Pill", pillsScheme);
