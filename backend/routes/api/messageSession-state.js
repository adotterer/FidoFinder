class Person {
  constructor(userId, username, ws) {
    this.userId = userId;
    this.username = username;
    this.ws = ws;
  }

  getData() {
    return {
      username: this.username,
    };
  }
}

class MessageSession {
  constructor(users, chatRoomId) {
    // this.person1 = person1;
    // this.person2 = null;
    this.chatRoomId = chatRoomId;
    this.users = users;
    this.styles = ["lightblue", "lightgray"];
    this.messages = [];
  }

  // get messageSessionOver() {
  // }

  getPersons() {
    return users;
  }

  getData() {
    return {
      users: this.users.map((user) => user.getData()),
      messages: this.messages,
    };
  }
}

class GlobalChatStore {
  // constructor() {
  //   this.store = {};
  // }

  addNewChatSession(messageSession) {
    return (this[`chatRoomNum${messageSession.chatRoomId}`] = messageSession);
  }

  findMessageSession(chatRoomId) {
    return this[`chatRoomNum${chatRoomId}`];
  }
}

module.exports = {
  MessageSession,
  Person,
  GlobalChatStore,
};
