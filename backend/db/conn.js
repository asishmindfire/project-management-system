const mongoose = require("mongoose");

const db = process.env.DATABASE;

mongoose
  .connect(db)
  .then((res) => {
    console.log("MongoDB Connected Successfully.");
  })
  .catch((err) => {
    console.log(`Db connection failure ->`, err);
  });


