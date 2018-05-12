import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "@/api/auth/models/user";

interface IMessage {
  createdAt: number;
  message: string;
  userId: IUser;
  userName: string;
  color: string;
}

interface IMessages {
  roomId: number;
  messages: IMessage[];
}

interface IMessagesDocument extends Document, IMessages {}

const messagesSchema: mongoose.Schema = new Schema({
  roomId: {
    type: Number,
    ref: "Room"
  },
  messages: [
    {
      createdAt: {
        type: Number,
        default: Date.now()
      },
      message: {
        type: String
      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      userName: {
        type: String
      },
      color: {
        type: String
      }
    }
  ]
});

const messages: mongoose.Model<IMessagesDocument> = mongoose.model(
  "RoomMessages",
  messagesSchema
);

module.exports = {
  messages
};
