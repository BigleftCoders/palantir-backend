const room = require("./room");
const auth = require("./auth");
const roomModel = require("./models/roomModel");
const profileModel = require("./models/profileModel");

module.exports = {
  swagger: "2.0",
  info: {
    version: "1.0.0",
    title: "Palantir API docs",
    description:
      "example: https://github.com/GenFirst/swagger-to-existing-nodejs-project/blob/master/backend/swagger.json",
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT"
    }
  },
  host: "localhost:5001",
  basePath: "/",
  tags: [
    {
      name: "Auth",
      description: "Authorization endpoints"
    },
    {
      name: "Room",
      description: "Rooms endpoints"
    }
  ],
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  paths: {
    ...room,
    ...auth
  },
  definitions: {
    ...profileModel,
    ...roomModel
  }
};
