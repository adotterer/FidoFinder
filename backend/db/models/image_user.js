'use strict';
module.exports = (sequelize, DataTypes) => {
  const image_User = sequelize.define('image_User', {
    imageId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  image_User.associate = function(models) {
    // associations can be defined here
  };
  return image_User;
};