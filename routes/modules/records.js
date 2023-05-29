const express = require("express");
const router = express.Router();
const Record = require("../../models/records");
const Category = require("../../models/category");

router.get("/new", (req, res) => {
  return Category.find()
    .lean()
    .then((categories) => res.render("new", { categories }))
    .catch((err) => console.log(err));
});

router.post("/", (req, res) => {
  const userId = req.user._id;
  const { name, date, amount, categoryId } = req.body;

  if (!name || !date || !amount || !categoryId) {
    return Category.findById(categoryId)
      .lean()
      .then(() => res.render("new", { name, date, amount }));
  }

  return Record.create({ name, date, amount, categoryId, userId })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

router.get("/:id/edit", (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;

  return Category.find()
    .lean()
    .then((categories) => {
      return Record.findOne({ _id, userId })
        .populate("categoryId")
        .lean()
        .then((item) => {
          console.log(item);
          res.render("edit", { item, categories });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  Record.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Record.findByIdAndDelete(id)
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

module.exports = router;
