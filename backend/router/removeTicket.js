const express = require("express");
const router = express.Router();
const { Board, Ticket } = require("../models/projectSchema");

router.post("/remove-ticket", async (req, res) => {
  try {
    const boards = await Board.find({ projectId: req.body.projectId }).lean();
    console.log(`Success find boards`, boards[0].boards);
    // return res.send(boards);

    if (boards.length == 0) {
      return res.json({ status: 0, message: "No boards available" });
    }

    var newcards;
    boards[0].boards.map((item) => {
      if (item.id !== req.body.boardId) return item;
      newcards = item.cards.filter((el) => el !== req.body.ticketId);
      //   return {
      //     ...item,
      //     cards: item.cards.filter((el) => el !== req.body.ticketId),
      //   };
    });

    // console.log("filterdBoards", newcards);
    // return;
    Board.updateOne(
      { projectId: req.body.projectId, "boards.id": req.body.boardId },
      {
        $set: {
          "boards.$.cards": newcards,
        },
      },
      { upsert: false }
    )
      .then((tagExist) => {
        console.log(`Succes findOne in update-ticket-tags ->`, tagExist);

        // return res.json({
        //   status: 1,
        //   message: "Record Updated Successfully.",
        // });

        Ticket.deleteOne({ ticketId: req.body.ticketId })
          .then((tagExist) => {
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
