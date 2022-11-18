const express = require("express");
const router = express.Router();
const Project = require("../models/projectSchema");

router.get("/fetchallprojects", (req, res) => {
  console.log("Hello World", req.body.projectId);

  //   Project
  //     .collection("projects")
  //     .find({})
  //     .toArray((err, result) => {
  //       if (err) throw err;
  //       console.log(result);
  //     });

  Project.find({})
    .then((projectExist) => {
      console.log(`Success findOne`, projectExist.length);

      if (projectExist.length == 0) {
        return res.json({ status: 0, message: "No project available" });
      }

      return res.json({ status: 1, data: projectExist });
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
