"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      fullname: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING,

      },
      imageUrl: {
        type: Sequelize.STRING,

      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      phone: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
      },
      status: {
        type: Sequelize.INTEGER,
        default: 1
      },
      role_id: {
        type: Sequelize.INTEGER,
        default: 2
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
  },
};
