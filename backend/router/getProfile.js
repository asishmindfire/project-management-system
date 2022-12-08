const express = require("express");
const router = express.Router();
const MiddlewareServices = require("../services/middlewares");
const { User } = require("../models/projectSchema");

// /**
//  * @swagger
//  *  components:
//  *    schemas:
//  *      ProfileRes:
//  *        type: object
//  *        properties:
//  *          status:
//  *            type: integer
//  *          message:
//  *            type: string
//  *            data:
//  *              type: object
//  *              properties:
//  *               user_id:
//  *                  type: integer
//  *               user_name:
//  *                  type: string
//  *               user_role:
//  *                  type: string
//  *               email:
//  *                  type: string
//  *    securitySchemes:
//  *      api_key:
//  *        type: apiKey
//  *        name: Authorization
//  *        in: header
//  */


// /**
//  * @swagger
//  * /profile:
//  *  get:
//  *    summary: This api is used to insert new project in mongodb
//  *    description: This api is used to insert new project in mongodb
//  *    responses:
//  *          200:
//  *            description: insert project api
//  *            content:
//  *              application/json:
//  *                type: object
//  *                schema:
//  *                  items:
//  *                    $ref: '#components/schemas/ProfileRes'
//  */

router.get("/profile", MiddlewareServices.verifyToken, (req, res) => {
  User.findOne({
    user_id: req.body.payload.user_id,
  })
    .then((response) => {
      delete response["password"];
      if (response) {
        res.json({
          status: 1,
          message: "Record Fetched Successfully.",
          data: response,
        });
      } else {
        res.json({ status: 0, message: "User Record Not Found!" });
      }
    })
    .catch((err) => {
      console.log(`Error in fetch profile ->`, err);
      res
        .status(400)
        .json({ status: 0, message: "Oops! Something Went Wrong." });
    });
});

module.exports = router;
