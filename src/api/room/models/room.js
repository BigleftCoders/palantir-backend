const mongoose = require("mongoose");

const { Schema } = mongoose;
const roomSchema = new Schema({
  roomName: {
    type: String,
    unique: true
  },
  // id: {
  //   type: Number,
  //   unique: true
  // },
  messages: [
    {
      date: {
        type: Schema.Types.Date,
        default: Date.now()
      },
      value: {
        type: String
      },
      createdBy: {
        userId: {
          type: Number
        }
      }
    }
  ],
  usersId: [String]
});

const room = mongoose.model("Room", roomSchema);

module.exports = {
  room
};
