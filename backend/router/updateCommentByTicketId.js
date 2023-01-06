const express = require("express");
const router = express.Router();
const { Comment } = require("../models/projectSchema");
const moment = require("moment-timezone");

router.post("/update-comment-by-ticketId", async (req, res) => {
  console.log(`/update-comment-by-userId =>`, req.body);

  try {
    const boards = await Comment.find({ ticketId: req.body.ticketId });
    // console.log(`Success find boards`, boards.length);

    if (boards.length == 0) {
      return res.json({ status: 0, message: "No ticket available" });
    }

    Comment.updateOne(
      { ticketId: req.body.ticketId, "comments.id": req.body.update_data.id },
      {
        $set: {
          "comments.$.comment": req.body.update_data.comment,
          "comments.$.date": moment().tz("Asia/Kolkata").format(),
        },
      },
      { upsert: false }
    )
      .then((tagExist) => {
        console.log(`Succes findOne in update-ticket-tags ->`, tagExist);

        if (tagExist.acknowledged == true && tagExist.modifiedCount == 0) {
          console.log("This tags not exists!");
          return res.json({
            status: 0,
            message: "Please provide a valid ticket.",
          });
        }

        res.json({
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
