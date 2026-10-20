from fastapi import FastAPI

from app.routes.health import router as health_router
from app.routes.risk import router as risk_router

app = FastAPI(title="Cyber Threat ML Service")
app.include_router(health_router)
app.include_router(risk_router)
