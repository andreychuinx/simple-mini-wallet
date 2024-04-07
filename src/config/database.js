const Sequelize = require('sequelize');
const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = require('./app');

module.exports = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
 host: DB_HOST,
 port: DB_PORT,
 dialect: 'postgres', // Change to your database type
});