const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const { Schema } = mongoose;
const roomSchema = new Schema({
  roomName: {
    type: String
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

// roomSchema.pre("save", async () => {
//   // do stuff
//   Room.findOne
// });
roomSchema.plugin(autoIncrement.plugin, { model: "Room", field: "roomId" });
const room = mongoose.model("Room", roomSchema);

module.exports = {
  room
};
