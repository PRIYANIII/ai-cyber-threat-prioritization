const { getDatabaseStatus } = require('../config/db');

function getHealth(req, res) {
  res.json({
    status: 'ok',
    service: 'cyber-threat-backend',
    database: getDatabaseStatus(),
  });
}

module.exports = { getHealth };
