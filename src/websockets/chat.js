const mongoose = require("mongoose");
require("@/api/room/models/room");
require("@/api/room/models/roomMessages");

const Room = mongoose.model("Room");
const RoomMessages = mongoose.model("RoomMessages");

// Array<{ users: []}>
const rooms = [];
const subscribeOnChat = io => {
  console.log("Subscribe invoked");
  const chat = io.of("/chat");

  chat.on("connection", socket => {
    socket.send(JSON.stringify({ msg: "user joined" }));
    socket.on("message", message => {
      console.log("MESSAGE", message);
    });
    socket.on("disconnect", () => {
      socket.disconnect(true);
    });
    socket.on("joinRoom", async data => {
      try {
        // data : { roomToJoin: number, userId: string like ObjectID }
        const roomToConnect = await Room.findOne({
          roomId: data.roomId
        });
        const { roomId } = roomToConnect;
        const allowedUser = roomToConnect.users.some(
          id => id.toString() === data.userId
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
          console.log("rooms", socket.rooms);

          // const roomObj = {
          //   users: [data.userId],
          //   messages: messagesForRoom.messages
          // };
          // if (rooms[roomId]) {
          //   if (!rooms[roomId].users.some(user => user === data.userId)) {
          //     rooms[roomId].users.push(data.userId);
          //   }
          // } else {
          //   rooms[roomId] = roomObj;
          // }
          // socket.emit("joined", rooms[roomId]);
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
        console.log("new message", data);
        chat.to(socket.room).emit("updateChat", data);
        // console.log("newMessage", data, rooms[data.roomId]);
        // const newMessage = {
        //   value: data.value,
        //   createdBy: {
        //     userId: data.userId
        //   }
        // };
        // rooms[data.roomId].messages.push(newMessage);
        // console.log(rooms);
        // await RoomMessages.update(
        //   { roomId: data.roomId },
        //   { $push: { messages: newMessage } }
        // );
        // socket.emit("newMessage", newMessage);
      } catch (error) {
        // socket.emit("serverError", `message sending is failed${error}`);
        // throw error;
      }
    });

    socket.on("close", () => {
      socket.leave(socket.room);
      socket.disconnect(true);
      console.log("closed");
    });
  });
};

module.exports = {
  subscribeOnChat
};
