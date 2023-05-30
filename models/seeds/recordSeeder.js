const db = require("../../config/mongoose");
const bcrypt = require("bcryptjs");
const Record = require("../records");
const Category = require("../category");
const User = require("../user");

const SEED_RECORD = [
  {
    name: "午餐",
    date: "2019.04.23",
    amount: 60,
    category: "餐飲食品",
  },
  {
    name: "晚餐",
    date: "2019.04.23",
    amount: 60,
    category: "餐飲食品",
  },
  {
    name: "捷運",
    date: "2019.04.23",
    amount: 120,
    category: "交通出行",
  },
  {
    name: "租金",
    date: "2015.04.01",
    amount: 25000,
    category: "家居物業",
  },
  {
    name: "電影：驚奇隊長",
    date: "2019.04.23",
    amount: 220,
    category: "休閒娛樂",
  },
];

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

db.once("open", () => {
  let recordList = [];
  const promiseArray = [];

  Promise.all(
    Array.from(SEED_USER, (user) => {
      const { name, email, password } = user;
      return bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hash) => {
          return User.create({ name, email, password: hash })
            .then((user) => {
              const userId = user._id;

              if (user.name === "小新") {
                recordList = SEED_RECORD.slice(4);
              } else {
                recordList = SEED_RECORD.slice(0, 4);
              }

              recordList.forEach((record) => {
                const { name, date, amount, category } = record;
                return Category.findOne({ name: category })
                  .then((item) => {
                    const categoryId = item._id;
                    promiseArray.push(
                      Record.create({ name, date, amount, userId, categoryId })
                    );
                  })
                  .then(() => {
                    if (promiseArray.length === 5) {
                      Promise.all(promiseArray).then(() => {
                        console.log("recordSeeder done");
                        process.exit();
                      });
                    }
                  })
                  .catch((err) => console.log(err));
              });
            })
            .catch((err) => console.log(err));
        });
    })
  );
});
