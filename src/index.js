const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");

require("dotenv").config();

const mongooseSetup = require("./services/mongoose");

// eslint-disable-next-line
const passportSetup = require("./services/passport");

mongooseSetup.setUpConnection();

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
