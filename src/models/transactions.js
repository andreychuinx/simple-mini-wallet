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
      defaultValue: DataTypes.UUIDV4
    },
    deposited_by: {
      type: DataTypes.UUID
    },
    deposited_at: {
      type: DataTypes.DATE
    },
    withdrawn_by: {
      type: DataTypes.UUID
    },
    withdrawn_at: {
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.ENUM('success', 'failed')
    },
    type: {
      type: DataTypes.ENUM('deposit', 'withdrawal')
    },
    amount: {
      type: DataTypes.DECIMAL
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