const { Sequelize, DataTypes } = require('sequelize');

// Establish a connection to the database
const sequelize = new Sequelize('vezetaApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
});

// Define the Provider model
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

// Define the Appointment model
const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  providerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Provider,
      key: 'id',
    },
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

async function searchProviders(req, res) {
  try {
    const { specialty, location, availability } = req.query;
    
    const providers = await Provider.findAll({
      where: {
        specialty: specialty,
        location: location,
        available: availability === 'true',
      },
    });

    res.json(providers);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while searching for providers.' });
  }
}

async function scheduleAppointment(req, res) {
  try {
    const { providerId, appointmentDate } = req.body;
    
    const provider = await Provider.findByPk(providerId);
    if (!provider) {
      return res.status(404).json({ error: 'Provider not found.' });
    }

    const appointment = await Appointment.create({
      providerId,
      date: new Date(appointmentDate),
    });

    res.json({ message: 'Appointment scheduled successfully.', appointment });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while scheduling the appointment.' });
  }
}

module.exports = {
  searchProviders,
  scheduleAppointment,
};