const express = require('express');
const { analyzeEvent } = require('../controllers/analysis.controller');
const { createEvent, getEventById, getEvents } = require('../controllers/event.controller');
const { requireDatabaseConnection } = require('../middleware/database-connection');
const { validateThreatEvent } = require('../middleware/validate-request');

const router = express.Router();

router.use(requireDatabaseConnection);
router.route('/').get(getEvents).post(validateThreatEvent, createEvent);
router.post('/:id/analyze', analyzeEvent);
router.get('/:id', getEventById);

module.exports = router;
