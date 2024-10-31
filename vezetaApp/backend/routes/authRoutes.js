const express = require('express');
const router = express.Router();
const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize with database credentials
const sequelize = new Sequelize('vezetaApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

// Test database connection
sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

// Define User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  social_media: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users'
});

// Define API routes
router.post('/register', async (req, res) => {
  try {
    const { email, phone, socialMedia, password } = req.body;

    if (!email || !phone || !password) {
      return res.status(400).json({ message: 'Email, phone, and password are required' });
    }

    const user = await User.create({ email, phone, social_media: socialMedia, password });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
});

// Additional API endpoints can be defined here

module.exports = router;