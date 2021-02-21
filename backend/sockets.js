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

  console.log(user);

  switch (type) {
    case "chat":
      console.log("user", user.toJSON());

      db.ChatRoom.findByPk(chatRoomId, {
        include: ["AuthorizedChatters"],
      })
        .then((authorizedChatters) => {
          return authorizedChatters.toJSON().AuthorizedChatters;
        })
        .then((authorizedChatters) => {
          const authorizedUser = authorizedChatters.filter((chatter) => {
            // console.log("chatter.id", chatter.id, "user.id", user.id);
            return chatter.id === user.id;
          });
          return authorizedUser;
        })
        .then(([authorizedUser]) => {
          console.log("AUTHORIZED USER", authorizedUser);
        })
        .catch((e) => {
          console.error(e);
        });

      socket.on("message", (msg, chatRoomId) => {
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
