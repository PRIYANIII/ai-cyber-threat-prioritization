const ATTACK_TYPES = ['Malware', 'Ransomware', 'SQL Injection', 'Other'];
const EVENT_STATUSES = ['New', 'Under Investigation', 'Resolved'];

const THREAT_EVENT_NUMBERS = [
  'eventFrequency',
  'assetCriticality',
  'vulnerabilityContext',
  'sourceReputation',
  'historicalOccurrence',
  'potentialImpact',
  'affectedScope',
];

function isPercentage(value) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 100;
}

function validateThreatEvent(req, res, next) {
  const errors = [];
  const { body } = req;

  if (!ATTACK_TYPES.includes(body.attackType)) errors.push('attackType must be a supported attack type');
  if (typeof body.targetAsset !== 'string' || !body.targetAsset.trim()) errors.push('targetAsset is required');
  THREAT_EVENT_NUMBERS.forEach((field) => {
    if (!isPercentage(body[field])) errors.push(`${field} must be a number between 0 and 100`);
  });
  if (body.eventStatus !== undefined && !EVENT_STATUSES.includes(body.eventStatus)) errors.push('eventStatus is invalid');
  if (body.dataMode !== undefined && !['Demo', 'Real'].includes(body.dataMode)) errors.push('dataMode is invalid');
  if (body.sourceIp !== undefined && typeof body.sourceIp !== 'string') errors.push('sourceIp must be a string');
  if (body.description !== undefined && typeof body.description !== 'string') errors.push('description must be a string');

  if (errors.length) return res.status(400).json({ message: 'Validation failed', errors });
  return next();
}

function validateAsset(req, res, next) {
  const { name, assetType, criticality, owner } = req.body;
  const errors = [];

  if (typeof name !== 'string' || !name.trim()) errors.push('name is required');
  if (assetType !== undefined && typeof assetType !== 'string') errors.push('assetType must be a string');
  if (criticality !== undefined && !isPercentage(criticality)) errors.push('criticality must be a number between 0 and 100');
  if (owner !== undefined && typeof owner !== 'string') errors.push('owner must be a string');

  if (errors.length) return res.status(400).json({ message: 'Validation failed', errors });
  return next();
}

module.exports = {
  ATTACK_TYPES,
  EVENT_STATUSES,
  validateAsset,
  validateThreatEvent,
};
