"use strict";
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      URL: DataTypes.STRING,
    },
    {
      getterMethods: {
        info() {
          return this.URL;
        },
      },
    }
  );
  Image.addImage = async function (URL) {
    const image = await Image.create({
      URL,
    });
    return image.dataValues.id;
  };
  Image.associate = function (models) {
    // associations can be defined here
    Image.hasMany(models.Dog, { foreignKey: "profileImageId" });
  };
  return Image;
};
