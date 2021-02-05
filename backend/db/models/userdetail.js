"use strict";
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
  return UserDetail;
};
