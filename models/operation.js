'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Operation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Operation.belongsTo(
        models.User,
        {
          foreignKey: {
            name: 'user_id',
            allowNull: false
          }
        });
    }
  };
  Operation.init({
    concept: {
      type: DataTypes.STRING(150),
      allowNull: false,
      notEmpty: true,
      len: [2, 150]
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      isFloat: true,
    },
    typeOperation: {
      type: DataTypes.STRING(25),
      allowNull: false,
      notEmpty: true,
      len: [3, 25]
    },
    deletedAt: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Operation',
  });
  return Operation;
};