const express = require("express");
const router = express.Router();
const { Ticket, Category, Tag, Board } = require("../models/projectSchema");

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

router.post("/tickets-by-userid", async (req, res) => {
  // console.log("Hello World", req.body.projectId);

  try {
    const ticketExist = await Ticket.find({
      // assign_to: req.body.user_id,
      projectId: req.body.projectId,
    }).lean();
    // console.log(`All tickets =>`, ticketExist);

    if (ticketExist.length == 0) {
      return res.json({
        status: 0,
        message: "No Tickets Available",
        data: [],
      });
    }
    const allCategories = await Category.find({}).lean();
    // .then((allCategories) => {
    // console.log(allCategories);

    const categoryAddedTickets = ticketExist.map(async (ticket) => {
      return new Promise(async (resolve, reject) => {
        try {
          var category_name = "";
          allCategories.forEach((el) => {
            if (el["category_id"] == ticket.category_id) {
              category_name = el.category_name;
            }
          });
          ticket["category_name"] = category_name;

          const tagsExist = await Tag.find({
            tagsList_id: ticket.tag_id,
          }).lean();
          // .then((tagsExist) => {
          // console.log(`Success findOne--`, tagsExist);

          if (tagsExist.length == 0) {
            ticket["tags"] = [];
          } else {
            ticket["tags"] = tagsExist[0].tags;
          }

          resolve(ticket);
        } catch (error) {
          console.log(error);
          reject(error);
        }
      });
    });

    const promisesData = await Promise.all(categoryAddedTickets);
    // .then((promisesData) => {
    console.log("promisesData", promisesData[0]);
    // return res.json({
    //   status: 1,
    //   message: "Record Fetched Successfully.",
    //   data: promisesData,
    // });

    try {
      const boards = await Board.find({ projectId: req.body.projectId });
      // console.log(`All boards =>`, boards[0].boards);

      if (boards.length == 0) {
        return res.json({ status: 0, message: "No boards available" });
      }

      const colors = [
        "#a8193d",
        "#4fcc25",
        "#1ebffa",
        "#8da377",
        "#9975bd",
        "#cf61a1",
        "#240959",
      ];

      // console.log(`-====->`, boards[0].boards);

      var newFinalBoard = [];

      for (const item of boards[0].boards) {
        var obj = {...item, cards: item.cards.map(
          (ticketid) => {
            for (const el of promisesData) {
             if (el.ticketId === ticketid) {
                return {
                  id: el.ticketId,
                  title: el.ticketname,
                  labels: el.tags.map((item) => ({
                    text: item,
                    color: colors[Math.floor(Math.random() * colors.length)],
                  })),
                  tasks: [],
                  date: el.updated_date,
                  desc: el.ticketdescription,
                  assign_to: el?.assign_to,
                  created_by: el?.created_by,
                  category_name: el?.category_name
                };
              }
            }
          }
        )}
        // console.log(`===>`,obj);
        for (const item of obj.cards) {
        var index = obj.cards.indexOf(undefined);
        if (item === undefined && index > -1) {
          obj.cards.splice(index, 1);
        }
      }
        // console.log("objobj", obj.cards.splice(obj.cards.indexOf(undefined), 1));
        // // if (!obj.cards.includes(undefined)) {
          newFinalBoard.push(obj); 
        // }
      }

      // var finalBoard = boards[0].boards.map((item) => ({
      //   ...item,
      //   cards: item.cards.map(
      //     (ticketid) => {
      //       // promisesData.find((el) => el.ticketId === ticketid)
      //       // promisesData.forEach((el) => {
      //       for (const el of promisesData) {
      //         // console.log(el);
      //         // console.log(el.tags.map((item) => ({text: item, color: colors[Math.floor(Math.random()*colors.length)]})));
      //         if (el.ticketId === ticketid) {
      //           return {
      //             id: el.ticketId,
      //             title: el.ticketname,
      //             labels: el.tags.map((item) => ({
      //               text: item,
      //               color: colors[Math.floor(Math.random() * colors.length)],
      //             })),
      //             tasks: [],
      //             date: el.updated_date,
      //             desc: el.ticketdescription,
      //             assign_to: el?.assign_to,
      //             created_by: el?.created_by,
      //           };
      //         }
      //       }
      //     }
      //     // })
      //   ),
      // }));


      //   id: Date.now() + Math.random(),
      //   title,
      //   labels: [],
      //   tasks: [],
      //   date: "",
      //   desc: "",
      // boards[0].boards = finalBoard;
      boards[0].boards = newFinalBoard;

      console.log("finalBoard", boards[0].boards);

      return res.json({
        status: 1,
        message: "Record Fetched Successfully.",
        data: boards,
      });
    } catch (err) {
      console.log(`Error in findOne boards ->`, err);
      return res.json({
        status: 0,
        message: err.message,
      });
    }
  } catch (err) {
    console.log(`Error in findOne ->`, err);
    return res.json({
      status: 0,
      message: err.message,
    });
  }
});

module.exports = router;
