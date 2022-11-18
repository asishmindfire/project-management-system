const express = require("express");
const router = express.Router();
const Project = require("../models/projectSchema");

router.post("/addproject", (req, res) => {
  console.log("request body of addproject ->", req.body);

  Project.findOne({ projectId: req.body.projectId })
    .then((projectExist) => {
      console.log(`Succes findOne in addproject ->`, projectExist);

      if (projectExist) {
        console.log("This project already exists!");
        return res.json({ Error: "This project already exists!" });
      }

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
