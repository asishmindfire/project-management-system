const express = require("express");
const router = express.Router();
const { Ticket } = require("../models/projectSchema");

router.post("/tickets-by-projectid", (req, res) => {
  // console.log("Hello World", req.body.projectId);

  Ticket.find({
    projectId: req.body.projectId,
  })
    .then((projectExist) => {
      console.log(`Success findOne`, projectExist.length);

      if (projectExist.length == 0) {
        return res.json({ status: 0, message: "No Tickets Available" });
      }

      return res.json({ status: 1, message: "Record Fetched Successfully.", data: projectExist });
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
