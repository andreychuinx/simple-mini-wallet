'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'transactions',
      'wallet_id'
    )
    await queryInterface.addColumn(
      'transactions',
      'deposited_by',
      {
        type: Sequelize.UUID
      }
    )
    await queryInterface.addColumn(
      'transactions',
      'deposited_at',
      {
        type: Sequelize.DATE
      }
    )
    await queryInterface.addColumn(
      'transactions',
      'withdrawn_by',
      {
        type: Sequelize.UUID
      }
    )
    return queryInterface.addColumn(
      'transactions',
      'withdrawn_at',
      {
        type: Sequelize.DATE
      }
    )
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'transactions',
      'wallet_id',
      {
        type: Sequelize.UUID
      }
    )
    await queryInterface.removeColumn(
      'transactions',
      'deposited_by'
    )
    await queryInterface.removeColumn(
      'transactions',
      'deposited_at'
    )
    await queryInterface.removeColumn(
      'transactions',
      'withdrawn_by'
    )
    await queryInterface.removeColumn(
      'transactions',
      'withdrawn_at'
    )
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
