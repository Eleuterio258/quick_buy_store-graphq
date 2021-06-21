'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.belongsTo(models.User, { as: "roles",foreignKey:"id" });

    }
  
  };
  Role.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};