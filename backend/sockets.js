const io = require("socket.io")();

const db = require("./db/models");
const { socketRequireAuth } = require("./utils/auth");

// liveUsersMap {} ---> for keeping track if the users are actively in the same room
// KEYS are chatRoomId's
// VALUES Set() of user id's
const liveUserMap = {};

// FOR SEEING THE ACTIVE STATUS OF liveUserMap
// setInterval(() => {
//   let now = new Date();
//   console.log(`liveUserMap ${now.toTimeString()}`);
//   console.log(liveUserMap);
// }, 5000);

// authorizeUser() RETURNS A LIST OF AUTHORIZED USERS
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
  // console.log("Connected");

  const {
    user,
    handshake: {
      query: { type, payload },
    },
  } = socket;

  switch (type) {
    case "chat":
      // payload = chatRoomId

      const authorizedChatters = await authorizeUser(socket, user, payload);

      socket.on("message", async (msg, payload) => {
        if (
          // IF LIVE USERS LENGTH > 1, ACTUALLY SEND USING WEB SOCKET
          liveUserMap[`chatRoom_${payload}`] &&
          authorizedChatters.filter((chatUser) => {
            return liveUserMap[`chatRoom_${payload}`].has(chatUser.id);
          }).length > 1
        ) {
          io.to(`chatRoom-${payload}`).emit("broadcast message to all users", {
            message: msg,
            User: user,
          });
          // SEND MESSAGE TO DATABASE
          // TODO: ABSTRACT TO METHOD
          try {
            db.Message.create({
              userId: user.id,
              chatRoomId: payload,
              message: msg,
              read: true,
            });
          } catch (e) {
            console.log("payload --->", payload);
            console.error(e);
          }
        } else {
          // OTHERWISE, SEND TO DB FOR STORAGE ----
          // --------> ALSO NEED TO CHECK IF USER IS 'ONLINE' AND CAN RECEIVE A NOTIFICATION
          try {
            const newMessage = await db.Message.create(
              {
                userId: user.id,
                chatRoomId: payload,
                message: msg,
                read: false,
              },
              { returning: true }
            );
            const otherUsers = await newMessage.getNotifUsers(user.id);
            otherUsers.forEach((otherUser) => {
              console.log(
                "SENDING NOTIFICATION TO: ",
                `notif_user${otherUser.id}`
              );
              io.to(`notif_user${otherUser.id}`).emit("notification", {
                msg,
                user,
              });
            });
            console.log("bubblebop", otherUsers);
            // NOW SEND NOTIFICATION TO THE USERS WHO ARE ASSOCIATED WITH CHATROOMID #

            // newMessage
            //   .getNotifUsers(user.id)
            //   .then((users) => console.log("USERs", users))
            //   .catch((e) => console.error(e));
            // console.log("ADD MESSAGE TO DB", newMessage);
          } catch (e) {
            console.log("payload --->", payload);
            console.error(e);
          }
        }
        // console.log("NEW MESSAGE IN", chatRoomId, msg);
        // TODO:
        // SEE IF THE OTHER USER IS ONLINE--
        // IF THEY ARE NOT ONLINE, JUST ADD THE MESSAGE TO THE DATABASE

        // CHAT ROOM PAGE WILL DISPLAY MESSAGE REEL OF OLD MESSAGES IF THE OTHER USER ISN'T ONLINE

        // IF USER IS ONLINE THE APP, BUT NOT 'LIVE' THEY WILL RECEIVE A NOTIFICATION
      });

      socket.on("disconnect", () => {
        liveUserMap[`chatRoom_${payload}`].delete(user.id);
      });
      break;
    case "notif":
      // payload === userId
      // console.log("😏😏😏😏😏😏😏😏😏😏😏😏😏😏😏😏😏😏😏😏");
      // console.log("😏😏😏😏😏😏😏😏😏😏😏😏😏😏😏😏😏😏😏😏");
      // console.log("joining: ", `notif_user${user.id}`);
      // console.log("😏😏😏😏😏😏😏😏😏😏😏😏😏😏😏😏😏😏😏😏");
      // console.log("😏😏😏😏😏😏😏😏😏😏😏😏😏😏😏😏😏😏😏😏");
      socket.join(`notif_user${user.id}`);
      break;
    default:
      return socket.disconnect(true);
  }
});

module.exports = io;
