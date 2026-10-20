from fastapi import APIRouter, HTTPException, status

from app.models.risk import AttackPredictionRequest, RiskPredictionRequest
from app.services.risk_scoring import score_risk

router = APIRouter(prefix="/predict", tags=["prediction"])


@router.post("/risk")
async def predict_risk(payload: RiskPredictionRequest) -> dict[str, object]:
    return score_risk(payload)


@router.post("/attack")
async def predict_attack(payload: AttackPredictionRequest) -> None:
    # The validated schema deliberately accepts only future network-flow fields.
    _ = payload
    raise HTTPException(
        status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
        detail={
            "code": "attack_detection_model_not_trained",
            "message": "Attack detection is unavailable until CIC-IDS2017 model training is completed.",
            "expectedInput": "CIC-IDS2017 network-flow features",
        },
    )
