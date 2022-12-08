const express = require("express");
const router = express.Router();
const { Ticket, Tag } = require("../models/projectSchema");
const MiddlewareServices = require("../services/middlewares");
const moment = require("moment-timezone");

router.post("/update-ticket", MiddlewareServices.verifyToken, (req, res) => {
  console.log("request body of update-ticket ->", req.body);

  //  for(let [key, value] of Object.entries(req.body.update_data)) {
  //   console.log(key, value);
  //  }

  // if (req.body.payload.user_role === "Developer_Role") {
  //   return res.status(401).json({
  //     status: 0,
  //     message: "You are not Authorized to Access this Resource.",
  //   });
  // }

  if (!Object.keys(req.body.update_data).length > 0) {
    return res.json({
      status: 0,
      message: "Please provide valid input to update.",
    });
  }

  req.body.update_data.updated_date = moment().tz("Asia/Kolkata").format();
  var update_tags = req.body.update_data.tags;
  delete req.body.update_data.tags;

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

      if (update_tags && update_tags.length > 0) {
        Tag.find({ ticketId: req.body.ticketId })
          .lean()
          .then((findtags) => {
            var tagsToBeUpdate = [];
            update_tags.forEach((el) => {
              if (!findtags[0].tags.includes(el)) {
                tagsToBeUpdate.push(el);
              }
            });

            Tag.updateOne(
              { ticketId: req.body.ticketId },
              {
                $push: {
                  tags: { $each: tagsToBeUpdate },
                },
                $set: {
                  updated_date: moment().tz("Asia/Kolkata").format(),
                },
              },
              { upsert: false }
            )
              .then((tagExist) => {
                console.log(
                  `Succes findOne in update-ticket-tags ->`,
                  tagExist
                );

                if (
                  tagExist.acknowledged == true &&
                  tagExist.modifiedCount == 0
                ) {
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
          })
          .catch((err) => {
            console.log(`Error in updateOne update-tags ->`, err);
            return res.json({
              status: 0,
              message: err.message,
            });
          });
      } else {
        res.json({
          status: 1,
          message: "Record Updated Successfully.",
        });
      }
    })
    .catch((err) => {
      console.log(`Error in updateOne update-ticket ->`, err);
      return res.json({
        status: 0,
        message: err.message,
      });
    });
});

module.exports = router;
