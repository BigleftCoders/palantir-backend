import express from "express";
import httpServer from "http";
import bodyParser from "body-parser";
import passport from "passport";
import cors from "cors";
import session from "express-session";
import connectMongo from "connect-mongo";
import mongoose from "mongoose";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import io from "socket.io";

import { Router } from "express";

import room from "api/room";
import auth from "api/auth";
import invite from "api/invite";

import setUpConnection from "@/websockets";
import setUpMongoConnection from "@/services/mongoose";
import passportMiddlewares from "@/services/passport";

import swaggerDocument from "@/swagger";

dotenv.config();

const app: express.Application = express();
const MongoStore: connectMongo.MongoStoreFactory = connectMongo(session);

// connect to Socket.io

// connect to mongoDB
setUpMongoConnection();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

passportMiddlewares();

app.use(
  session({
    name: "session",
    secret: process.env.COOKIE_KEY as string,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    }),
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
    origin: [process.env.FRONTEND_BASE_URL as string],
    credentials: true
  })
);
// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", auth);
app.use("/room", room);
app.use("/invite", invite);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use("/api/v1", router);
// app.use((err, req, res, next) => {});

const port: number | string = process.env.PORT || 3000;
const server: httpServer.Server = httpServer.createServer(app);

server.listen(port, () => {
  const ioInstance: SocketIO.Server = io.listen(server);
  console.log("server run in port", process.env.PORT);
  setUpConnection(ioInstance);
});

export default app;
