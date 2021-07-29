"use strict";
module.exports = (sequelize, DataTypes) => {
  const Dog = sequelize.define(
    "Dog",
    {
      name: DataTypes.STRING,
      birthday: DataTypes.DATE,
      profileImageId: DataTypes.INTEGER,
      ownerId: DataTypes.INTEGER,
      vaccination: DataTypes.STRING,
    },
    {}
  );
  Dog.associate = function (models) {
    Dog.belongsTo(models.User, { foreignKey: "ownerId" });
    Dog.hasOne(models.DogProfile, {
      foreignKey: "dogId",
      onDelete: "cascade",
      hooks: true,
    });
    Dog.belongsTo(models.Image, {
      as: "ProfileImage",
      foreignKey: "profileImageId",
    });
  };
  return Dog;
};
