const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");

// eslint-disable-next-line
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const cors = require("cors");
const mongooseSetup = require("./services/mongoose");

mongooseSetup.setUpConnection();

// eslint-disable-next-line
const passportSetup = require("./services/passport");

const auth = require("./api/auth");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"]
  })
);
app.use(passport.initialize());
// app.use(passport.session());
app.use(bodyParser());
app.use("/auth", auth);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server run on ${port}`));

module.exports = {
  app
};
