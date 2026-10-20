from typing import Literal

from pydantic import BaseModel, Field


class RiskPredictionRequest(BaseModel):
    """Business-risk features only; these are not network-flow features."""

    attackType: str = Field(min_length=1, max_length=100)
    eventFrequency: float = Field(ge=0, le=100)
    assetCriticality: float = Field(ge=0, le=100)
    vulnerabilityContext: float = Field(ge=0, le=100)
    sourceReputation: float = Field(ge=0, le=100)
    historicalOccurrence: float = Field(ge=0, le=100)
    potentialImpact: float = Field(ge=0, le=100)
    affectedScope: float = Field(ge=0, le=100)


class AttackPredictionRequest(BaseModel):
    """Reserved for future CIC-IDS2017 network-flow features, not business-risk fields."""

    flowSchema: Literal["CIC-IDS2017"]
    flowFeatures: dict[str, float] = Field(min_length=1)
