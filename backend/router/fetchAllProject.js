const express = require("express");
const router = express.Router();
const { Project } = require("../models/projectSchema");

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
//  *               projectId:
//  *                  type: integer
//  *               projectname:
//  *                  type: string
//  *               projectdescription:
//  *                  type: string
//  */

// /**
//  * @swagger
//  * /fetchallprojects:
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

router.get("/fetchallprojects", async (req, res) => {
  // console.log("Hello World", req.body.projectId);

  // Project.find({})
  //   .then((projectExist) => {
  //     console.log(`Success findOne`, projectExist.length);

  //     if (projectExist.length == 0) {
  //       return res.json({ status: 0, message: "No project available" });
  //     }

  //     return res.json({ status: 1, message: "Record Fetched Successfully.", data: projectExist });
  //   })
  //   .catch((err) => {
  //     console.log(`Error in findOne ->`, err);
  //     return res.json({
  //       status: 0,
  //       message: err.message,
  //     });
  //   });

  try {
    const projectExist = await Project.find({});
    // console.log(`Success findOne`, projectExist.length);

    if (projectExist.length == 0) {
      return res.json({ status: 0, message: "No project available" });
    }

    return res.json({
      status: 1,
      message: "Record Fetched Successfully.",
      data: projectExist,
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
