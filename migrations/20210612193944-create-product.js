'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      image_id: {
        type: Sequelize.INTEGER,
      },
      brand: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL
      },
      stock: {
        type: Sequelize.STRING
      },
      featured: {
        type: Sequelize.BOOLEAN,
      },
      status: {
        type: Sequelize.INTEGER,
        default: 1
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};