const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require('cors');

app.use(cors());

dotenv.config({ path: "./config.env" });
// I have converted the @ to %40 in the below connection url because the mongodb doesn't understand some special character.
require('./db/conn');
app.use(express.json());
app.use('/v1', require('./router/project'));
app.use('/v1', require('./router/fetchAllProject'));


const server = app.listen(8080, () => {
  // var host = server.address().address;
  var host = "localhost";
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
