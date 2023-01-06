const express = require("express");
const router = express.Router();
const { Board } = require("../models/projectSchema");
const moment = require("moment-timezone");

router.post("/insert-board", (req, res) => {
  console.log("request body of insert board ->", req.body);

  var minm = 100000;
  var maxm = 999999;
  var id = Math.floor(Math.random() * (maxm - minm + 1)) + minm;

  console.log(typeof id);

  Board.findOne({ projectId: req.body.projectId })
    .then((checkBoard) => {
      console.log(`Succes findOne in checkBoard ->`, checkBoard);

      if (checkBoard) {
        console.log("This board already exists!");
        // return res.json({ status: 0, message: "This board already exists!" });

        var addBoard = {};
        addBoard.id = id;
        addBoard.title = req.body.title;
        addBoard.cards = req.body.cards;

        Board.updateOne(
          { projectId: req.body.projectId },
          {
            $push: {
              boards: addBoard,
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
      } else {
        var addBoard = {};
        addBoard.id = id;
        addBoard.title = req.body.title;
        addBoard.cards = req.body.cards;
        //   req.body.created_date = moment().tz("Asia/Kolkata").format();
        //   req.body.updated_date = moment().tz("Asia/Kolkata").format();

        const board = new Board({
          projectId: req.body.projectId,
          boards: [addBoard],
        });

        board
          .save()
          .then((savedBoard) => {
            console.log(`Board created successfully.`, savedBoard);
            return res.json({
              status: 1,
              message: "Board created successfully.",
            });
          })
          .catch((err) => {
            console.log(`Error in Save Board ->`, err);
            return res.json({
              status: 0,
              message: err.message,
            });
          });
      }
    })
    .catch((err) => {
      console.log(`Error in findOne Board ->`, err);
      return res.json({
        status: 0,
        message: err.message,
      });
    });
});

module.exports = router;
