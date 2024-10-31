const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Handle payment transactions
router.post('/payment', paymentController.processPayment);

// Get transaction history
router.get('/transaction-history', paymentController.getTransactionHistory);

// Download invoices
router.get('/download-invoice', paymentController.downloadInvoice);

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = router;

Database configuration:json
{
  "host": "db",
  ...
}

Model file (example):
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cardNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cardHolderName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiryDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cvv: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  walletId: {
    type: DataTypes.STRING,
  },
  insuranceProvider: {
    type: DataTypes.STRING,
  },
  policyNumber: {
    type: DataTypes.STRING,
  },
});

module.exports = Payment;