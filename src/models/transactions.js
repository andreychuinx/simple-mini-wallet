'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  transactions.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    status: {
      type: DataTypes.ENUM('success', 'failed')
    },
    transaction_at: {
      type: DataTypes.DATE
    },
    type: {
      type: DataTypes.ENUM('deposit', 'withdrawal')
    },
    amount: {
      type: DataTypes.INTEGER
    },
    reference_id: {
      type: DataTypes.UUID,
    },
  }, {
    sequelize,
    modelName: 'transactions',
  });
  return transactions;
};