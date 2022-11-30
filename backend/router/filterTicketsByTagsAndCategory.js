const express = require("express");
const router = express.Router();
const { Ticket, Category, Tag } = require("../models/projectSchema");

router.post("/tickets-by-categoryandtags", (req, res) => {
  // console.log("Hello World", req.body.projectId);

  Ticket.find({
    assign_to: req.body.user_id,
    category_id: req.body.category_id,
  })
    .lean()
    .then((ticketExist) => {
      console.log(`Success findOne---:>`, ticketExist.length);

      if (ticketExist.length == 0) {
        return res.json({ status: 0, message: "No Tickets Available" });
      }
      Category.find({})
        .then((allCategories) => {
          console.log(allCategories);

          const categoryAddedTickets = ticketExist.map((ticket) => {
            return new Promise((resolve, reject) => {
              try {
                var category_name = "";
                allCategories.forEach((el) => {
                  if (el["category_id"] == ticket.category_id) {
                    category_name = el.category_name;
                  }
                });
                ticket["category_name"] = category_name;

                Tag.find({
                  ticketId: ticket.ticketId,
                })
                  .lean()
                  .then((tagsExist) => {
                    console.log(`Success findOne--`, tagsExist);

                    if (tagsExist.length == 0) {
                      // return res.json({
                      //   status: 0,
                      //   message: "No Tags Available",
                      // });
                      ticket["tags"] = [];
                    } else {
                      ticket["tags"] = tagsExist[0].tags;
                    }

                    resolve(ticket);

                    // return res.json({ status: 1, message: "Record Fetched Successfully.", data: tagsExist });
                  })
                  .catch((err) => {
                    console.log(`Error in findOne ->`, err);
                    return res.json({
                      status: 0,
                      message: err.message,
                    });
                  });
              } catch (error) {
                console.log(error);
                reject(error);
              }
              //   return res.json({ status: 1, message: "Record Fetched Successfully.", data: ticketExist });
            });
          });

          Promise.all(categoryAddedTickets)
            .then((promisesData) => {
              console.log("promisesData", promisesData);
              return res.json({
                status: 1,
                message: "Record Fetched Successfully.",
                data: promisesData,
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
      //   return res.json({ status: 1, message: "Record Fetched Successfully.", data: projectExist });
    })
    .catch((err) => {
      console.log(`Error in findOne ->`, err);
      return res.json({
        status: 0,
        message: err.message,
      });
    });
});

module.exports = router;
