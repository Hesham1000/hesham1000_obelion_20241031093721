const nodemailer = require('nodemailer');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('vezetaApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

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
  tableName: 'users',
  timestamps: false
});

const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  secure: false,
  auth: {
    user: 'your-email@example.com',
    pass: 'your-email-password'
  }
});

const sendRegistrationEmail = async (email, subject, text) => {
  try {
    await transporter.sendMail({
      from: '"VezetaApp" <no-reply@vezetaapp.com>',
      to: email,
      subject: subject,
      text: text
    });
    return { success: true, message: 'Email sent successfully.' };
  } catch (error) {
    return { success: false, message: 'Failed to send email.', error: error.message };
  }
};

module.exports = { sendRegistrationEmail, User };