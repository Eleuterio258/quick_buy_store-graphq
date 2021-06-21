"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Role, { as: "role", foreignKey: "rolo_id" });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      fullname: {
        type: DataTypes.STRING(20),
        allowNull: true,
        unique: false,
      },
      password: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING(8),
        allowNull: true,
        unique: true,
      },
      role_id: {
        type: DataTypes.INTEGER(2),
        allowNull: false,
        defaultValue: 2,
      },
      imageUrl: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.INTEGER(2),
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};
