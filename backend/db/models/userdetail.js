const { createLocationObj } = require("../../utils/geolocator");

("use strict");
module.exports = (sequelize, DataTypes) => {
  const UserDetail = sequelize.define(
    "UserDetail",
    {
      liveLocationLat: DataTypes.FLOAT,
      liveLocationLng: DataTypes.FLOAT,
      homeLocationLat: DataTypes.FLOAT,
      homeLocationLng: DataTypes.FLOAT,
      status: DataTypes.STRING,
      online: DataTypes.BOOLEAN,
      userId: DataTypes.INTEGER,
      profileImageId: DataTypes.INTEGER,
    },
    {}
  );
  UserDetail.associate = function (models) {
    // associations can be defined here
    UserDetail.belongsTo(models.User, {
      foreignKey: "userId",
    });
  };
  UserDetail.createDetailsFindLocation = async function (location, userId) {
    const locationObj = await createLocationObj(location);
    console.log("$$$$$$$$$$$$$$$$$$$$$$");
    console.log("$$$$$$$$$$$$$$$$$$$$$$");
    console.log("$$$$$$$$$$$$$$$$$$$$$$");
    console.log("$$$$$$$$$$$$$$$$$$$$$$");
    console.log("$$$$$$$$$$$$$$$$$$$$$$");
    console.log(locationObj);
    console.log(userId);
    try {
      UserDetail.create({
        liveLocationLat: locationObj.lat,
        liveLocationLng: locationObj.lng,
        homeLocationLat: locationObj.lat,
        homeLocationLng: locationObj.lng,
        status: "",
        online: true,
        userId,
      });
    } catch (e) {
      console.error(e);
    }
    console.log("$$$$$$$$$$$$$$$$$$$$$$");
    console.log("$$$$$$$$$$$$$$$$$$$$$$");
    console.log("$$$$$$$$$$$$$$$$$$$$$$");
    console.log("$$$$$$$$$$$$$$$$$$$$$$");
    console.log("$$$$$$$$$$$$$$$$$$$$$$");
  };
  return UserDetail;
};
