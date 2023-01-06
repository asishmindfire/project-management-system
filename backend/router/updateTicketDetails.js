const express = require("express");
const router = express.Router();
const { Ticket, Tag } = require("../models/projectSchema");
const MiddlewareServices = require("../services/middlewares");
const moment = require("moment-timezone");

router.post(
  "/update-ticket",
  MiddlewareServices.verifyToken,
  async (req, res) => {
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

    console.log(req.body.update_data.updated_date);
    req.body.update_data.updated_date = moment().tz("Asia/Kolkata").format(); // new Date(req.body.update_data.updated_date);
    var update_tags = req.body.update_data.tags;
    delete req.body.update_data.tags;

    var categories = [
      { category_id: 898978, category_name: "Bug" },
      { category_id: 898973, category_name: "Task" },
      {
        category_id: 898972,
        category_name: "Feature",
      },
    ];

    var category_id;
    for (let item of categories) {
      if (item.category_name === req.body.update_data.category_name) {
        category_id = item.category_id;
      }
    }
    req.body.update_data.category_id = category_id;
    console.log(req.body.update_data);
    // return;

    Ticket.findOne({ ticketId: req.body.ticketId })
      .lean()
      .then((findTickets) => {
        // console.log("findTicketsfindTickets ->", findTickets);
        // return;

        if (findTickets === null) {
          return res.json({
            status: 0,
            message: "Please provide a valid ticket.",
          });
        }

        console.log(`=-=-=-=>`, req.body.update_data);
        // return;

        Ticket.updateOne(
          { ticketId: req.body.ticketId },
          {
            $set: req.body.update_data,
          },
          { upsert: false }
        )
          .then((ticketExist) => {
            console.log(`Succes updateOne in update-ticket ->`, ticketExist);

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

            if (update_tags && update_tags.length > 0) {
              Tag.find({ tagsList_id: findTickets.tag_id })
                .lean()
                .then((findtags) => {
                  var tagsToBeUpdate = [];
                  update_tags.forEach((el) => {
                    if (!findtags[0].tags.includes(el)) {
                      tagsToBeUpdate.push(el);
                    }
                  });

                  console.log("Hrte is ,a", update_tags);

                  Tag.updateOne(
                    { tagsList_id: findTickets.tag_id },
                    {
                      // $push: {
                      //   tags: { $each: tagsToBeUpdate },
                      // },
                      // $set: {
                      //   tags: tagsToBeUpdate
                      // },
                      $set: {
                        tags: update_tags,
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
                  console.log(`Error in find update-tags ->`, err);
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
      })
      .catch((err) => {
        console.log(`Error in ticket find -->`, err);
        return res.json({
          status: 0,
          message: err.message,
        });
      });
  }
);

module.exports = router;
