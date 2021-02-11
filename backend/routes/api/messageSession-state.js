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
  constructor(authorizedUsers, person, chatRoomId) {
    // this.person1 = person1;
    // this.person2 = null;
    this.chatRoomId = chatRoomId;
    this.authorizedUsers = authorizedUsers;
    this.users = [person];
    this.styles = ["lightblue", "lightgray"];
    this.messages = [];
  }

  // get messageSessionOver() {
  // }

  getPersons() {
    return this.users;
  }

  getAuthorizedUsers() {
    return this.authorizedUsers;
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
