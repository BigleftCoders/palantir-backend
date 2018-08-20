const mongoose = require("mongoose");

const { Schema } = mongoose;
const counterSchema = new Schema({
  name: {
    type: String
  },
  roomId: {
    type: Number
  }
});

const Counter = mongoose.model("Counter", counterSchema);

module.exports = {
  Counter
};
