const express = require("express");
const router = express.Router();
const { Comment } = require("../models/projectSchema");

router.post("/get-comments", async (req, res) => {
  try {
    const boards = await Comment.find({ ticketId: req.body.ticketId });
    // console.log(`Success find boards`, boards.length);

    if (boards.length == 0) {
      return res.json({ status: 1, message: "No comments available", data: [] });
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
