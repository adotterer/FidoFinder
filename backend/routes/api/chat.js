const express = require("express");
const router = express.Router();
const { createServer } = require("http");
const WebSocket = require("ws");
const server = createServer(router).listen(7070);
const { User } = require("../../db/models");
const { MessageSession, Person } = require("./messageSession-state");

const wss = new WebSocket.Server({ server });

let messageSession = null;

router.get("/salmon", async (req, res, next) => {
  let id = 1;
  let user = await User.checkOnlineStatusById(id);
  res.json(user);
});

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

const addNewPerson = (username, ws) => {
  const person = new Person(username, ws);

  if (messageSession === null) {
    messageSession = new MessageSession(person);
  } else if (messageSession.person2 === null) {
    messageSession.person2 = person;
    startMessageSession();
  } else {
    // TODO Ignore any additional person connections.
    console.log(`Ignoring person ${username}...`);
    ws.close();
  }
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
      addNewPerson(message.data.username, ws);
      break;
    case "chat-message":
      recordChat(message.data, ws);
      break;
    default:
      throw new Error(`Unknown message type: ${message.type}`);
  }
};

wss.on("connection", (ws) => {
  ws.on("message", (jsonData) => {
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