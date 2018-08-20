module.exports = {
  "/room/list": {
    get: {
      tags: ["Room"],
      summary: "User's available rooms",
      responses: {
        "200": {
          description: "Array of rooms",
          schema: {
            type: "array",
            items: {
              $ref: "#/definitions/Room"
            }
          }
        }
      }
    }
  },
  "/room/create": {
    post: {
      tags: ["Room"],
      summary: "Create new room",
      responses: {
        200: {
          description: "Single room",
          schema: {
            $ref: "#/definitions/Room"
          }
        }
      },
      produces: ["application/json"],
      parameters: [
        {
          in: "body",
          name: "roomName",
          description: "specify room name",
          required: true,
          // schema: {
          //   type: "object",
          //   properties: {
          //     roomName: {
          //       type: "string",
          //       default: "chat room"
          //     }
          //   }
          // },
          example: {
            name: "string"
          }
        },
        {
          in: "body",
          name: "description",
          type: "object",
          // schema: {
          //   type: "object",
          //   properties: {
          //     description: {
          //       type: "string",
          //       default: "description"
          //     }
          //   }
          // },
          example: {
            description: "chat room",
            roomName: "friends"
          }
        }
      ]
    }
  },
  "/room/{id}": {
    get: {
      tags: ["Room"],
      summary: "Get existing room",
      produces: ["application/json"],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "id of requested room",
          required: true,
          schema: {
            type: "integer"
          }
        }
      ],
      responses: {
        200: {
          description: "Room",
          schema: {
            $ref: "#/definitions/Room"
          }
        }
      }
    }
  }
};
