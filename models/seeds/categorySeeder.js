const db = require("../../config/mongoose");
const Category = require("../category");

const SEED_CATEGORY = [
  { name: "其他", icon: "fa-solid fa-pen" },
  { name: "休閒娛樂", icon: "fa-solid fa-face-grin-beam" },
  { name: "家居物業", icon: "fa-solid fa-house" },
  { name: "餐飲食品", icon: "fa-solid fa-utensils" },
  { name: "交通出行", icon: "fa-solid fa-van-shuttle" },
];

db.on("error", () => {
  console.log("MongoDB error!");
});

db.once("open", () => {
  Category.create(SEED_CATEGORY)
    .then(() => {
      console.log("categorySeeder done.");
      db.close();
      process.exit();
    })
    .catch((err) => console.log("categorySeeder run failed."));
});
