const Asset = require('../models/asset.model');

async function createAsset(req, res, next) {
  try {
    const asset = await Asset.create(req.body);
    return res.status(201).json(asset);
  } catch (error) {
    return next(error);
  }
}

async function getAssets(req, res, next) {
  try {
    const assets = await Asset.find().sort({ createdAt: -1 }).lean();
    return res.json({ assets });
  } catch (error) {
    return next(error);
  }
}

module.exports = { createAsset, getAssets };
