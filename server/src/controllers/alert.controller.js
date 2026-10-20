const Alert = require('../models/alert.model');

async function getAlerts(req, res, next) {
  try {
    const alerts = await Alert.find().sort({ createdAt: -1 }).lean();
    return res.json({ alerts });
  } catch (error) {
    return next(error);
  }
}

module.exports = { getAlerts };
