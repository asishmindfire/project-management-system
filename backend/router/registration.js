const express = require("express");
const router = express.Router();
const { User } = require("../models/projectSchema");
const moment = require("moment-timezone");
const bcrypt = require("bcrypt");

router.post("/register", (req, res) => {
  var digits = "123456789";
  let id = "";
  for (let i = 0; i < 6; i++) {
    id += digits[Math.floor(Math.random() * 10)];
  }

  const userData = {
    user_id: id,
    user_name: req.body.user_name,
    email: req.body.email,
    password: req.body.password,
    user_role: req.body.user_role,
    created_date: moment().tz("Asia/Kolkata").format(),
    updated_date: moment().tz("Asia/Kolkata").format(),
  };

  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then((user) => {
              res.json({ status: 1, message: user.email + " registered!" });
            })
            .catch((err) => {
              res.json({ status: 0, message: err.message });
            });
        });
      } else {
        res.json({ status: 0, message: "User already exists" });
      }
    })
    .catch((err) => {
      res.json({ status: 0, message: err.message });
    });
});

module.exports = router;
