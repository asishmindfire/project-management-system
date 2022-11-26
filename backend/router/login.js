const express = require("express");
const router = express.Router();
const { User } = require("../models/projectSchema");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const SECRET_KEY = '9876gjhgyut57h'

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err)
      return res
        .status(500)
        .json({ status: 0, message: "Internal Server Error." });
    if (!user)
      return res.status(404).send({ status: 0, message: "No user found." });

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) return res.status(401).json({ status: 0, message: "Invalid password." });

    const payload = {
      user_id: user.user_id,
      user_role: user.user_role,
      user_name: user.user_name,
      email: user.email,
    };

    var token = jwt.sign(payload, SECRET_KEY, {
      expiresIn: 86400, // expires in 24 hours
    });

    res.json({ status: 1, message: "Login Success.", data: token });
  });
});

module.exports = router;
