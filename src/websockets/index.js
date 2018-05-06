const { subscribeOnChat } = require("./chat");

module.exports = {
  setUpConnection(io) {
    console.log("websocket server going to run");
    subscribeOnChat(io);
  }
};
