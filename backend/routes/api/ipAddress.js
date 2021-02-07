const router = require("express").Router();
const requestIp = require("request-ip");

// inside middleware handler
const ipMiddleware = function (req, res, next) {
  const clientIp = requestIp.getClientIp(req);
  req.clientIp = clientIp;
  next();
};

router.get("/", ipMiddleware, async (req, res, next) => {
  console.log("here is clientIP --->", req.clientIp);
  res.json("please work");
});

module.exports = router;
