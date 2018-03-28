const { Router } = require("express");
const mongoose = require("mongoose");
require("./models/room");

const Room = mongoose.model("Room");

const router = Router();

router.get("/list", async (req, res) => {
  try {
    const userId = req.user.id;
    const availabledRooms = await Room.find({ usersId: [userId] });
    res.send(availabledRooms);
  } catch (error) {
    res.send(error);
  }
});

router.post("/create", async (req, res) => {
  try {
    console.log("post id res body:", req.body);
    // const allowedUsersIds = req.body.userIds;
    const { roomName } = req.body;
    const newRoom = await new Room({
      // eslint-disable-next-line
      usersId: [req.user._id],
      roomName,
      messages: []
    }).save();
    res.send(newRoom);
  } catch (error) {
    res.end(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    console.log(res);
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
