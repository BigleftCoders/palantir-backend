const mongoose = require("mongoose");
require("@/utils/counterModel");

const { Schema } = mongoose;
const roomSchema = new Schema({
  roomName: {
    type: String
  },
  description: {
    type: String,
    default: ""
  },
  roomId: {
    type: Number
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

const Room = mongoose.model("Room", roomSchema);
const Counter = mongoose.model("Counter");

roomSchema.pre("save", async function pre(next) {
  try {
    if (!this.isNew) {
      next();
    }
    const roomCounter = await Counter.findOne({ name: "roomId" });
    if (roomCounter) {
      this.roomId = roomCounter.roomId + 1;
      await Counter.findOneAndUpdate(
        { name: "roomId" },
        { $inc: { roomId: 1 } }
      );
    } else {
      await new Counter({ name: "roomId", roomId: 1 }).save();
      this.roomId = 1;
    }
    next();
  } catch (error) {
    throw error;
  }
});

module.exports = {
  Room
};
