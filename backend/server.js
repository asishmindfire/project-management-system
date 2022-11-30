const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require('cors');

app.use(cors());
dotenv.config({ path: "./config.env" });
require('./db/conn');
app.use(express.json());
// I have converted the @ to %40 in the below connection url because the mongodb doesn't understand some special character.


app.use('/', require('./router/project'));
app.use('/', require('./router/fetchAllProject'));
app.use('/', require('./router/registration'));
app.use('/', require('./router/login'));
app.use('/', require('./router/ticket'));
app.use('/', require('./router/updateTicketDetails'));
app.use('/', require('./router/updateProjectDetails'));
app.use('/', require('./router/ticketsByProjectId'));
app.use('/', require('./router/updateTicketTags'));
app.use('/', require('./router/getProfile'));
app.use('/', require('./router/fetchAllTicketsByUserid'));
app.use('/', require('./router/filterTicketsByTagsAndCategory'));
app.use('/', require('./router/fetchAllCategories'));


const server = app.listen(8080, () => {
  // var host = server.address().address;
  var host = "localhost";
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
