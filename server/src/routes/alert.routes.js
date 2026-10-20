const express = require('express');
const { getAlerts } = require('../controllers/alert.controller');
const { requireDatabaseConnection } = require('../middleware/database-connection');

const router = express.Router();

router.use(requireDatabaseConnection);
router.get('/', getAlerts);

module.exports = router;
