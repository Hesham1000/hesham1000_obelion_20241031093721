const { Sequelize } = require('sequelize');
const Provider = require('../models/Provider');
const Appointment = require('../models/Appointment');

const sequelize = new Sequelize('vezetaApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

exports.searchProviders = async (req, res) => {
  try {
    const { specialty, location, availability } = req.query;
    
    const providers = await Provider.findAll({
      where: {
        specialty: specialty || '',
        location: location || '',
        available: availability === 'true'
      }
    });

    res.status(200).json({ providers });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching providers' });
  }
};

exports.scheduleAppointment = async (req, res) => {
  try {
    const { providerId, appointmentDate } = req.body;

    const provider = await Provider.findByPk(providerId);
    if (!provider) {
      return res.status(404).json({ error: 'Provider not found' });
    }

    const appointment = await Appointment.create({
      providerId,
      userId: req.userId, // Assuming userId is available in req object
      date: appointmentDate,
      status: 'Scheduled' // Assuming default status
    });

    res.status(201).json({ message: 'Appointment scheduled', appointment });
  } catch (error) {
    res.status(500).json({ error: 'Error scheduling appointment' });
  }
};