const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { Sequelize, DataTypes } = require('sequelize');

// Database connection
const sequelize = new Sequelize('vezetaApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
});

// Define Provider model
const Provider = sequelize.define('Provider', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specialty: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  available: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  tableName: 'providers',
  timestamps: false,
});

// Define Appointment model
const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  providerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'appointments',
  timestamps: false,
});

// Check database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// GET /providers - Retrieve a list of providers based on search criteria
router.get('/providers', bookingController.searchProviders);

// POST /appointments - Schedule an appointment with a selected provider
router.post('/appointments', bookingController.scheduleAppointment);

module.exports = router;