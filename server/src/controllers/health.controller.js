function getHealth(req, res) {
  res.json({
    status: 'ok',
    service: 'cyber-threat-backend',
  });
}

module.exports = { getHealth };
