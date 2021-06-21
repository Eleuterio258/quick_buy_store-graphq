'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
    }
  };
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image_id: DataTypes.INTEGER,
    brand: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    stock: DataTypes.INTEGER,
    featured: DataTypes.BOOLEAN,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};