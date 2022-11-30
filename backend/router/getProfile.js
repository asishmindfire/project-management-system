const express = require("express");
const router = express.Router();
const MiddlewareServices = require("../services/middlewares");
const { User } = require("../models/projectSchema");

router.get("/profile", MiddlewareServices.verifyToken, (req, res) => {
  User.findOne({
    user_id: req.body.payload.user_id,
  })
    .then((response) => {
      delete response["password"];
      if (response) {
        res.json({
          status: 1,
          message: "Record Fetched Successfully.",
          data: response,
        });
      } else {
        res.json({ status: 0, message: "User Record Not Found!" });
      }
    })
    .catch((err) => {
      console.log(`Error in fetch profile ->`, err);
      res
        .status(400)
        .json({ status: 0, message: "Oops! Something Went Wrong." });
    });
});

module.exports = router;
