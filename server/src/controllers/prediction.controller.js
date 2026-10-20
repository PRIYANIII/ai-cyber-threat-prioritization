const Prediction = require('../models/prediction.model');

async function getPredictions(req, res, next) {
  try {
    const predictions = await Prediction.find().sort({ createdAt: -1 }).lean();
    return res.json({ predictions });
  } catch (error) {
    return next(error);
  }
}

module.exports = { getPredictions };
