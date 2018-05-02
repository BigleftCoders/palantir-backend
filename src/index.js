const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger");
require("dotenv").config();
require("module-alias/register");

const app = express();

// connect to Socket.io
const socketSetup = require("./websockets");

socketSetup.setUpConnection(app);

const mongooseSetup = require("./services/mongoose");
// connect to mongoDB
mongooseSetup.setUpConnection();

const auth = require("./api/auth");
const room = require("./api/room");
const invite = require("./api/invite");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    name: "session",
    secret: process.env.COOKIE_KEY,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000 * 30
    }
  })
);

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5001"],
    credentials: true
  })
);
// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// eslint-disable-next-line
const passportSetup = require("./services/passport");

app.use("/auth", auth);
app.use("/room", room);
app.use("/invite", invite);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use("/api/v1", router);
// app.use((err, req, res, next) => {});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server run on ${port}`));

module.exports = {
  app
};
