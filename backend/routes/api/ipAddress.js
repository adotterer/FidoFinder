const router = require("express").Router();
const requestIp = require("request-ip");
var geoip = require("geoip-lite");

// inside middleware handler
const ipMiddleware = function (req, res, next) {
  const clientIp = requestIp.getClientIp(req);
  req.clientIp = clientIp;
  console.log("inside middleware", clientIp);
  const geoObj = geoip.lookup(clientIp);
  console.log("geoObj", geoObj);
  req.geoObj = geoObj;

  next();
};

router.get("/", ipMiddleware, async (req, res, next) => {
  console.log("here is clientIP --->", req.clientIp);
  const { clientIp, geoObj } = req;

  console.log("geoobj", geoObj);
  res.json({ clientIp, geoObj });
});

module.exports = router;
