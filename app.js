const express = require("express");
const app = express();
require("./config/mongoose");

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
