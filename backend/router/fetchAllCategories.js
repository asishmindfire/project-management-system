const express = require("express");
const router = express.Router();
const { Category } = require("../models/projectSchema");

router.get("/get-all-categories", (req, res) => {
  // console.log("Hello World", req.body.projectId);

  Category.find({})
    .then((categoriesExist) => {
      console.log(`Success findOne`, categoriesExist.length);

      if (categoriesExist.length == 0) {
        return res.json({ status: 0, message: "No Tickets Available" });
      }

      return res.json({
        status: 1,
        message: "Record Fetched Successfully.",
        data: categoriesExist,
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
