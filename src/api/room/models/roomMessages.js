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
      message: {
        type: String
      },
      createdBy: {
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
    }
  ]
});

const messages = mongoose.model("RoomMessages", messagesSchema);

module.exports = {
  messages
};
