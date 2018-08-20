const mongoose = require("mongoose");

const { Schema } = mongoose;
const messagesSchema = new Schema({
  roomId: {
    type: Number,
    ref: "Room"
  },
  messages: [
    {
      createdAt: {
        type: Number,
        default: Date.now()
      },
      message: {
        type: String
      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      userName: {
        type: String
      },
      color: {
        type: String
      }
    }
  ]
});

const messages = mongoose.model("RoomMessages", messagesSchema);

module.exports = {
  messages
};
