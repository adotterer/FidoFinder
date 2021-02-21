const io = require("socket.io")();

const db = require("./db/models");
const { socketRequireAuth } = require("./utils/auth");

const liveUserMap = {};

setInterval(() => {
  let now = new Date();
  console.log(`liveUserMap ${now.toTimeString()}`);
  console.log(liveUserMap);
}, 5000);
// liveUsersMap have chatroom id keys with a Set() which SHOWS THE USER IDs of users actively in web socket
// const liveUsers = new Set();

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
      authorizeUser(user, chatRoomId)
        .then((authorizedUser) => {
          if (liveUserMap[`chatRoom_${chatRoomId}`]) {
            liveUserMap[`chatRoom_${chatRoomId}`].add(authorizedUser.id);
            console.log("CREATED A CHATROOM_# LIVE USERMAP", liveUserMap);
          } else {
            liveUserMap[`chatRoom_${chatRoomId}`] = new Set();
            liveUserMap[`chatRoom_${chatRoomId}`].add(authorizedUser.id);
            console.log("ADDED TO CHATROOM_# LIVE USERSMAP", liveUserMap);
          }

          // MAYBE I DON'T EVEN NEED TO STORE A MAP
          // if (!roomMap[`chatRoom-${chatRoomId}`]) {
          //   roomMap[`chatRoom-${chatRoomId}`] = { msgs: [] };
          // }
          // JOIN THIS SOCKET TO CHATROOM
          socket.join(`chatRoom-${chatRoomId}`);
        })
        .catch((e) => {
          console.log("NOT AUTHORIZED USER");
          console.error(e);
          return socket.disconnect(true);
        });

      socket.on("message", (msg, chatRoomId) => {
        // console.log("NEW MESSAGE IN", chatRoomId, msg);
        io.to(`chatRoom-${chatRoomId}`).emit("broadcast message to all users", {
          msg,
          user,
        });
      });

      socket.on("disconnect", () => {
        liveUserMap[`chatRoom_${chatRoomId}`].delete(user.id);
        console.log("&&&&&&&&&&&&&&&&&&&&&&&&");
        console.log("&&&&&&&&&&&&&&&&&&&&&&&&");
        console.log("&&&&&&&&&&&&&&&&&&&&&&&&");
        console.log("&&&&&&&&&&&&&&&&&&&&&&&&");
        console.log("&&&&&&&&&&&&&&&&&&&&&&&&");
        console.log("&&&&&&&&&&&&&&&&&&&&&&&&");
        console.log(liveUserMap);
      });

      break;
    default:
      return socket.disconnect(true);
  }
});

module.exports = io;
