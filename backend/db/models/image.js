"use strict";
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      URL: DataTypes.STRING,
    },
    {}
  );
  Image.addImage = async function (URL) {
    const image = await Image.create({
      URL,
    });
    return image.dataValues.id;
  };
  Image.associate = function (models) {
    // associations can be defined here
    Image.belongsTo(models.Dog, { foreignKey: "dogId" });
  };
  return Image;
};
