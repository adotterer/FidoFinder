class Person {
  constructor(username, ws) {
    this.id = id;
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
  constructor(users) {
    // this.person1 = person1;
    // this.person2 = null;
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

module.exports = {
  MessageSession,
  Person,
};
