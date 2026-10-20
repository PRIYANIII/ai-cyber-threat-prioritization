const mongoose = require('mongoose');
const ThreatEvent = require('../models/threat-event.model');
const { ATTACK_TYPES, EVENT_STATUSES } = require('../middleware/validate-request');

function getPagination(query) {
  const page = Number.parseInt(query.page, 10) || 1;
  const limit = Number.parseInt(query.limit, 10) || 20;
  return { page: Math.max(page, 1), limit: Math.min(Math.max(limit, 1), 100) };
}

async function createEvent(req, res, next) {
  try {
    const event = await ThreatEvent.create(req.body);
    return res.status(201).json(event);
  } catch (error) {
    return next(error);
  }
}

async function getEvents(req, res, next) {
  try {
    const { attackType, eventStatus } = req.query;
    if (attackType && !ATTACK_TYPES.includes(attackType)) return res.status(400).json({ message: 'attackType filter is invalid' });
    if (eventStatus && !EVENT_STATUSES.includes(eventStatus)) return res.status(400).json({ message: 'eventStatus filter is invalid' });

    const { page, limit } = getPagination(req.query);
    const filter = {};
    if (attackType) filter.attackType = attackType;
    if (eventStatus) filter.eventStatus = eventStatus;

    const [events, total] = await Promise.all([
      ThreatEvent.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      ThreatEvent.countDocuments(filter),
    ]);

    return res.json({ events, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
  } catch (error) {
    return next(error);
  }
}

async function getEventById(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid event ID' });
    const event = await ThreatEvent.findById(req.params.id).lean();
    if (!event) return res.status(404).json({ message: 'Threat event not found' });
    return res.json(event);
  } catch (error) {
    return next(error);
  }
}

module.exports = { createEvent, getEventById, getEvents };
