const cors = require('cors');
const express = require('express');
const alertRoutes = require('./routes/alert.routes');
const assetRoutes = require('./routes/asset.routes');
const eventRoutes = require('./routes/event.routes');
const healthRoutes = require('./routes/health.routes');
const predictionRoutes = require('./routes/prediction.routes');
const { errorHandler } = require('./middleware/error-handler');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', healthRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/predictions', predictionRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use(errorHandler);

module.exports = app;
