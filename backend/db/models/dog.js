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
    // associations can be defined here
    Dog.belongsTo(models.User, {foreignKey: 'ownerId'})
  };
  return Dog;
};
