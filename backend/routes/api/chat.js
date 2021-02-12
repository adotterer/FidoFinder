const { Console } = require("console");
const express = require("express");
const router = express.Router();
const { createServer } = require("http");
const WebSocket = require("ws");
const server = createServer(router).listen(7070);
const { User, ChatRoom, user_chatRoom } = require("../../db/models");
const {
  MessageSession,
  Person,
  GlobalChatStore,
} = require("./messageSession-state");

const broadcastMessage = (type, data, persons) => {
  const message = JSON.stringify({
    type,
    data,
  });

  console.log(`Broadcasting message ${message}...`);

  persons.forEach((person) => {
    person.ws.send(message, (err) => {
      if (err) {
        // TODO Handle errors.
        console.error(err);
      }
    });
  });
};

const startMessageSession = (messageSession) => {
  const data = messageSession.getData();

  broadcastMessage("start-message-session", data, messageSession.getPersons());
};

// GLOBAL CHATROOM
const globalChatStore = new GlobalChatStore();

const addNewPerson = async (userId, username, chatRoomId, ws) => {
  const person = new Person(userId, username, ws);

  // TODO:
  // ------> see if there is already a chat session in the GlobalChatStore
  // ------> IF NOT, it creates a new message session and adds all the authorized users [] from the database onto MessageSession.users;
  // ------> IF GlobalMessageStore[`chatRoomNum${chatRoomId} is TRUE, then it ....

  if (!globalChatStore[`chatRoomNum${chatRoomId}`]) {
    console.log("creating new chat Room");
    const authorizedUsers = await user_chatRoom
      .findAll({
        where: {
          chatRoomId: chatRoomId,
        },
      })
      .then((res) => res.map((user) => user.toJSON()))
      .catch((e) => console.error(e));

    // IF THE USER IS NOT IN THIS ARRAY, THEN IT CLOSES THE WEBSOCKET
    if (
      !authorizedUsers.filter((user) => {
        return user.userId === userId;
      }).length
    ) {
      console.log("non-authorized user ---> closing connection");
      ws.close();
    } else {
      const messageSession = new MessageSession(
        authorizedUsers,
        person,
        chatRoomId
      );
      globalChatStore.addNewChatSession(messageSession);
      startMessageSession(globalChatStore[`chatRoomNum${chatRoomId}`]);
    }
  } else {
    // CHAT SESSION ALREADY EXISTS
    globalChatStore[`chatRoomNum${chatRoomId}`].users.push(person);
    startMessageSession(globalChatStore[`chatRoomNum${chatRoomId}`]);
  }
};

const updateMessageSession = (chatRoomId) => {
  const persons = globalChatStore[`chatRoomNum${chatRoomId}`].getPersons();
  const data = globalChatStore[`chatRoomNum${chatRoomId}`].getData();
  broadcastMessage("update-message-session", data, persons);
};

const recordChat = ({ username, chatRoomId, msg }) => {
  globalChatStore[`chatRoomNum${chatRoomId}`].messages.push({ username, msg });
  updateMessageSession(chatRoomId);
};

const deleteSession = ({ chatRoomId }) => {
  console.log("deleting: ", `chatRoomNum${chatRoomId}`);
  delete globalChatStore[`chatRoomNum${chatRoomId}`];
  console.log("post-delete", globalChatStore);
  return;
};

const processIncomingMessage = (jsonData, ws) => {
  console.log(`Processing incoming message ${jsonData}...`);

  const message = JSON.parse(jsonData);

  switch (message.type) {
    case "add-new-person":
      addNewPerson(
        message.data.userId,
        message.data.username,
        message.data.chatRoomId,
        ws
      );
      break;
    case "chat-message":
      recordChat(message.data, ws);
      break;
    case "delete-session":
      deleteSession(message.data, ws); // WRITE FUNCTION
      break;
    default:
      throw new Error(`Unknown message type: ${message.type}`);
  }
};

let wss;
wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  ws.on("message", (jsonData) => {
    processIncomingMessage(jsonData, ws);
  });

  ws.on("close", () => {
    // // If there's a messageSession available...
    // if (messageSession !== null) {
    //   const { person1, person2 } = messageSession;
    //   // If the closed WS belonged to either person 1 or person 2
    //   // then we need to abort the messageSession.
    //   if (person1.ws === ws || (person2 !== null && person2.ws === ws)) {
    //     // If the closed WS doesn't belong to person 1
    //     // then close their WS, otherwise if there's a
    //     // person 2 then close their WS.
    //     if (person1.ws !== ws) {
    //       person1.ws.close();
    //     } else if (person2 !== null) {
    //       person2.ws.close();
    //     }
    //     messageSession = null;
    //   }
    // }
  });
});

module.exports = router;
