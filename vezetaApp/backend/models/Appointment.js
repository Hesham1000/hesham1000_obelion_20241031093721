const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('vezetaApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

class Appointment extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      providerId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, { 
      sequelize, 
      modelName: 'appointments', 
      timestamps: false 
    });
  }
}

Appointment.init(sequelize);

module.exports = Appointment;