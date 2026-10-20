function errorHandler(error, req, res, next) { // eslint-disable-line no-unused-vars
  if (error.status && Number.isInteger(error.status)) {
    return res.status(error.status).json({ message: error.message });
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({ message: 'Validation failed', errors: Object.values(error.errors).map((item) => item.message) });
  }

  if (error.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid resource identifier' });
  }

  if (error.code === 11000) {
    return res.status(409).json({ message: 'A record with this value already exists' });
  }

  if (error.name === 'MongooseServerSelectionError' || error.name === 'MongoServerSelectionError') {
    return res.status(503).json({ message: 'Database is unavailable. Please try again later.' });
  }

  console.error('Unhandled request error:', error.message);
  return res.status(500).json({ message: 'Internal server error' });
}

module.exports = { errorHandler };
