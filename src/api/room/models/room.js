const mongoose = require("mongoose");

const { Schema } = mongoose;
const roomSchema = new Schema({
  roomName: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    default: ""
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

const room = mongoose.model("Room", roomSchema);

module.exports = {
  room
};
