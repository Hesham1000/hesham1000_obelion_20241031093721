const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('vezetaApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
});

module.exports = sequelize;
