const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema(
  {
    threatEvent: { type: mongoose.Schema.Types.ObjectId, ref: 'ThreatEvent', required: true, index: true },
    prediction: { type: mongoose.Schema.Types.ObjectId, ref: 'Prediction', required: true, index: true },
    title: { type: String, required: true, trim: true },
    severity: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], required: true },
    priority: { type: String, enum: ['P1', 'P2', 'P3', 'P4'], required: true },
    recommendedAction: { type: String, trim: true },
    status: { type: String, enum: ['Open', 'Acknowledged', 'Closed'], default: 'Open' },
  },
  { timestamps: true },
);

alertSchema.index({ createdAt: -1 });
alertSchema.index({ threatEvent: 1, prediction: 1 }, { unique: true });

module.exports = mongoose.model('Alert', alertSchema);
