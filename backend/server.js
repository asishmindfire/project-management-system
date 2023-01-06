const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
// const swggerJSDoc = require('swagger-jsdoc');
const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");
// const swaggerJSDoc = require("swagger-jsdoc");

app.use(cors());
dotenv.config({ path: "./config.env" });
require("./db/conn");
app.use(express.json());
// I have converted the @ to %40 in the below connection url because the mongodb doesn't understand some special character.

const swaggerJsDocs = YAML.load("./apidocumentation.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDocs));

// const option = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Node Js API Project for Project Management System",
//       version: "1.0.0",
//     },
//     servers: [
//       {
//         url: "http://localhost:8080/",
//       },
//     ],
//     securityDefinitions: {
//       AuthToken: {
//         type: "apiKey",
//         name: "auth-token",
//         in: "header",
//         description: "The token for authentication",
//       },
//     },
//     security: [
//       {
//         Authorization: [],
//       },
//     ],
//     // security: [{ bearerAuth: [] }],
//   },
//   apis: ["./router/*.js", "./server.js"], // Here * called as wild-card.
//   // apis: ["./server.js"],
// };

// components:
//   schemas:
//     Wallet2Cashout:
//       required:
//         - amount
//         - fundTransferType
//         - bankAccountNumber
//         - ifsc
//         - beneName
//         - username
//         - phoneNo
//         - issl
//         - type
//       type: object
//       properties:
//                 amount:
//                   type: "number"
//                 fundTransferType:
//                   type: "string"
//                 bankAccountNumber:
//                   type: "string"
//                 ifsc:
//                   type: "string"
//                 beneName:
//                     type: "string"
//                 username:
//                     type: "string"
//                 phoneNo:
//                     type: "number"
//                 issl:
//                     type: "boolean"
//                 type:
//                     type: "string"
//   securitySchemes:
//     api_key:
//       type: apiKey
//       name: Authorization
//       in: header

app.use("/", require("./router/project"));
app.use("/", require("./router/fetchAllProject"));
app.use("/", require("./router/registration"));
app.use("/", require("./router/login"));
app.use("/", require("./router/ticket"));
app.use("/", require("./router/updateTicketDetails"));
app.use("/", require("./router/updateProjectDetails"));
app.use("/", require("./router/ticketsByProjectId"));
app.use("/", require("./router/updateTicketTags"));
app.use("/", require("./router/getProfile"));
app.use("/", require("./router/fetchAllTicketsByUserid"));
app.use("/", require("./router/filterTicketsByTagsAndCategory"));
app.use("/", require("./router/fetchAllCategories"));
app.use("/", require("./router/fetchAllUserProperties"));
app.use("/", require("./router/insertBoard"));
app.use("/", require("./router/getBoard"));
app.use("/", require("./router/removeBoard"));
app.use("/", require("./router/removeTicket"));
app.use("/", require("./router/updateBoard"));
app.use("/", require("./router/addComment"));
app.use("/", require("./router/getComments"));
app.use("/", require("./router/fetchUserByUserId"));
app.use("/", require("./router/updateCommentByTicketId"));
app.use("/", require("./router/deleteComment"));

const server = app.listen(8080, () => {
  // var host = server.address().address;
  var host = "localhost";
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
