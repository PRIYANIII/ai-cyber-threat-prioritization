const mongoose = require('mongoose');
const Alert = require('../models/alert.model');
const Prediction = require('../models/prediction.model');
const ThreatEvent = require('../models/threat-event.model');
const { getRiskPrediction } = require('../services/ml-risk.service');

const RECOMMENDED_ACTIONS = {
  Low: 'Document the event and continue routine monitoring.',
  Medium: 'Validate the event, review affected assets, and schedule remediation.',
  High: 'Investigate promptly, contain affected assets where appropriate, and remediate exposed weaknesses.',
  Critical: 'Escalate immediately, begin incident response, and contain affected assets where appropriate.',
};

function buildAlertTitle(event, prediction) {
  return `${prediction.severity} priority threat: ${event.attackType} targeting ${event.targetAsset}`;
}

async function analyzeEvent(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid event ID' });

    const event = await ThreatEvent.findById(id);
    if (!event) return res.status(404).json({ message: 'Threat event not found' });

    // Repeat-analysis policy: return the existing demo analysis for this event.
    const existingPrediction = await Prediction.findOne({
      threatEvent: event._id,
      modelMode: 'Demo',
      modelVersion: 'demo-risk-rules-v1',
    }).sort({ createdAt: -1 });

    if (existingPrediction) {
      const existingAlert = await Alert.findOne({ threatEvent: event._id, prediction: existingPrediction._id });
      if (existingAlert) {
        return res.json({ event, prediction: existingPrediction, alert: existingAlert, reused: true });
      }
    }

    const risk = await getRiskPrediction(event);
    const prediction = await Prediction.create({
      threatEvent: event._id,
      riskScore: risk.riskScore,
      severity: risk.severity,
      priority: risk.priority,
      modelMode: risk.modelMode,
      modelVersion: risk.modelVersion,
    });

    try {
      const alert = await Alert.create({
        threatEvent: event._id,
        prediction: prediction._id,
        title: buildAlertTitle(event, prediction),
        severity: prediction.severity,
        priority: prediction.priority,
        recommendedAction: RECOMMENDED_ACTIONS[prediction.severity],
      });

      return res.status(201).json({ event, prediction, alert, reused: false, scoringMethod: risk.scoringMethod, explanation: risk.explanation });
    } catch (error) {
      await Prediction.deleteOne({ _id: prediction._id });
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

module.exports = { analyzeEvent };
