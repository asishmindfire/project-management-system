const express = require("express");
const router = express.Router();
const { Project } = require("../models/projectSchema");
const moment = require("moment-timezone");

// /**
//  * @swagger
//  *  components:
//  *    schemas:
//  *      ProjectReq:
//  *        type: object
//  *        properties:
//  *          projectId:
//  *            type: integer
//  *          projectname:
//  *            type: string
//  *          projectdescription: 
//  *            type: string
//  *          created_by:
//  *            type: integer
//  */



// /**
//  * @swagger
//  *  components:
//  *    schemas:
//  *      ProjectRes:
//  *        type: object
//  *        properties:
//  *          status:
//  *            type: integer
//  *          message:
//  *            type: string
//  */

// /**
//  * @swagger
//  * /insert-project:
//  *  post:
//  *    summary: This api is used to insert new project in mongodb
//  *    description: This api is used to insert new project in mongodb
//  *    requestBody:
//  *        required: true
//  *        content:
//  *          application/json:
//  *            schema:
//  *              $ref: '#components/schemas/ProjectReq'
//  *    responses:
//  *      200:
//  *        description: insert project api
//  *        content: 
//  *          application/json:
//  *            schema:
//  *              items:
//  *                $ref: '#components/schemas/ProjectRes'
//  */

router.post("/insert-project", (req, res) => {
  console.log("request body of addproject ->", req.body);

  var minm = 100000;
  var maxm = 999999;
  var id = Math.floor(Math.random() * (maxm - minm + 1)) + minm;

  console.log(typeof id);

  Project.findOne({ projectId: req.body.projectId })
    .then((projectExist) => {
      console.log(`Succes findOne in addproject ->`, projectExist);

      if (projectExist) {
        console.log("This project already exists!");
        return res.json({ status: 0, message: "This project already exists!" });
      }

      req.body.projectId = id;
      req.body.created_date = moment().tz("Asia/Kolkata").format();
      req.body.updated_date = moment().tz("Asia/Kolkata").format();

      const project = new Project(req.body);

      project
        .save()
        .then((projectSave) => {
          console.log(`Project created successfully.`, projectSave);
          return res.json({
            status: 1,
            message: "Project created successfully.",
          });
        })
        .catch((err) => {
          console.log(`Error in Save ->`, err);
          return res.json({
            status: 0,
            message: err.message,
          });
        });
    })
    .catch((err) => {
      console.log(`Error in findOne addproject ->`, err);
      return res.json({
        status: 0,
        message: err.message,
      });
    });
});

module.exports = router;
