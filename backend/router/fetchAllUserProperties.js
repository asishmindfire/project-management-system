const express = require("express");
const router = express.Router();
const { User } = require("../models/projectSchema");

router.get("/fetch-all-user", (req, res) => {
  // console.log("Hello World", req.body.projectId);

  User.find({})
    .lean()
    .then((userExists) => {
      console.log(`Success findOne`, userExists.length);

      if (userExists.length == 0) {
        return res.json({ status: 0, message: "No user available" });
      }

      userExists.map((el) => delete el.password);
      return res.json({
        status: 1,
        message: "Record Fetched Successfully.",
        data: userExists,
      });
    })
    .catch((err) => {
      console.log(`Error in findOne ->`, err);
      return res.json({
        status: 0,
        message: err.message,
      });
    });
});

module.exports = router;
