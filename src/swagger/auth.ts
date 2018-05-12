export default {
  "/auth/google": {
    get: {
      tags: ["Auth"],
      summary:
        "Google OAuth endpoint; Call this for getting authorization modal; LOGIN or REGISTER from frontend!"
    }
  },
  "/auth/google/callback": {
    get: {
      tags: ["Auth"],
      summary:
        "Send access token to get profile; LOGIN or REGISTER from frontend!",
      parameters: [
        {
          in: "query",
          name: "code",
          required: true,
          description: "code from /auth/google in browser's url",
          schema: {
            type: "string"
          }
        }
      ],
      produces: ["application/json"],
      responses: {
        "200": {
          description: "OK",
          schema: {
            $ref: "#/definitions/Profile"
          }
        }
      }
    }
  },
  "/auth/profile": {
    get: {
      tags: ["Auth"],
      summary: "Profile of authorized user",
      produces: ["application/json"],
      responses: {
        "200": {
          description: "User object",
          schema: {
            $ref: "#/definitions/Profile"
          }
        },
        "404": {
          description: "Auth is misssing; Check cookies"
        }
      }
    }
  }
};
