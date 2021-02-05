const express = require("express");
const router = express.Router();

router.get("/add", async (req, res) => {
  const { user1, user2 } = req.query;
  console.log("------------------------");
  console.log(user1, user2);
  console.log("------------------------");
  // res.redirect("/");
  // return res.json(user1, user2);
  return res.end();
});

module.exports = router;
