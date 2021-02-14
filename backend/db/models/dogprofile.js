"use strict";
module.exports = (sequelize, DataTypes) => {
  const DogProfile = sequelize.define(
    "DogProfile",
    {
      dogId: DataTypes.INTEGER,
      interests: DataTypes.TEXT,
    },
    {}
  );
  DogProfile.associate = function (models) {
    DogProfile.belongsTo(models.Dog);
  };
  return DogProfile;
};
