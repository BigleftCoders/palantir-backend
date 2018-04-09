const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const URL = `mongodb://${process.env.MONGODB_HOST}:${
  process.env.MONGODB_PORT
}/palantir`;

const connection = mongoose.createConnection(URL);

module.exports = {
  setUpConnection() {
    mongoose.Promise = global.Promise; // native promises
    mongoose.connect(URL);
    autoIncrement.initialize(connection);
    console.log("Connected to MongoDB by mongoose on ", URL);
  },
  connection
};
