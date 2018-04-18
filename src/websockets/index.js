const httpServer = require("http");
const socketIO = require("socket.io");
const expressAppInstance = require("../").app;
const { subscribeOnChat } = require("./chat");

const server = httpServer.createServer(expressAppInstance);
const io = socketIO(server);

module.exports = {
  setUpConnection() {
    const port = process.env.WS_PORT || 1337;
    server.listen(port, () => {
      console.log("websocket listening on", port);
      io.on("connect", socket => {
        subscribeOnChat(io, socket.id);
      });
    });
  }
};
