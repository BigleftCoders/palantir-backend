const mongoose = require("mongoose");

module.exports = {
  setUpConnection() {
    mongoose.Promise = global.Promise; // native promises
    mongoose.connect(
      `mongodb://${process.env.MONGODB_HOST}:${
        process.env.MONGODB_PORT
      }/palantir`
    );
  }
};
