"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("image_DogProfiles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      imageId: {
        type: Sequelize.INTEGER,
        references: { model: "Images" },
        allowNull: false,
      },
      dogProfileId: {
        type: Sequelize.INTEGER,
        references: { model: "Dogs" },
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("image_DogProfiles");
  },
};
