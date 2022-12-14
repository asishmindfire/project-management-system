const express = require("express");
const router = express.Router();
const { Tag, Ticket } = require("../models/projectSchema");
const moment = require("moment-timezone");

router.post("/update-ticket-tags", (req, res) => {
  console.log("request body of update-ticket-tags ->", req.body);

  Ticket.findOne({
    ticketId: req.body.ticketId,
  })
    .lean()
    .then((findTickets) => {
      console.log(`Success findOne`, findTickets);

      if (findTickets === null) {
        return res.json({ status: 0, message: "No Tickets Available" });
      }

      Tag.updateOne(
        { tagsList_id: findTickets.tag_id },
        {
          $push: {
            tags: { $each: req.body.tags },
          },
          $set: {
            updated_date: moment().tz("Asia/Kolkata").format(),
          },
        },
        { upsert: false }
      )
        .then((ticketExist) => {
          console.log(`Succes findOne in update-ticket-tags ->`, ticketExist);

          if (
            ticketExist.acknowledged == true &&
            ticketExist.modifiedCount == 0
          ) {
            console.log("This ticket not exists!");
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
          console.log(`Error in findOne update-ticket ->`, err);
          return res.json({
            status: 0,
            message: err.message,
          });
        });
    })
    .catch((err) => {
      console.log(`Error in findOne findTickets ->`, err);
      return res.json({
        status: 0,
        message: err.message,
      });
    });
});

module.exports = router;
