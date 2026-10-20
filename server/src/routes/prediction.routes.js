const express = require('express');
const { getPredictions } = require('../controllers/prediction.controller');
const { requireDatabaseConnection } = require('../middleware/database-connection');

const router = express.Router();

router.use(requireDatabaseConnection);
router.get('/', getPredictions);

module.exports = router;
