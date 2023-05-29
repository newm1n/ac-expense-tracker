const express = require("express");
const router = express.Router();
const Record = require("../../models/records");
const Category = require("../../models/category");

router.get("/", (req, res) => {
  const userId = req.user._id;

  return Category.find()
    .lean()
    .then((categories) => {
      return Record.find({ userId })
        .populate("categoryId")
        .lean()
        .sort({ date: "desc" })
        .then((items) => {
          let totalAmount = 0;
          items.forEach((item) => {
            totalAmount += item.amount;
          });
          return res.render("index", { items, categories, totalAmount });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

router.post("/", (req, res) => {
  const userId = req.user._id;
  const { categoryId } = req.body;

  if (categoryId === "all") {
    return res.redirect("/");
  }

  return Category.find()
    .lean()
    .then((categories) => {
      return Record.find({ userId, categoryId })
        .populate("categoryId")
        .lean()
        .sort({ date: "desc" })
        .then((items) => {
          let totalAmount = 0;
          items.forEach((item) => {
            totalAmount += item.amount;
          });
          return res.render("index", { items, categories, totalAmount });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

module.exports = router;
