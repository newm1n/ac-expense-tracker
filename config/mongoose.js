const mongoose = require("mongoose");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("mongodb connected!");
});

db.on("error", () => {
  console.log("mongodb error!");
});

module.exports = db;
