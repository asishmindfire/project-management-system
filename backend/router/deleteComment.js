const express = require("express");
const router = express.Router();
const { Comment } = require("../models/projectSchema");

router.post("/delete-comment-by-ticketId", async (req, res) => {
  try {
    const boards = await Comment.find({ ticketId: req.body.ticketId }).lean();
    // console.log(`Success find boards`, boards[0].comments);
    // return res.send(boards);

    if (boards.length == 0) {
      return res.json({ status: 0, message: "No comment available" });
    }

    var newcards = boards[0].comments.filter((el) => el.id !== req.body.id);
    // boards[0].comments.map((item) => {
    //   if (item.id !== req.body.id) return item;
    //   newcards = boards[0].comments.filter((el) => el !== req.body.ticketId);
    //   //   return {
    //   //     ...item,
    //   //     cards: item.cards.filter((el) => el !== req.body.ticketId),
    //   //   };
    // });

    // console.log("filterdBoards", newcards);
    // return;
    Comment.updateOne(
      { ticketId: req.body.ticketId },
      {
        $set: {
          comments: newcards,
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
