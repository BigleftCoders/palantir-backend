const { Router } = require("express");
const mongoose = require("mongoose");
const bodymen = require("bodymen");
// const querymen = require("querymen");

require("./models/room");

const Room = mongoose.model("Room");

const router = Router();

router.get("/list", async (req, res) => {
  try {
    const userId = req.user.id;
    const availabledRooms = await Room.find({ users: [userId] }).populate(
      "users",
      "displayName"
    );
    res.send(availabledRooms);
  } catch (error) {
    res.send(error);
  }
});

router.post(
  "/create",
  bodymen.middleware({
    roomName: {
      type: String,
      required: true,
      minLength: 3
    }
  }),
  async (req, res) => {
    try {
      const { roomName, description } = req.body;
      const newRoom = await new Room({
        // eslint-disable-next-line
        users: [req.user._id],
        description,
        roomName
      }).save();
      res.send(newRoom);
    } catch (error) {
      res.status(400);
      res.send(error);
    }
  }
);

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const foundedRoom = await Room.findOne({ roomId: id });
    console.log("id log", req.params, req.query, foundedRoom);
    res.send(foundedRoom);
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
