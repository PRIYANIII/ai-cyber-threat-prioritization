const mongoose = require('mongoose');

const percentageField = {
  type: Number,
  required: true,
  min: 0,
  max: 100,
};

const threatEventSchema = new mongoose.Schema(
  {
    attackType: {
      type: String,
      enum: ['Malware', 'Ransomware', 'SQL Injection', 'Other'],
      required: true,
      trim: true,
    },
    targetAsset: { type: String, required: true, trim: true },
    eventFrequency: percentageField,
    assetCriticality: percentageField,
    vulnerabilityContext: percentageField,
    sourceReputation: percentageField,
    historicalOccurrence: percentageField,
    potentialImpact: percentageField,
    affectedScope: percentageField,
    sourceIp: { type: String, trim: true },
    description: { type: String, trim: true },
    eventStatus: {
      type: String,
      enum: ['New', 'Under Investigation', 'Resolved'],
      default: 'New',
    },
    dataMode: { type: String, enum: ['Demo', 'Real'], default: 'Demo' },
  },
  { timestamps: true },
);

threatEventSchema.index({ attackType: 1, eventStatus: 1, createdAt: -1 });

module.exports = mongoose.model('ThreatEvent', threatEventSchema);
