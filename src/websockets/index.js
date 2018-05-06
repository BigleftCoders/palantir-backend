const { subscribeOnChat } = require("./chat");

module.exports = {
  setUpConnection(io) {
    subscribeOnChat(io);
    // io.set('log level', 1);
    // io.set("transports", [
    //   "websocket",
    //   "flashsocket",
    //   "htmlfile",
    //   "xhr-polling",
    //   "jsonp-polling",
    //   "polling"
    // ]);

    // io.set("polling duration", 10);
    setInterval(() => io.emit("time", new Date().toTimeString()), 1000);
  }
};
