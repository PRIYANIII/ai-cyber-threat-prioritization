const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema(
  {
    threatEvent: { type: mongoose.Schema.Types.ObjectId, ref: 'ThreatEvent', required: true, index: true },
    riskScore: { type: Number, required: true, min: 0, max: 100 },
    severity: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], required: true },
    priority: { type: String, enum: ['P1', 'P2', 'P3', 'P4'], required: true },
    modelMode: { type: String, enum: ['Demo', 'TrainedModel'], required: true },
    modelVersion: { type: String, trim: true },
  },
  { timestamps: true },
);

predictionSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Prediction', predictionSchema);
