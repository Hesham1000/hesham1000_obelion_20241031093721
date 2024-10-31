const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const fs = require('fs');

// Database connection
const sequelize = new Sequelize('vezetaApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
});

const sqlFilePath = path.join(__dirname, '../../database/migrations/create_users_table.sql');
const createUsersTableQuery = fs.readFileSync(sqlFilePath, 'utf8');

sequelize.query(createUsersTableQuery).then(() => {
  console.log('Users table created successfully!');
}).catch(err => {
  console.error('Error creating users table:', err);
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
  socialMedia: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users',
  timestamps: false
});

const registerUser = async (req, res) => {
  const { email, phone, socialMedia, password } = req.body;

  try {
    if (!email || !phone || !socialMedia || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const newUser = await User.create({ email, phone, socialMedia, password });
    return res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};

module.exports = {
  registerUser,
};