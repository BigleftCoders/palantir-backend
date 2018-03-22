const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // TODO: add autoincrement id
  // id: {
  //   type: Number,
  //   unique: true
  // },
  googleId: {
    type: Number,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  }
  // TODO: add email
});

const user = mongoose.model("User", userSchema);

module.exports = {
  user
};
