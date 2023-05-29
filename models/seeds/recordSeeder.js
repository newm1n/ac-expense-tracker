const db = require("../../config/mongoose");
const User = require("../user");

const SEED_USER = [
  {
    name: "廣志",
    email: "hiroshi@example.com",
    password: "1234",
  },
  {
    name: "小新",
    email: "shinchan@example.com",
    password: "5678",
  },
];

db.on("error", () => {
  console.log("MongoDB error!");
});

db.once("open", async () => {
  try {
    for (const user of SEED_USER) {
      await User.create({
        name: user.name,
        email: user.email,
        password: user.password,
      });
    }
    console.log("recordSeeder done.");
    db.close();
    process.exit();
  } catch (err) {
    console.log("recordSeeder run failed.");
    db.close();
    process.exit(1);
  }
});
