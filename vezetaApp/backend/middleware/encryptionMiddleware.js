const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

const sequelize = new Sequelize('vezetaApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => console.log('Database connected.'))
  .catch(err => console.error('Unable to connect to the database:', err));

router.post('/authenticate', async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ error: 'Email and code are required.' });
    }

    if (code !== '123456') {
      return res.status(401).json({ error: 'Invalid authentication code.' });
    }

    // Simulate successful authentication
    return res.status(200).json({ message: 'Authentication successful!' });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred during authentication.' });
  }
});

module.exports = router;
