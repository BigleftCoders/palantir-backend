const subscribeOnChat = io => {
  const chat = io.of("/chat");

  chat.on("connection", socket => {
    socket.on("message", message => {
      console.log("new message", message);
      chat.emit("newMessage", "hello chat");
    });
  });
};

module.exports = {
  subscribeOnChat
};
