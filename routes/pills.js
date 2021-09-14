var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/pills_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Schema = mongoose.Schema;
const pillsScheme = new Schema({
  title: String,
  date: String,
  description: String,
  status: String,
});

const Pill = mongoose.model("Pill", pillsScheme);

router.get("/", function (req, res, next) {
  Pill.find({}, function (err, docs) {
    if (err)
      return res
        .status(500)
        .json({ success: false, err: { msg: "Fetch failed!" } });
    res.status(200).json({ success: true, data: docs });
  });
});

module.exports = router;
