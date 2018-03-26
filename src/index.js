const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const cookieSession = require("cookie-session");
require("dotenv").config();

// eslint-disable-next-line
const passportSetup = require("./services/passport");
const mongooseSetup = require("./services/mongoose");

// connect to mongoDB

const auth = require("./api/auth");

const app = express();

app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
  })
);
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true
  })
);
// initialize passport
app.use(passport.initialize());
app.use(passport.session());

mongooseSetup.setUpConnection();

app.use(bodyParser());
app.use("/auth", auth);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server run on ${port}`));

module.exports = {
  app
};
