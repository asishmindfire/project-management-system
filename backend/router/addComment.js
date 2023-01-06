const express = require("express");
const router = express.Router();
const { Comment, Ticket } = require("../models/projectSchema");
const moment = require("moment-timezone");

router.post("/add-comment", (req, res) => {
  console.log("request body of addproject ->", req.body);

  var minm = 100000;
  var maxm = 999999;
  const commetsList = req.body.comments.map((item) => {
    return {
      id: Math.floor(Math.random() * (maxm - minm + 1)) + minm,
      username: item.username,
      comment: item.comment,
      date: moment().tz("Asia/Kolkata").format(),
    };
  });

  Comment.findOne({ ticketId: req.body.ticketId })
    .then((projectExist) => {
      console.log(`Succes findOne in addproject ->`, projectExist);

      if (!projectExist) {
        const comment = new Comment({
          ticketId: req.body.ticketId,
          comments: commetsList,
        });

        comment
          .save()
          .then((projectSave) => {
            console.log(`Project created successfully.`, projectSave);
            return res.json({
              status: 1,
              message: "Project created successfully.",
            });
          })
          .catch((err) => {
            console.log(`Error in Save ->`, err);
            return res.json({
              status: 0,
              message: err.message,
            });
          });
      } else if (commetsList.length < 0) {
        const comment = new Comment({
          ticketId: req.body.ticketId,
          comments: commetsList,
        });

        comment
          .save()
          .then((projectSave) => {
            console.log(`Project created successfully.`, projectSave);
            return res.json({
              status: 1,
              message: "Comments added successfully.",
            });
          })
          .catch((err) => {
            console.log(`Error in Save ->`, err);
            return res.json({
              status: 0,
              message: err.message,
            });
          });
      } else {
        Comment.updateOne(
          { ticketId: req.body.ticketId },
          {
            $push: {
              comments: { $each: commetsList },
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
      }
    })
    .catch((err) => {
      console.log(`Error in findOne addproject ->`, err);
      return res.json({
        status: 0,
        message: err.message,
      });
    });
});

module.exports = router;
