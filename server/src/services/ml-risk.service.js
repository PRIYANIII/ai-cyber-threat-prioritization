const VALID_SEVERITIES = ['Low', 'Medium', 'High', 'Critical'];
const VALID_PRIORITIES = ['P1', 'P2', 'P3', 'P4'];

class RiskServiceError extends Error {
  constructor(message, status = 502) {
    super(message);
    this.name = 'RiskServiceError';
    this.status = status;
  }
}

function validateRiskResponse(data) {
  if (!data || typeof data !== 'object'
    || typeof data.riskScore !== 'number' || data.riskScore < 0 || data.riskScore > 100
    || !VALID_SEVERITIES.includes(data.severity) || !VALID_PRIORITIES.includes(data.priority)
    || data.modelMode !== 'Demo' || data.modelVersion !== 'demo-risk-rules-v1'
    || data.scoringMethod !== 'weighted_rule_based' || typeof data.explanation !== 'string') {
    throw new RiskServiceError('ML service returned an invalid risk-scoring response.');
  }
}

async function getRiskPrediction(event) {
  const baseUrl = process.env.ML_SERVICE_URL;
  if (!baseUrl) throw new RiskServiceError('ML_SERVICE_URL is not configured.', 503);

  const payload = {
    attackType: event.attackType,
    eventFrequency: event.eventFrequency,
    assetCriticality: event.assetCriticality,
    vulnerabilityContext: event.vulnerabilityContext,
    sourceReputation: event.sourceReputation,
    historicalOccurrence: event.historicalOccurrence,
    potentialImpact: event.potentialImpact,
    affectedScope: event.affectedScope,
  };

  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, '')}/predict/risk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      throw new RiskServiceError(`ML risk service responded with status ${response.status}.`, 502);
    }

    const data = await response.json();
    validateRiskResponse(data);
    return data;
  } catch (error) {
    if (error instanceof RiskServiceError) throw error;
    if (error.name === 'AbortError' || error.name === 'TimeoutError') {
      throw new RiskServiceError('ML risk service timed out.', 504);
    }
    throw new RiskServiceError('ML risk service is unavailable.', 503);
  }
}

module.exports = { getRiskPrediction, RiskServiceError };
