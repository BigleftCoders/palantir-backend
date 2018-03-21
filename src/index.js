const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");

// eslint-disable-next-line
const passportSetup = require("./config/passport");

const auth = require("./api/auth");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"]
  })
);

app.use(bodyParser());
app.use("/auth", auth);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server run on ${port}`));

module.exports = {
  app
};
