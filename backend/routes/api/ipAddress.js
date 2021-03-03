const router = require("express").Router();
const requestIp = require("request-ip");
var geoip = require("geoip-lite");
const { User, UserDetail } = require("../../db/models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

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

  let latlng;
  let nearbyUsers;

  if (!geoObj) {
    latlng = { lat: 40.71, lng: -74.0 };
  } else {
    latlng = { lat: geoObj.ll[0], lng: geoObj.ll[1] };
  }

  nearbyUsers = await User.findAll({
    include: {
      model: UserDetail,
      where: {
        liveLocationLat: {
          [Op.between]: [latlng.lat - 0.5, latlng.lat + 0.5],
        },
        liveLocationLng: {
          [Op.between]: [latlng.lng - 0.5, latlng.lng + 0.5],
        },
      },
    },
    order: [["createdAt", "DESC"]],
    limit: 100,
  });
  res.json({ latlng, nearbyUsers });
});

module.exports = router;
