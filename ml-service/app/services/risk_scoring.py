from app.models.risk import RiskPredictionRequest

# Transparent demo heuristic. The eight weighted inputs include an attack-type
# baseline plus the seven submitted 0-100 business-risk features. This is not ML.
WEIGHTS = {
    "attackTypeBaseline": 0.05,
    "eventFrequency": 0.12,
    "assetCriticality": 0.20,
    "vulnerabilityContext": 0.13,
    "sourceReputation": 0.10,
    "historicalOccurrence": 0.08,
    "potentialImpact": 0.22,
    "affectedScope": 0.10,
}

ATTACK_TYPE_BASELINES = {
    "Ransomware": 90,
    "Malware": 75,
    "SQL Injection": 70,
    "Other": 50,
}


def get_severity_and_priority(score: int) -> tuple[str, str]:
    if score <= 20:
        return "Low", "P4"
    if score <= 40:
        return "Medium", "P3"
    if score <= 70:
        return "High", "P2"
    return "Critical", "P1"


def score_risk(request: RiskPredictionRequest) -> dict[str, object]:
    values = request.model_dump()
    values["attackTypeBaseline"] = ATTACK_TYPE_BASELINES.get(request.attackType, 50)
    contributions = {name: values[name] * weight for name, weight in WEIGHTS.items()}
    raw_score = sum(contributions.values())
    risk_score = min(100, max(0, int(raw_score + 0.5)))
    severity, priority = get_severity_and_priority(risk_score)

    main_factors = sorted(contributions.items(), key=lambda item: item[1], reverse=True)[:3]
    explanation = "Main contributors: " + ", ".join(
        f"{name} ({values[name]:.0f}/100)" for name, _ in main_factors
    )

    return {
        "riskScore": risk_score,
        "severity": severity,
        "priority": priority,
        "modelMode": "Demo",
        "modelVersion": "demo-risk-rules-v1",
        "scoringMethod": "weighted_rule_based",
        "explanation": explanation,
    }
