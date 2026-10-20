const express = require('express');
const { createAsset, getAssets } = require('../controllers/asset.controller');
const { requireDatabaseConnection } = require('../middleware/database-connection');
const { validateAsset } = require('../middleware/validate-request');

const router = express.Router();

router.use(requireDatabaseConnection);
router.route('/').get(getAssets).post(validateAsset, createAsset);

module.exports = router;
