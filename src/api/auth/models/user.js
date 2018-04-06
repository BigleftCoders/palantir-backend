const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
  }
});

const user = mongoose.model("User", userSchema);

module.exports = {
  user
};
