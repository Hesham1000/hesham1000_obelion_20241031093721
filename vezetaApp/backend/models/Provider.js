const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database/connection'); // Ensure to create this connection file with the specified credentials

class Provider extends Model {
  static init(sequelize) {
    super.init({
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      specialty: { type: DataTypes.STRING, allowNull: false },
      location: { type: DataTypes.STRING, allowNull: false },
      available: { type: DataTypes.BOOLEAN, allowNull: false }
    }, {
      sequelize,
      modelName: 'Provider',
      tableName: 'providers',
      timestamps: false
    });
  }
}

module.exports = Provider;