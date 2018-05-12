import mongoose, { Document } from "mongoose";
import { Schema } from "mongoose";

interface ICounter {
  name: string;
  roomId: number;
}

export interface ICounterDocument extends Document, ICounter {}

const counterSchema: mongoose.Schema = new Schema({
  name: {
    type: String
  },
  roomId: {
    type: Number
  }
});

export const Counter: mongoose.Model<ICounterDocument> = mongoose.model(
  "Counter",
  counterSchema
);
