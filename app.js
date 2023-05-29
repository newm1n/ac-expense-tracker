const express = require("express");
const session = require("express-session");
const usePassport = require("./config/passport"); // 載入設定檔，要寫在 express-session 以後
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const flash = require("connect-flash");

require("./config/mongoose");

const app = express();
const PORT = process.env.PORT || 3000;
const routes = require("./routes");

app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

usePassport(app);
app.use(flash());

// res.locals：所有樣板都可以使用的變數
app.use((req, res, next) => {
  console.log(req.user);
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user; // 在反序列化的時候，取出的 user 資訊，之後會放在 req.user 裡以供後續使用
  res.locals.successMsg = req.flash("successMsg");
  res.locals.warningMsg = req.flash("warningMsg");
  next();
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
