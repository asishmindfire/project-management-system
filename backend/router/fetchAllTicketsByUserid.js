const express = require("express");
const router = express.Router();
const { Ticket, Category, Tag } = require("../models/projectSchema");

// /**
//  * @swagger
//  *  components:
//  *    schemas:
//  *      ticketReq:
//  *        type: object
//  *        properties:
//  *          user_id:
//  *            type: integer
//  */

// /**
//  * @swagger
//  *  components:
//  *    schemas:
//  *      ticketRes:
//  *        type: object
//  *        properties:
//  *          status:
//  *            type: integer
//  *          message:
//  *            type: string
//  *          data:
//  *            type: array
//  *            items:
//  *              type: object
//  *              properties:
//  *               ticketId:
//  *                  type: integer
//  *               projectId:
//  *                  type: integer
//  *               ticketname:
//  *                  type: string
//  *               ticketdescription:
//  *                  type: string
//  *               created_by:
//  *                  type: integer
//  *               assign_to:
//  *                  type: integer
//  *               acceptance_criteria:
//  *                  type: string
//  *               status:
//  *                  type: string
//  *               category_name:
//  *                  type: string
//  */

// /**
//  * @swagger
//  * /tickets-by-userid:
//  *  post:
//  *    summary: This api is used to insert new project in mongodb
//  *    description: This api is used to insert new project in mongodb
//  *    requestBody:
//  *        required: true
//  *        content:
//  *          application/json:
//  *            schema:
//  *              $ref: '#components/schemas/ticketReq'
//  *    responses:
//  *      200:
//  *        description: insert project api
//  *        content:
//  *          application/json:
//  *            schema:
//  *              items:
//  *                $ref: '#components/schemas/ticketRes'
//  */

router.post("/tickets-by-userid", (req, res) => {
  // console.log("Hello World", req.body.projectId);

  Ticket.find({
    assign_to: req.body.user_id,
  })
    .lean()
    .then((ticketExist) => {
      console.log(`Success findOne`, ticketExist.length);

      if (ticketExist.length == 0) {
        return res.json({ status: 0, message: "No Tickets Available", data: [] });
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
