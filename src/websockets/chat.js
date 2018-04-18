const mongoose = require("mongoose");
require("@/api/room/models/room");
require("@/api/room/models/roomMessages");

const Room = mongoose.model("Room");
const RoomMessages = mongoose.model("RoomMessages");

// Array<{ users: []}>
const rooms = [];
const subscribeOnChat = io => {
  console.log("Subscribe invoed");
  const chat = io.of("/chat");

  chat.on("connection", socket => {
    socket.send(JSON.stringify({ msg: "user joined" }));
    socket.on("message", message => {
      console.log("MESSAGE", message);
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
          console.log("messagesForRoom", messagesForRoom);
          const roomObj = {
            users: [data.userId],
            messages: messagesForRoom.messages
          };
          if (rooms[roomId]) {
            if (!rooms[roomId].users.some(user => user === data.userId)) {
              rooms[roomId].users.push(data.userId);
            }
          } else {
            rooms[roomId] = roomObj;
          }
          socket.emit("joined", rooms[roomId]);
        } else {
          socket.emit("serverError", "user doesn't have acess to this chat");
        }
      } catch (error) {
        socket.emit("serverError", error);
        throw error;
      }
    });
    socket.on("newMessage", async data => {
      try {
        console.log("newMessage", data, rooms[data.roomId]);
        const newMessage = {
          value: data.value,
          createdBy: {
            userId: data.userId
          }
        };
        rooms[data.roomId].messages.push(newMessage);
        console.log(rooms);
        await RoomMessages.update(
          { roomId: data.roomId },
          { $push: { messages: newMessage } }
        );
        socket.emit("newMessage", newMessage);
      } catch (error) {
        socket.emit("serverError", `message sending is failed${error}`);
        throw error;
      }
    });

    socket.on("close", () => {
      socket.disconnect(true);
      console.log("closed");
    });
  });
};

module.exports = {
  subscribeOnChat
};
