const mongoose = require("mongoose");

const { Schema } = mongoose;
const messagesSchema = new Schema({
  roomId: {
    type: Number,
    ref: "Room"
  },
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
  ]
});

const messages = mongoose.model("RoomMessages", messagesSchema);

module.exports = {
  messages
};
