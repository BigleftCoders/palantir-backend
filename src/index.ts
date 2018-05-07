import express from "express";
import httpServer from "http";
import bodyParser from "body-parser";
import passport from "passport";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";

// configs
import setUpConnection from "./services/mongoose";

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger");
require("dotenv").config();
require("module-alias/register");

const app = express();
MongoStore(session);

// connect to Socket.io
const socketSetup = require("./websockets");

// connect to mongoDB
setUpConnection();

const auth = require("./api/auth");
const room = require("./api/room");
const invite = require("./api/invite");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    name: "session",
    secret: process.env.COOKIE_KEY as string,
    store: MongoStore({ mongooseConnection: mongoose.connection }),
    // store: new MongoStore({ mongooseConnection: mongoose.connection }),
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
    origin: [process.env.FRONTEND_BASE_URL],
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
const server = httpServer.createServer(app);
const io = require("socket.io").listen(server);

server.listen(port, () => {
  console.log("server run in port", process.env.PORT);
  socketSetup.setUpConnection(io);
});

export default app;
