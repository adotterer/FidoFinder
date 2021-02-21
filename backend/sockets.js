const io = require("socket.io")();

const db = require("./db/models");
const { socketRequireAuth } = require("./utils/auth");

// liveUsersMap have chatroom id keys with a Set() which SHOWS THE USER IDs of users actively in web socket
const liveUserMap = {};

// FOR SEEING THE ACTIVE STATUS OF liveUserMap
setInterval(() => {
  let now = new Date();
  console.log(`liveUserMap ${now.toTimeString()}`);
  console.log(liveUserMap);
}, 5000);

function authorizeUser(socket, user, chatRoomId) {
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
      return [authorizedChatters, authorizedUser];
    })
    .then(([authorizedChatters, [authorizedUser]]) => {
      if (liveUserMap[`chatRoom_${chatRoomId}`]) {
        liveUserMap[`chatRoom_${chatRoomId}`].add(authorizedUser.id);
        // console.log("CREATED A CHATROOM_# LIVE USERMAP", liveUserMap);
      } else {
        liveUserMap[`chatRoom_${chatRoomId}`] = new Set();
        liveUserMap[`chatRoom_${chatRoomId}`].add(authorizedUser.id);
        // console.log("ADDED TO CHATROOM_# LIVE USERSMAP", liveUserMap);
      }

      // const allUsersLive = authorizedChatters.every((chatter) => {
      //   return liveUserMap[`chatRoom_${chatRoomId}`].has(chatter.id);
      // });

      // console.log("allUsersLive?", allUsersLive);

      // CHECK TO SEE IF ALL AUTHORIZED CHATTERS ARE LIVE OR NOT
      // authorizedChatters.map((chatter) => chatter.id);

      // console.log("authorized Chatters", authorizedChatters);

      // JOIN THIS SOCKET TO CHATROOM
      socket.join(`chatRoom-${chatRoomId}`);
      return authorizedChatters;
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
      const authorizedChatters = await authorizeUser(socket, user, chatRoomId);

      socket.on("message", (msg, chatRoomId) => {
        if (
          // IF LIVE USERS LENGTH > 1, ACTUALLY SEND USING WEB SOCKET
          liveUserMap[`chatRoom_${chatRoomId}`] &&
          authorizedChatters.filter((chatUser) => {
            return liveUserMap[`chatRoom_${chatRoomId}`].has(chatUser.id);
          }).length > 1
        ) {
          io.to(`chatRoom-${chatRoomId}`).emit(
            "broadcast message to all users",
            {
              msg,
              user,
            }
          );
          // SEND MESSAGE TO DATABASE
          console.log("+++++++++++++++++++++++++++");
          console.log("+++++++++++++++++++++++++++");
          console.log("+++++++++++++++++++++++++++");
          console.log("+++++++++++++++++++++++++++");
          console.log("+++++++++++++++++++++++++++");
          console.log("msg", msg, user);
          console.log("+++++++++++++++++++++++++++");
          console.log("+++++++++++++++++++++++++++");
          console.log("+++++++++++++++++++++++++++");
          console.log("+++++++++++++++++++++++++++");
          console.log("+++++++++++++++++++++++++++");
        } else {
          // OTHERWISE, SEND TO DB FOR STORAGE ----
          // --------> ALSO NEED TO CHECK IF USER IS 'ONLINE' AND CAN RECEIVE A NOTIFICATION
          console.log("ADD MESSAGE TO DB", user, msg);
        }
        // console.log("NEW MESSAGE IN", chatRoomId, msg);
        // TODO:
        // SEE IF THE OTHER USER IS ONLINE--
        // IF THEY ARE NOT ONLINE, JUST ADD THE MESSAGE TO THE DATABASE

        // CHAT ROOM PAGE WILL DISPLAY MESSAGE REEL OF OLD MESSAGES IF THE OTHER USER ISN'T ONLINE

        // IF USER IS ONLINE THE APP, BUT NOT 'LIVE' THEY WILL RECEIVE A NOTIFICATION
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
