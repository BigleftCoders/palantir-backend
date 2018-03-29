const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
// const cookieSession = require("cookie-session");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
// const cookieParser = require("cookie-parser");
require("dotenv").config();

const mongooseSetup = require("./services/mongoose");
// connect to mongoDB
mongooseSetup.setUpConnection();

const auth = require("./api/auth");
const room = require("./api/room");

const app = express();

// app.set("trust proxy", 1);
app.use(bodyParser.json());
// app.use(cookieParser());

// app.use(
//   cookieSession({
//     name: "session",
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: [process.env.COOKIE_KEY],
//     secret: process.env.COOKIE_KEY
//   })
// );
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
    origin: "http://localhost:3000",
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
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use("/api/v1", router);
// app.use((err, req, res, next) => {});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server run on ${port}`));

module.exports = {
  app
};
