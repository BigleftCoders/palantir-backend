import { IUser } from "api/auth/models/user";
import { ICounterDocument } from "@/utils/counterModel";
import mongoose, { Document } from "mongoose";
import "@/utils/counterModel";

import { Schema } from "mongoose";

export interface IRoom {
  roomName: string;
  description: string;
  roomId: number;
  users: IUser[];
}

export interface IRoomDocument extends Document, IRoom {}

const roomSchema: mongoose.Schema = new Schema({
  roomName: {
    type: String
  },
  description: {
    type: String,
    default: ""
  },
  roomId: {
    type: Number
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

const Room: mongoose.Model<IRoomDocument> = mongoose.model("Room", roomSchema);
const Counter: mongoose.Model<ICounterDocument> = mongoose.model("Counter");

roomSchema.pre("save", async function pre(this: IRoomDocument, next) {
  try {
    if (!this.isNew) {
      next();
    }
    const roomCounter: ICounterDocument | null = await Counter.findOne({
      name: "roomId"
    });
    if (roomCounter) {
      this.roomId = roomCounter.roomId + 1;
      await Counter.findOneAndUpdate(
        { name: "roomId" },
        { $inc: { roomId: 1 } }
      );
    } else {
      await new Counter({ name: "roomId", roomId: 1 }).save();
      this.roomId = 1;
    }
    next();
  } catch (error) {
    throw error;
  }
});

module.exports = {
  Room
};
