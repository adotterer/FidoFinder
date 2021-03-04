const router = require("express").Router();
const requestIp = require("request-ip");
const fs = require("fs");
const geoip = require("geoip-lite");
const { User, UserDetail } = require("../../db/models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// inside middleware handler
const ipMiddleware = function (req, res, next) {
  const clientIp = requestIp.getClientIp(req);
  req.clientIp = clientIp;

  const geoObj = geoip.lookup(clientIp);
  console.log("*********************");
  console.log("*******(inside ipMiddleware)*******");
  console.log("*********************");
  console.log("geoObj ---->", geoObj);
  console.log("*********************");
  console.log("*********************");
  console.log("*********************");
  req.geoObj = geoObj;

  next();
};

router.get("/logs/:date", async (req, res, next) => {
  const { date } = req.params;
  try {
    fs.readFile(`./logs/log__${date}.txt`, "utf8", (err, data) => {
      if (err) throw err;
      console.log("data, about to be sent back, split", data.split("\n"));
      res.json(data.split("\n"));
    });
  } catch (e) {
    console.error(e);
    next();
  }
});

router.get("/", ipMiddleware, async (req, res, next) => {
  console.log("*********************");
  console.log("*********************");
  console.log("*********************");
  console.log("here is clientIP ---->", req.clientIp);
  console.log("*********************");
  console.log("*********************");
  console.log("*********************");
  const { clientIp, geoObj } = req;

  let latlng;
  let nearbyUsers;
  const todaysDate = new Date().toISOString().slice(0, 10);

  if (!geoObj) {
    latlng = { lat: 40.71, lng: -74.0 };
    const logStream = fs.createWriteStream(`./logs/log__${todaysDate}.txt`, {
      flags: "a",
    });
    logStream.write(
      `\n######### Anonymous User #########
       ## IP Address: ${clientIp}
       ## LocalTime: ${new Date().toLocaleTimeString("en-US")} `
    );
    logStream.end("\n------END-------");
  } else {
    console.log(geoObj);
    latlng = { lat: geoObj.ll[0], lng: geoObj.ll[1] };

    const logStream = fs.createWriteStream(`./logs/log__${todaysDate}.txt`, {
      flags: "a",
    });
    logStream.write(
      `######### Anonymous User #########
       ### Country: ${geoObj.country}
       ## City: ${geoObj.city}
       ## Lat: ${geoObj.ll[0]}
       ## Lng: ${geoObj.ll[1]}
       ## LocalTime: ${new Date().toLocaleTimeString("en-US")}
      `
    );
    logStream.end(`\n------END-------\n`);
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
