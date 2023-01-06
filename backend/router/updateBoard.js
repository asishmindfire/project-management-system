const express = require("express");
const router = express.Router();
const { Board } = require("../models/projectSchema");

router.post("/update-board", async (req, res) => {
  console.log(`Request body ->`, req.body);
  try {
    const boards = await Board.find({ projectId: req.body.projectId }).lean();
    console.log(`Success find boards`, boards[0].boards);
    // return res.send(boards);

    if (boards.length == 0) {
      return res.json({ status: 0, message: "No boards available" });
    }

    let s_bIndex, s_cIndex, t_bIndex, t_cIndex;

    s_bIndex = boards[0].boards.findIndex(
      (item) => item.id === req.body.boardId
    );
    if (s_bIndex < 0) return;

    // console.log("s_bIndex", s_bIndex);

    s_cIndex = boards[0].boards[s_bIndex].cards?.findIndex(
      (item) => item === req.body.ticketId
    );
    if (s_cIndex < 0) return;

    // console.log("s_cIndex", s_cIndex);

    t_bIndex = boards[0].boards.findIndex((item) => item.id === req.body.bid);
    if (t_bIndex < 0) return;

    // console.log("t_bIndex", t_bIndex);

    t_cIndex = boards[0].boards[t_bIndex].cards?.findIndex(
      (item) => item === req.body.cid
    );
    if (t_cIndex < 0) return;

    console.log(
      "s_bIndex",
      s_bIndex,
      "s_cIndex",
      s_cIndex,
      "t_bIndex",
      t_bIndex,
      "t_cIndex",
      t_cIndex
    );

    console.log(`s==>`, boards[0].boards[s_bIndex].cards);
    console.log(`d==>`, boards[0].boards[t_bIndex].cards);
    // console.log(`==>`, req.body.ticketId);
    const sourceCard = boards[0].boards[s_bIndex].cards.filter(
      (item) => item !== req.body.ticketId
    );
    boards[0].boards[t_bIndex].cards.splice(t_cIndex, 0, req.body.ticketId);
    // const destinationCard = boards[0].boards[t_bIndex].cards;
    const destinationCard = boards[0].boards[t_bIndex].cards.filter((item, index, array) => array.indexOf(item) === index);
    // console.log(`Temp==>`, destinationCardTemp);
    console.log(`fs==>`, sourceCard);
    console.log(`fd==>`, destinationCard);
    // return;
    Board.updateOne(
      {
        projectId: req.body.projectId,
        "boards.id": boards[0].boards[s_bIndex].id,
      },
      {
        $set: {
          "boards.$.cards": sourceCard,
        },
      },
      { upsert: false }
    )
      .then((tagExist) => {
        console.log(`Succes findOne in update-ticket-tags ->`, tagExist);

        Board.updateOne(
          {
            projectId: req.body.projectId,
            "boards.id": boards[0].boards[t_bIndex].id,
          },
          {
            $set: {
              "boards.$.cards": destinationCard,
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
