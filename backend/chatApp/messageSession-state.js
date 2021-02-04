class Person {
  constructor(username, ws) {
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
  constructor(person1) {
    this.person1 = person1;
    this.person2 = null;
    this.styles = ["lightblue", "lightgray"];
    this.messages = [];
  }

  // get messageSessionOver() {
  // }

  getPersons() {
    return [this.person1, this.person2];
  }

  getData() {
    return {
      person1: this.person1.getData(),
      person2: this.person2.getData(),
      messages: this.messages,
    };
  }
}

module.exports = {
  MessageSession,
  Person,
};
