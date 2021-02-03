'use strict';
module.exports = (sequelize, DataTypes) => {
  const image_DogProfile = sequelize.define('image_DogProfile', {
    imageId: DataTypes.INTEGER,
    dogProfileId: DataTypes.INTEGER
  }, {});
  image_DogProfile.associate = function(models) {
    // associations can be defined here
  };
  return image_DogProfile;
};