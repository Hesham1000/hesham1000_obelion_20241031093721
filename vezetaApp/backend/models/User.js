const { Model, Sequelize } = require('sequelize');
const sequelize = new Sequelize('vezetaApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
});

class User extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: /^[0-9]+$/,
        },
      },
      socialMedia: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'users',
      timestamps: false,
    });
  }

  static associate(models) {
    // Define associations here if needed
  }
}

User.beforeCreate(async (user, options) => {
  const hashedPassword = await someHashingFunction(user.password);
  user.password = hashedPassword;
});

module.exports = User;