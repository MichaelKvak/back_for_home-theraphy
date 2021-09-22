const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const pillsScheme = new Schema({
  title: String,
  tags: String,
  description: String,
  date: String,
});

module.exports = mongoose.model("Pill", pillsScheme);
