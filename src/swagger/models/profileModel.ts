// import { IUser } from "api/auth/models/user";

export default {
  properties: {
    _id: {
      type: "string",
      uniqueItems: true
    },
    googleId: {
      type: "string"
    },
    displayName: {
      type: "string"
    },
    color: {
      type: "string"
    }
  }
};
