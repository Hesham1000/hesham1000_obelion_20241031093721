const jwt = require('jsonwebtoken');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('vezetaApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Authentication token is missing.' });
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    const userId = decoded.id;

    // Assuming User is a model and it's been properly defined elsewhere
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error('User not found.');
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid authentication token.' });
  }
};

module.exports = authMiddleware;
