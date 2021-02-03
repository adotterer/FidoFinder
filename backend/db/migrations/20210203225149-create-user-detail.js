'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      liveLocationLat: {
        type: Sequelize.FLOAT
      },
      liveLocationLng: {
        type: Sequelize.FLOAT
      },
      homeLocationLat: {
        type: Sequelize.FLOAT
      },
      homeLocationLng: {
        type: Sequelize.FLOAT
      },
      status: {
        type: Sequelize.STRING
      },
      online: {
        type: Sequelize.BOOLEAN
      },
      userId: {
        type: Sequelize.INTEGER
      },
      profileImageId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserDetails');
  }
};