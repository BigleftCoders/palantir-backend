import mongoose from "mongoose";

const URL: string = `mongodb://${process.env.MONGODB_CREDENTIALS}${
  process.env.MONGODB_HOST
}`;

export default function setUpMongoConnection() {
  mongoose.Promise = global.Promise; // native promises
  mongoose.connect(URL);
  console.log("Connected to MongoDB by mongoose on ", URL);
}
