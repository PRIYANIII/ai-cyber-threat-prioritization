const mongoose = require('mongoose');

mongoose.set('bufferCommands', false);

function getDatabaseStatus() {
  const connected = mongoose.connection.readyState === 1;

  return {
    status: connected ? 'connected' : 'disconnected',
    connected,
  };
}

async function connectDatabase() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error('MongoDB connection skipped: MONGO_URI is not configured.');
    return false;
  }

  try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log('MongoDB connected successfully.');
    return true;
  } catch (error) {
    console.error('MongoDB connection failed. Verify MongoDB is running and MONGO_URI is reachable.');
    return false;
  }
}

function isDatabaseConnected() {
  return mongoose.connection.readyState === 1;
}

module.exports = {
  connectDatabase,
  getDatabaseStatus,
  isDatabaseConnected,
};
