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

const rooms = [];
const subscribeOnChat = io => {
  console.log("Subscribe invoked");
  const chat = io.of("/chat");

  chat.on("connection", socket => {
    socket.send(JSON.stringify({ msg: "user joined" }));
    socket.on("message", message => {
      console.log("MESSAGE", message);
    });
    // socket.on("disconnect", () => {
    //   disconnect(socket);
    // });
    // socket.on("disconnecting", () => {
    // disconnect(socket);
    // });
    socket.on("joinRoom", async data => {
      try {
        const roomToConnect = await Room.findOne({
          roomId: data.roomId
        }).populate("users");
        console.log("Joining room", data, roomToConnect);
        const { roomId } = roomToConnect;
        const allowedUser = roomToConnect.users.find(
          user => user._id.toString() === data.userId
        );
        if (allowedUser) {
          const messagesForRoom = await RoomMessages.findOne({
            roomId: data.roomId
          });
          if (!messagesForRoom) {
            socket.emit(
              "serverError",
              "roomMessages for this room doesn't exists"
            );
          }
          socket.room = roomId;
          socket.username = allowedUser.displayName;
          socket.join(roomId);
          socket.emit(
            "updateChat",
            "SERVER",
            `You have connected to chat${roomId}`
          );
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
        console.log("ERROR; handle this", error);
        socket.emit("serverError", "error");
        throw error;
      }
    });

    socket.on("newMessage", async data => {
      try {
        const senderData = {
          createdAt: Date.now(),
          userName: socket.username,
          message: data
        };
        chat.to(socket.room).emit("updateChat", senderData);
      } catch (error) {
        // socket.emit("serverError", `message sending is failed${error}`);
        // throw error;
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
