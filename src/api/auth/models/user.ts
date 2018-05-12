import { IUserDocument } from "api/auth/models/user";
import { Document } from "mongoose";
import mongoose from "mongoose";

export interface IUser {
  googleId: number;
  displayName: string;
  email: string;
  color: string;
}

export interface IUserDocument extends Document, IUser {}

const userSchema: mongoose.Schema = new mongoose.Schema({
  googleId: {
    type: Number,
    unique: true
  },
  displayName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    default: ""
  },
  color: {
    type: String,
    default: "#4496d8"
  }
});

export const user: mongoose.Model<IUserDocument> = mongoose.model(
  "User",
  userSchema
);
