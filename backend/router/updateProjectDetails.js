const express = require("express");
const router = express.Router();
const { Project } = require("../models/projectSchema");
const moment = require("moment-timezone");

router.post("/update-project", (req, res) => {
  console.log("request body of update-project ->", req.body);

  //  for(let [key, value] of Object.entries(req.body.update_data)) {
  //   console.log(key, value);
  //  }
  req.body.update_data.updated_date = moment().tz("Asia/Kolkata").format();

  Project.updateOne(
    { ticketId: req.body.projectId },
    {
      $set: req.body.update_data,
    },
    { upsert: false }
  )
    .then((projectExist) => {
      console.log(`Succes findOne in update-ticket ->`, projectExist);

      if (projectExist.acknowledged == true && projectExist.modifiedCount == 0) {
        console.log("This project not exists!");
        return res.json({
          status: 0,
          message: "Please Provide a Valid Project.",
        });
      }

      res.json({
        status: 1,
        message: "Record Updated Successfully.",
      });
    })
    .catch((err) => {
      console.log(`Error in findOne update-project ->`, err);
      return res.json({
        status: 0,
        message: err.message,
      });
    });
});

module.exports = router;
