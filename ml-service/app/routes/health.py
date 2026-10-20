from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
async def health_check() -> dict[str, object]:
    return {
        "status": "ok",
        "service": "cyber-threat-ml-service",
        "attackDetectionModelLoaded": False,
        "riskScoringMode": "demo_rule_based",
    }
