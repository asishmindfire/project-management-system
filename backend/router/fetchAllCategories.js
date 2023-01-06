const express = require("express");
const router = express.Router();
const { Category } = require("../models/projectSchema");

// /**
//  * @swagger
//  *  components:
//  *    schemas:
//  *      CategoryRes:
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
//  *               _id:
//  *                  type: string
//  *               category_id:
//  *                  type: integer
//  *               category_name:
//  *                  type: string
//  */

// /**
//  * @swagger
//  * /get-all-categories:
//  *  get:
//  *    summary: This api is used to insert new project in mongodb
//  *    description: This api is used to insert new project in mongodb
//  *    responses:
//  *      200:
//  *        description: insert project api
//  *        content:
//  *          application/json:
//  *            type: object
//  *            schema:
//  *              items:
//  *                $ref: '#components/schemas/CategoryRes'
//  */

router.get("/get-all-categories", async (req, res) => {
  // console.log("Hello World", req.body.projectId);

  // Category.find({})
  //   .then((categoriesExist) => {
  //     console.log(`Success findOne`, categoriesExist.length);

  //     if (categoriesExist.length == 0) {
  //       return res.json({ status: 0, message: "No Tickets Available" });
  //     }

  //     return res.json({
  //       status: 1,
  //       message: "Record Fetched Successfully.",
  //       data: categoriesExist,
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(`Error in findOne ->`, err);
  //     return res.json({
  //       status: 0,
  //       message: err.message,
  //     });
  //   });

  try {
    const categoriesExist = await Category.find({});
    // console.log(`Success findOne`, categoriesExist.length);

    if (categoriesExist.length == 0) {
      return res.json({ status: 0, message: "No Tickets Available" });
    }

    return res.json({
      status: 1,
      message: "Record Fetched Successfully.",
      data: categoriesExist,
    });
  } catch (err) {
    console.log(`Error in findOne ->`, err);
    return res.json({
      status: 0,
      message: err.message,
    });
  }
});

module.exports = router;
