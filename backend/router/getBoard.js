const express = require("express");
const router = express.Router();
const { Board } = require("../models/projectSchema");

router.post("/get-board", async (req, res) => {
  try {
    const boards = await Board.find({ projectId: req.body.projectId });
    // console.log(`Success find boards`, boards.length);

    if (boards.length == 0) {
      return res.json({ status: 0, message: "No boards available" });
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
