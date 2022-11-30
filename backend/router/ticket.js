const express = require("express");
const router = express.Router();
const { Ticket, Category, Tag } = require("../models/projectSchema");
const moment = require("moment-timezone");

router.post("/insert-ticket", (req, res) => {
  console.log("request body of insert-ticket ->", req.body);

  var minm = 100000;
  var maxm = 999999;
  var id = Math.floor(Math.random() * (maxm - minm + 1)) + minm;

  Category.find({})
    .then((allCategories) => {
      console.log(allCategories);

      var category_id = "";
      allCategories.forEach((el) => {
        if (el["category_name"] == req.body.category_name) {
          category_id = el.category_id;
        }
      });
      console.log("category_id", category_id);

      Ticket.findOne({ ticketId: req.body.ticketId })
        .then((ticketExist) => {
          console.log(`Succes findOne in insert-ticket ->`, ticketExist);

          if (ticketExist) {
            console.log("This ticket already exists!");
            return res.json({
              status: 0,
              message: "This ticket already exists!",
            });
          }

          req.body.ticketId = id;
          req.body.created_date = moment().tz("Asia/Kolkata").format();
          req.body.updated_date = moment().tz("Asia/Kolkata").format();
          req.body.category_id = category_id;

          const ticket = new Ticket(req.body);

          ticket
            .save()
            .then((ticketSave) => {
              console.log(`ticket created successfully.`, ticketSave);

              const tags = new Tag({
                projectId: req.body.projectId,
                tags: req.body.tags,
                ticketId: id,
                created_date: moment().tz("Asia/Kolkata").format(),
                updated_date: moment().tz("Asia/Kolkata").format(),
              });

              tags
                .save()
                .then((tagsSave) => {
                  console.log(`tags created successfully.`, tagsSave);

                  //   const category = new Category({
                  //     projectId: req.body.projectId,
                  //     category: req.body.category,
                  //     ticketId: id,
                  //     created_date: moment().tz("Asia/Kolkata").format(),
                  //     updated_date: moment().tz("Asia/Kolkata").format(),
                  //   });

                  //   category
                  //     .save()
                  //     .then((categorySave) => {
                  //       console.log(
                  //         `category created successfully.`,
                  //         categorySave
                  //       );
                  return res.json({
                    status: 1,
                    message: `Ticket created successfully - Ticket_id:${id}`,
                  });
                  //     })
                  //     .catch((err) => {
                  //       console.log(`Error in categorySave ->`, err);
                  //       return res.json({
                  //         status: 0,
                  //         message: err.message,
                  //       });
                  //     });
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
