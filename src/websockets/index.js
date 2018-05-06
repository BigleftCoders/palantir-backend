const { subscribeOnChat } = require("./chat");

module.exports = {
  setUpConnection(io) {
    subscribeOnChat(io);
    setInterval(() => io.emit("time", new Date().toTimeString()), 1000);
  }
};
