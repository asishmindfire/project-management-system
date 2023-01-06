const express = require("express");
const router = express.Router();
const { Ticket, Category, Tag, Board } = require("../models/projectSchema");
const moment = require("moment-timezone");

router.post("/insert-ticket", (req, res) => {
  console.log("request body of insert-ticket ->", req.body);

  var minm = 100000;
  var maxm = 999999;
  var id = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
  var tag_id = Math.floor(Math.random() * (maxm - minm + 1)) + minm;

  Category.find({})
    .then((allCategories) => {
      console.log(allCategories);

      var category_id = "";
      allCategories.forEach((el) => {
        if (el["category_name"] == req.body.category_name) {
          category_id = el.category_id;
        }
      });
      // console.log("category_id", category_id);

      Ticket.findOne({ ticketId: req.body.ticketId })
        .then((ticketExist) => {
          // console.log(`Succes findOne in insert-ticket ->`, ticketExist);

          if (ticketExist) {
            console.log("This ticket already exists!");
            return res.json({
              status: 0,
              message: "This ticket already exists!",
            });
          }

          req.body.ticketId = id;
          req.body.created_date = moment().tz("Asia/Kolkata").format('YYYY-MM-DD');
          req.body.updated_date = moment().tz("Asia/Kolkata").format('YYYY-MM-DD');
          req.body.category_id = category_id;
          req.body.tag_id = tag_id;

          const ticket = new Ticket(req.body);

          ticket
            .save()
            .then((ticketSave) => {
              // console.log(`ticket created successfully.`, ticketSave);

              const tags = new Tag({
                // projectId: req.body.projectId,
                tagsList_id: tag_id,
                tags: req.body.tags,
                // ticketId: id,
                created_date: moment().tz("Asia/Kolkata").format('YYYY-MM-DD'),
                updated_date: moment().tz("Asia/Kolkata").format('YYYY-MM-DD'),
              });

              tags
                .save()
                .then(async (tagsSave) => {
                  // console.log(`tags created successfully.`, tagsSave);

                  try {
                    const boards = await Board.find({
                      projectId: req.body.projectId,
                    });
                    // console.log(`Success find boards`, boards[0].boards);

                    if (boards.length == 0) {
                      return res.json({
                        status: 0,
                        message: "No boards available",
                      });
                    }

                    var bol = boards[0].boards.find(
                      (item) => item.id === req.body.bid
                    );
                    // console.log(`bollll`, bol);

                    //   if (!bol) {
                    Board.updateOne(
                      { projectId: req.body.projectId, "boards.id": bol.id },
                      {
                        $push: {
                          "boards.$.cards": { $each: [id] },
                        },
                      },
                      { upsert: false }
                    )
                      .then((tagExist) => {
                        // console.log(
                        //   `Succes findOne in update-ticket-tags ->`,
                        //   tagExist
                        // );

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
                    // }
                    // return res.json({
                    //   status: 1,
                    //   message: "Record Fetched Successfully.",
                    //   data: boards,
                    // });
                  } catch (err) {
                    console.log(`Error in findOne boards ->`, err);
                    return res.json({
                      status: 0,
                      message: err.message,
                    });
                  }
                  // return res.json({
                  //   status: 1,
                  //   message: `Ticket created successfully - Ticket_id:${id}`,
                  // });
                })
                .catch((err) => {
                  console.log(`Error in tagsSave ->`, err);
                  return res.json({
                    status: 0,
                    message: err.message,
                  });
                });
            })
            .catch((err) => {
              console.log(`Error in ticketSave ->`, err);
              return res.json({
                status: 0,
                message: err.message,
              });
            });
        })
        .catch((err) => {
          console.log(`Error in findOne insert-ticket ->`, err);
          return res.json({
            status: 0,
            message: err.message,
          });
        });
    })
    .catch((err) => {
      console.log(`Error in findOne insert-ticket ->`, err);
      return res.json({
        status: 0,
        message: err.message,
      });
    });
});

module.exports = router;
