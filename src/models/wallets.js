'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class wallets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  wallets.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    owned_by: {
      type: DataTypes.UUID
    },
    status: {
      type: DataTypes.ENUM('enabled', 'disabled'),
      defaultValue: 'disabled'
    },
    enabled_at: {
      type: DataTypes.DATE
    },
    balance: {
      type: DataTypes.DECIMAL
    }
  }, {
    sequelize,
    modelName: 'wallets',
  });
  return wallets;
};