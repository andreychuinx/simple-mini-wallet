'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('wallets', 'balance', Sequelize.DECIMAL)
    return queryInterface.changeColumn('transactions', 'amount', Sequelize.DECIMAL)
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('wallets', 'balance', Sequelize.INTEGER)
    await queryInterface.changeColumn('transactions', 'amount', Sequelize.INTEGER)

    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
