const io = require("socket.io")();

const db = require("./db/models");
// const { socketRequireAuth } = require("./utils/auth");

const roomMap = {};
const liveUsers = new Set();

io.on("connection", (socket) => {
  console.log("connected");

  const {
    user,
    handshake: {
      query: { type, conversation },
    },
  } = socket;
  switch (type) {
    case "chat":
      console.log(conversation);
      socket.on("message", (msg) => {
        console.log(msg);
        io.to(socket.id).emit("message", { msg: "hello back" });
      });
    // socket.emit("");
  }
});

module.exports = io;
