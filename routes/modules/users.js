const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");

const User = require("../../models/user");

router.get("/login", (req, res) => {
  res.render("login");
});

// 加入 middleware，驗證 request 登入狀態
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
  })
);

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const errs = [];

  if (!name || !email || !password || !confirmPassword) {
    errs.push({ errMsg: "所有欄位皆為必填" });
  }
  if (password !== confirmPassword) {
    errs.push({ errMsg: "輸入密碼不一致" });
  }
  if (errs.length) {
    return res.render("register", {
      errs,
      name,
      email,
      password,
      confirmPassword,
    });
  }

  User.findOne({ email })
    .lean()
    .then((user) => {
      if (user) {
        errs.push({ errMsg: "User already exists." });
        res.render("register", {
          errs,
          name,
          email,
          password,
          confirmPassword,
        });
      }
      return bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hash) =>
          User.create({
            name,
            email,
            password: hash,
          })
        )
        .then(() => {
          req.flash("successMsg", "請用新帳號重新登入");
          res.redirect("/users/login");
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "Logout!");
  res.redirect("/users/login");
});

module.exports = router;
