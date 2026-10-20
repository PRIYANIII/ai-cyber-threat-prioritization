const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    assetType: { type: String, trim: true },
    criticality: { type: Number, min: 0, max: 100 },
    owner: { type: String, trim: true },
  },
  { timestamps: true },
);

assetSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Asset', assetSchema);
