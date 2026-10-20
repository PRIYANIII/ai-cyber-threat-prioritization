const { isDatabaseConnected } = require('../config/db');

function requireDatabaseConnection(req, res, next) {
  if (!isDatabaseConnected()) {
    return res.status(503).json({
      message: 'Database is unavailable. Start MongoDB or configure a reachable MONGO_URI.',
    });
  }

  return next();
}

module.exports = { requireDatabaseConnection };
