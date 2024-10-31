const { Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('vezetaApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

class Payment extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      cardNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isCreditCard: true
        }
      },
      cardHolderName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      expiryDate: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cvv: {
        type: DataTypes.STRING,
        allowNull: false
      },
      walletId: {
        type: DataTypes.STRING,
        allowNull: true
      },
      insuranceProvider: {
        type: DataTypes.STRING,
        allowNull: true
      },
      policyNumber: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
      sequelize,
      modelName: 'Payments',
      timestamps: false
    });
  }
}

module.exports = Payment;