const express = require("express");
const router = express.Router();
const { Ticket } = require("../models/projectSchema");
const moment = require("moment-timezone");

router.post("/update-ticket", (req, res) => {
  console.log("request body of update-ticket ->", req.body);

  //  for(let [key, value] of Object.entries(req.body.update_data)) {
  //   console.log(key, value);
  //  }
  req.body.update_data.updated_date = moment().tz("Asia/Kolkata").format();

  Ticket.updateOne(
    { ticketId: req.body.ticketId },
    {
      $set: req.body.update_data,
    },
    { upsert: false }
  )
    .then((ticketExist) => {
      console.log(`Succes findOne in update-ticket ->`, ticketExist);

      if (ticketExist.acknowledged == true && ticketExist.modifiedCount == 0) {
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
});

module.exports = router;
