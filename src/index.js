const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config();

const auth = require("./api/auth");

const app = express();
app.use(bodyParser());
app.use("/auth", auth);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server run on ${port}`));

module.exports = {
  app
};
