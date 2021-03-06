const { Router } = require("express");
const bodymen = require("bodymen");
const querymen = require("querymen");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");

// require("./models/pendingInvites");
require("../room/models/room");

// const pendingInvites = mongoose.model("PendingInvites");
const room = mongoose.model("Room");

const router = Router();

router.get(
  "/verify",
  querymen.middleware({
    inviteKey: {
      type: String,
      required: true
    }
  }),
  async (req, res) => {
    try {
      const { inviteKey } = req.query;
      const { _id } = req.user;
      const token = jwt.verify(inviteKey, process.env.JWT_SECRET);
      console.log("invite", req.user);
      if (token && _id) {
        await room.findOneAndUpdate(
          { roomId: token.roomId },
          { $push: { users: _id } }
        );
        res.send({
          roomId: token.roomId
        });
      } else {
        res.statusCode = 400;
        res.send("token isnt valid or user doesnt exists");
      }
    } catch (error) {
      res.send(error);
      throw error;
    }
  }
);
router.post(
  "/create",
  bodymen.middleware({
    roomId: {
      type: Number,
      required: true
    }
  }),
  async (req, res) => {
    try {
      const { roomId } = req.body;
      // const threeDaysInFuture =
      //   Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 3;
      const token = jwt.sign(
        {
          roomId
        },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
      );
      res.send({
        inviteKey: token
      });
    } catch (error) {
      throw error;
    }
  }
);

module.exports = router;
