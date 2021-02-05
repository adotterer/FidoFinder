const express = require("express");
const router = express.Router();
const { createServer } = require("http");
const WebSocket = require("ws");
const server = createServer(router);

const wss = new WebSocket.Server({ server });

let messageSession = null;

router.get("/salmon", async (req, res, next) => {
  res.json({ msg: "hello world" });
});

module.exports = router;
