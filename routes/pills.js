var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Pill = require("../models/pill");

mongoose.connect("mongodb://localhost:27017/pills_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
