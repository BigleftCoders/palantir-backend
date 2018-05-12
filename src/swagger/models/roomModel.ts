export default {
  properties: {
    roomName: {
      type: "string"
    },
    roomId: {
      type: "integer",
      unique: true
    },
    // messages: {
    //   type: "array",
    //   items: {
    //     type: "object",
    //     properties: {
    //       date: {
    //         type: "date",
    //         default: "Date.now()"
    //       },
    //       value: {
    //         type: "string"
    //       },
    //       createdBy: {
    //         type: "object",
    //         properties: {
    //           userId: {
    //             type: "number"
    //           }
    //         }
    //       }
    //     }
    //   }
    // },
    description: {
      type: "string"
    },
    users: {
      type: "array",
      items: {
        type: "string"
      }
    }
  }
};
