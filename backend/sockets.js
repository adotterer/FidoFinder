const io = require("socket.io")();

const db = require("./db/models");
const { socketRequireAuth } = require("./utils/auth");

const roomMap = {};
const liveUsers = new Set();

//
io.use(socketRequireAuth).on("connection", (socket) => {
  console.log("Connected");

  const {
    user,
    handshake: {
      query: { type, chatRoomId },
    },
  } = socket;

  switch (type) {
    case "chat":
      console.log("chatRoomId", chatRoomId);
      socket.on("message", (msg, chatRoomId) => {
        // user.getConversations().then((convos) => {
        //   io.to(socket.id).emit("message", { msg: convos.toJSON() });
        // });
      });
      break;
  }
});

module.exports = io;
