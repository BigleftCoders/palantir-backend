const mongoose = require("mongoose");
require("@/api/room/models/room");
require("@/api/room/models/roomMessages");

const Room = mongoose.model("Room");
const RoomMessages = mongoose.model("RoomMessages");

const disconnect = socket => {
  socket.leave(socket.room);
  socket.disconnect();
  console.log("closed");
};

const subscribeOnChat = io => {
  console.log("Subscribe invoked");
  const chat = io.of("/chat");
  setInterval(() => io.emit("time", new Date().toTimeString()), 1000);
  chat.on("connection", socket => {
    socket.send(JSON.stringify({ msg: "user joined" }));
    socket.on("message", message => {});
    socket.on("joinRoom", async data => {
      try {
        console.log("joinRoom");
        const roomToConnect = await Room.findOne({
          roomId: data.roomId
        }).populate("users");
        const { roomId } = roomToConnect;
        const allowedUser = roomToConnect.users.find(
          user => user._id.toString() === data.userId
        );
        if (allowedUser) {
          socket.room = roomId;
          socket.userId = data.userId;
          socket.username = allowedUser.displayName;
          socket.color = allowedUser.color;
          socket.join(roomId);
          socket.emit(
            "updateChat",
            "SERVER",
            `You have connected to chat${roomId}`
          );
          console.log("allowed", socket.room, socket.userId, socket.username);
          socket.broadcast
            .to(roomId)
            .emit(
              "updatechat",
              "SERVER",
              `${socket.username} has connected to this room`
            );
        } else {
          socket.emit("serverError", "user doesn't have acess to this chat");
        }
      } catch (error) {
        socket.emit("serverError", "error");
        throw error;
      }
    });

    socket.on("newMessage", async data => {
      try {
        const messageData = {
          createdAt: Date.now(),
          message: data,
          userName: socket.username,
          userId: socket.userId,
          color: socket.color
        };
        await RoomMessages.findOneAndUpdate(
          {
            roomId: socket.room
          },
          {
            $push: { messages: messageData }
          }
        );
        console.log("messages", data, socket.room);
        chat.to(socket.room).emit("updateChat", messageData);
      } catch (error) {
        throw error;
        // socket.emit("serverError", `message sending is failed${error}`);
        // throw error;
      }
    });
    socket.on("newCoordinates", async data => {
      try {
        chat.to(socket.room).emit("updateCoordinates", data);
      } catch (error) {
        throw error;
      }
    });

    socket.on("close", () => {
      disconnect(socket);
    });
  });
};

module.exports = {
  subscribeOnChat
};
