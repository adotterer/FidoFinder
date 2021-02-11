const {
  MessageSession,
  Person,
  GlobalChatStore,
} = require("../routes/api/messageSession-state");

const billy = new Person(1, "Billy", "ws");
const rosie = new Person(2, "Rosie", "ws");

const users = [billy, rosie];

const messageSession1 = new MessageSession(users, 1);

const globalStore = new GlobalChatStore();

globalStore.addNewChatSession(messageSession1);

console.log(globalStore);

console.log(globalStore.findMessageSession(1));
