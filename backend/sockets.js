const io = require("socket.io")();

const db = require("./db/models");
const { socketRequireAuth } = require("./utils/auth");

const roomMap = {};
const liveUsers = new Set();

function authorizeUser(user, chatRoomId) {
  return db.ChatRoom.findByPk(chatRoomId, {
    include: ["AuthorizedChatters"],
  })
    .then((authorizedChatters) => {
      return authorizedChatters.toJSON().AuthorizedChatters;
    })
    .then((authorizedChatters) => {
      const authorizedUser = authorizedChatters.filter((chatter) => {
        return chatter.id === user.id;
      });
      return authorizedUser;
    })
    .then(([authorizedUser]) => {
      return authorizedUser;
    })
    .catch((e) => {
      console.error(e);
      return false;
    });
}

io.use(socketRequireAuth).on("connection", async (socket) => {
  console.log("Connected");

  const {
    user,
    handshake: {
      query: { type, chatRoomId },
    },
  } = socket;

  switch (type) {
    case "chat":
      authorizeUser(user, chatRoomId).then((authorizedUser) => {
        liveUsers.add(authorizedUser);
        if (!roomMap[`chatRoom-${chatRoomId}`]) {
          roomMap[`chatRoom-${chatRoomId}`] = { msgs: [] };
        }
        socket.join(`chatRoom-${chatRoomId}`);

        socket.on(`chatRoom-${chatRoomId}`, (msg) => {
          console.log("MSG", msg);
        });
        // console.log(
        //   "room Map at chatRoomId",
        //   roomMap[`chatRoom-${chatRoomId}`]
        // );
        // console.log("**********************");
        // console.log("**********************");
        // console.log("**********************");
        // console.log("LIVE USERS", liveUsers);
      });

      socket.on("message", (msg, chatRoomId) => {
        socket.emit("broadcast message to all users", msg);
        // find chat room by Id, to create in room map
        // I want
        // user.getConversations().then((convos) => {
        //   io.to(socket.id).emit("message", { msg: convos.toJSON() });
        // });
      });
      break;
    default:
      return socket.disconnect(true);
  }
});

module.exports = io;
