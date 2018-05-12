import { IUserDocument } from "api/auth/models/user";
import { IRoom, IRoomDocument } from "api/room/models/room";
import { Router } from "express";
import bodymen from "bodymen";
import querymen from "querymen";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { VerifyCallback } from "jsonwebtoken";

interface IToken {
  roomId: string;
}

// require("./models/pendingInvites");
import "api/room/models/room";

// const pendingInvites = mongoose.model("PendingInvites");
const room: mongoose.Model<IRoomDocument> = mongoose.model("Room");

const router: Router = Router();

router.get(
  "/verify",
  querymen.middleware({
    inviteKey: {
      type: String,
      required: true
    }
  }),
  async (req, res) => {
    try {
      const { inviteKey } = req.query;
      const { _id }: any = req.user;
      const token: any = jwt.verify(inviteKey, process.env
        .JWT_SECRET as string);
      debugger;
      if (token && _id) {
        const roomDocument: IRoom | null = await room.findOneAndUpdate(
          { roomId: token.roomId },
          { $push: { users: _id } }
        );
        res.send({
          roomId: token.roomId
        });
      } else {
        res.statusCode = 400;
        res.send("token isnt valid or user doesnt exists");
      }
    } catch (error) {
      res.send(error);
      throw error;
    }
  }
);
router.post(
  "/create",
  bodymen.middleware({
    roomId: {
      type: Number,
      required: true
    }
  }),
  async (req, res) => {
    try {
      const { roomId } = req.body;
      // const threeDaysInFuture =
      //   Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 3;
      const token: string = jwt.sign(
        {
          roomId
        },
        process.env.JWT_SECRET as string,
        { expiresIn: "3d" }
      );
      res.send({
        inviteKey: token
      });
    } catch (error) {
      throw error;
    }
  }
);

export default router;
