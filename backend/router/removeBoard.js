const express = require("express");
const router = express.Router();
const { Board } = require("../models/projectSchema");

router.post("/remove-board", async (req, res) => {
  try {
    const boards = await Board.find({ projectId: req.body.projectId }).lean();
    console.log(`Success find boards`, boards.length);

    if (boards.length == 0) {
      return res.json({ status: 0, message: "No boards available" });
    }

    var filterdBoards = boards[0].boards.filter(
      (item, index) => item.id !== req.body.boardId
    );
    Board.updateOne(
      { projectId: req.body.projectId },
      {
        $set: {
          boards: filterdBoards,
        },
      },
      { upsert: false }
    )
      .then((tagExist) => {
        console.log(`Succes findOne in update-ticket-tags ->`, tagExist);

        return res.json({
          status: 1,
          message: "Record Updated Successfully.",
        });
      })
      .catch((err) => {
        console.log(`Error in updateOne update-tags ->`, err);
        return res.json({
          status: 0,
          message: err.message,
        });
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
