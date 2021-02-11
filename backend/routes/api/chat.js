const express = require("express");
const router = express.Router();
const { createServer } = require("http");
const WebSocket = require("ws");
const server = createServer(router).listen(7070);
const { User } = require("../../db/models");
const {
  MessageSession,
  Person,
  GlobalChatStore,
} = require("./messageSession-state");

// https://stackoverflow.com/questions/28516962/how-websocket-server-handles-multiple-incoming-connection-requests

// router.get("/salmon", async (req, res, next) => {
//   let id = 1;
//   console.log("hello");
//   let user = await User.checkOnlineStatusById(id);
//   res.json(user);
// });

// router.get("/room/");

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

const startMessageSession = () => {
  const data = messageSession.getData();
  broadcastMessage("start-message-session", data, messageSession.getPersons());
};

// GLOBAL CHATROOM
const globalChatStore = new GlobalChatStore();

const addNewPerson = (userId, username, chatRoomId, ws) => {
  // const person = new Person(user, ws); // OLD VERSION
  const person = new Person(userId, username, chatRoomId, ws); // NEW VERSION

  // TODO:
  // ------> see if there is already a chat session in the GlobalChatStore
  // ------> IF NOT, it creates a new message session and adds all the authorized users [] from the database onto MessageSession.users;
  // ------> IF GlobalMessageStore[`chatRoomNum${chatRoomId} is TRUE, then it ....
  console.log("DO IT");
  console.log("DO IT");
  console.log("DO IT");
  console.log(person);
  console.log("DO IT");
  console.log("DO IT");
  console.log("DO IT");

  // if (true) {
  //   // messageSession = new MessageSession(person); // OLD VERSION
  // } else if (false) {
  //   // CRITICAL PART to prevent unauthorized users

  //   // messageSession.person2 = person;
  //   startMessageSession();
  // } else {
  //   // TODO Ignore any additional person connections.
  //   console.log(`Ignoring person ${username}...`);
  //   ws.close();
  // }
};

const updateMessageSession = () => {
  const persons = messageSession.getPersons();
  const data = messageSession.getData();
  broadcastMessage("update-message-session", data, persons);
};

const recordChat = (chatData) => {
  messageSession.messages.push(chatData);
  updateMessageSession();
};

// //Processing incoming message {"type":"chat-message","data":{"username":"p2","msg":"hi there"}}
const processIncomingMessage = (jsonData, ws) => {
  console.log(`Processing incoming message ${jsonData}...`);

  const message = JSON.parse(jsonData);

  switch (message.type) {
    case "add-new-person":
      addNewPerson(message.data.userId, message.data.username, ws);
      break;
    case "chat-message":
      recordChat(message.data, ws);
      break;
    default:
      throw new Error(`Unknown message type: ${message.type}`);
  }
};

// const wss = new WebSocket.Server({ server });

//  https://stackoverflow.com/questions/22429744/how-to-setup-route-for-websocket-server-in-express
// I think I can use this code to create a new websocket server for each chat room
// var wss = new WebSocketServer({server: server, path: "/:chatRoomId"});

// router.get("/oboe/:chatRoomId", (req, res, next) => {
//   console.log("****************************");
//   console.log("****************************");
//   console.log("****************************");
//   console.log("****************************");
//   console.log("****************************");
//   console.log("****************************");
//   console.log("****************************");
//   console.log("****************************");
//   console.log("****************************");
//   console.log("hello, it's me", res);
// });

let wss;
wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  ws.on("message", (jsonData) => {
    console.log("hello from ws.on line 114", JSON.parse(jsonData));
    processIncomingMessage(jsonData, ws);
  });

  ws.on("close", () => {
    // If there's a messageSession available...
    if (messageSession !== null) {
      const { person1, person2 } = messageSession;

      // If the closed WS belonged to either person 1 or person 2
      // then we need to abort the messageSession.
      if (person1.ws === ws || (person2 !== null && person2.ws === ws)) {
        // If the closed WS doesn't belong to person 1
        // then close their WS, otherwise if there's a
        // person 2 then close their WS.
        if (person1.ws !== ws) {
          person1.ws.close();
        } else if (person2 !== null) {
          person2.ws.close();
        }
        messageSession = null;
      }
    }
  });
});

module.exports = router;
