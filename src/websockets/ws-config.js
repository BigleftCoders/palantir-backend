const httpServer = require("http");
const socketIO = require("socket.io");
const expressAppInstance = require("../").app;

const server = httpServer.createServer(expressAppInstance);
const io = socketIO(server);

module.exports = {
  setUpConnection() {
    io.on("connection", socket => {
      socket.emit("newMessage", "welcome");
      socket.on("hi", e => console.log("on hi", e));
    });
    const port = process.env.WS_PORT || 1337;
    server.listen(port, () => {
      console.log("websocket listening on", port);
    });
  },
  io
};
