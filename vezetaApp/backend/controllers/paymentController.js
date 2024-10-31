const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('vezetaApp', 'root', 'root', {
  host: 'db',
  dialect: 'mysql',
  port: 3306,
});

const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  cardNumber: {
    type: DataTypes.STRING,
    allowNull: false
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
    type: DataTypes.STRING
  },
  insuranceProvider: {
    type: DataTypes.STRING
  },
  policyNumber: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'Payments',
  timestamps: true
});

exports.processPayment = async (req, res) => {
  try {
    const { cardNumber, cardHolderName, expiryDate, cvv, walletId, insuranceProvider, policyNumber } = req.body;

    if (!cardNumber || !cardHolderName || !expiryDate || !cvv) {
      return res.status(400).json({ error: 'Required payment details are missing' });
    }

    const payment = await Payment.create({
      cardNumber,
      cardHolderName,
      expiryDate,
      cvv,
      walletId,
      insuranceProvider,
      policyNumber
    });

    res.status(201).json({ message: 'Payment processed successfully', payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getTransactionHistory = async (req, res) => {
  try {
    const payments = await Payment.findAll();

    res.status(200).json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.downloadInvoices = async (req, res) => {
  try {
    const invoices = await Payment.findAll({
      attributes: ['id', 'cardNumber', 'cardHolderName', 'expiryDate', 'cvv', 'walletId', 'insuranceProvider', 'policyNumber', 'createdAt'],
    });

    res.status(200).json(invoices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};