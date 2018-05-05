const mongoose = require("mongoose");

const URL = `mongodb://${process.env.MONGODB_CREDENTIALS}${
  process.env.MONGODB_HOST
}`;

// const connection = mongoose.createConnection(URL);

module.exports = {
  setUpConnection() {
    mongoose.Promise = global.Promise; // native promises
    mongoose.connect(URL);
    console.log("Connected to MongoDB by mongoose on ", URL);
  }
  // connection
};
