const express = require("express");
const router = express.Router();
const { User } = require("../models/projectSchema");

router.post("/get-user-by-userId", async (req, res) => {
  try {
    const boards = await User.find({ user_id: req.body.user_id });
    // console.log(`Success find boards`, boards.length);

    if (boards.length == 0) {
      return res.json({ status: 0, message: "No user available" });
    }

    return res.json({
      status: 1,
      message: "Record Fetched Successfully.",
      data: boards,
    });
  } catch (err) {
    console.log(`Error in findOne boards ->`, err);
    return res.json({
      status: 0,
      message: err.message,
    });
  }
});
module.exports = router;
