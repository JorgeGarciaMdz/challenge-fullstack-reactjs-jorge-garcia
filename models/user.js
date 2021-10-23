'use strict';
const {
  Model
} = require('sequelize');
const operation = require('./operation');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      notEmpty: true,
      len: [2, 150]
    },
    lastname: {
      type: DataTypes.STRING(150),
      allowNull: false,
      notEmpty: true,
      len: [2, 150]
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      isDate: true,
    },
    dni: {
      type: DataTypes.INTEGER,
      allowNull: false,
      isInt: true
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      notEmpty: true,
      isEmail: true,
    },
    password: {
      type: DataTypes.STRING(150),
      allowNull: false,
      len: [8, 150]
    },
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};