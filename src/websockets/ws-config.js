const httpServer = require("http");
const socketIO = require("socket.io");

module.exports = {
  setUpConnection(expressAppInstance) {
    const server = httpServer.createServer(expressAppInstance);
    const io = socketIO(server);
    io.on("connection", socket => {
      socket.on("hi", eve => socket.broadcast.emit("newMessage", eve));
    });
    const port = process.env.WS_PORT || 1337;
    server.listen(port, () => {
      console.log("websocket listening on", port);
    });
  }
};
