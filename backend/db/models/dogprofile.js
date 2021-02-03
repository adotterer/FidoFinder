'use strict';
module.exports = (sequelize, DataTypes) => {
  const DogProfile = sequelize.define('DogProfile', {
    dogId: DataTypes.INTEGER,
    interests: DataTypes.TEXT
  }, {});
  DogProfile.associate = function(models) {
    // associations can be defined here
  };
  return DogProfile;
};