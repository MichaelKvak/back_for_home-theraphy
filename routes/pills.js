var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Pill = require("../models/pill");

mongoose.connect("mongodb://localhost:27017/pills_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Вибірка одного документа з вказаним id
router.get("/:pillId", function (req, res, next) {
  Pill.findById(req.params["pillId"], function (err, doc) {
    if (err)
      return res
        .status(500)
        .json({ success: false, err: { msg: "Fetch faild!" } });
    res.status(200).json({ success: true, data: doc });
  });
});

/* GET tasks listing. */
router.get("/", function (req, res, next) {
  if (req.query.filter_property)
    Pill.find(
      { [req.query.filter_property]: req.query.filter_value },
      function (err, docs) {
        if (err)
          return res
            .status(500)
            .json({ success: false, err: { msg: "Fetch faild!" } });
        res.status(200).json({ success: true, data: docs });
      }
    );
  //5. Вибірка усіх документів з бази
  else
    Pill.find({}, function (err, docs) {
      if (err)
        return res
          .status(500)
          .json({ success: false, err: { msg: "Fetch faild!" } });
      res.status(200).json({ success: true, data: docs });
    });
});

//Обробляємо дані, які надіслано методом post (додаємо нову задачу)
router.post(
  "/add",

  // title must be
  body("pillTitle")
    .isLength({ min: 5 })
    .trim()
    .withMessage("title must be specified.")
    .escape(),
  // description must be
  body("pillDescription")
    .isInt({ min: 1, max: 40 })
    .withMessage("description must be between 1 and 40.")
    .toInt(),

  function (req, res, next) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({ success: false, err: errors.array() });
    }

    //5. Створення документа
    const pill = new Pill({
      title: req.body.pillTitle,
      tags: req.body.pillTags,
      description: req.body.pillDescription,
      date: req.body.pillDate,
    });
    //6. Збереження документа
    pill.save(function (err, prodDoc) {
      if (err)
        return res
          .status(500)
          .json({ success: false, err: { msg: "Saving faild!" } });
      res.status(200).json({ success: true, taskId: prodDoc._id });
    });
  }
);
//Оновляємо задачу з новими даними
router.put("/update", function (req, res, next) {
  //Оновлення документа
  Pill.findByIdAndUpdate(
    req.body.pillId,
    {
      title: req.body.pillTitle,
      description: req.body.pillDescription,
      tags: req.body.pillTags,
      date: req.body.pillDate,
    },
    function (err, pillDoc) {
      if (err)
        return res
          .status(500)
          .json({ success: false, err: { msg: "Saving faild!" } });
      res.status(200).json({ success: true });
    }
  );
});

router.delete("/", function (req, res, next) {
  Pill.findByIdAndDelete(req.body.pillId, function (err, doc) {
    if (err)
      return res
        .status(500)
        .json({ success: false, err: { msg: "Delete faild!" } });
    res.status(200).json({ success: true });
  });
});

module.exports = router;
