const express = require("express");
const router = express.Router();
const user_chatRooms = 

router.get("/add", async (req, res) => {
  const { sessionUserId, otherUserId } = req.query;
  console.log("------------------------");
  console.log("sessionUserId: ", sessionUserId, "otherUserId: ", otherUserId);
  console.log("------------------------");

  return res.end();
});

module.exports = router;
