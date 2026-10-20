# Cyber Threat ML Service

FastAPI service for the threat-prioritization workflow. XGBoost is listed as a future dependency, but no XGBoost model is trained or loaded in this step.

`POST /predict/risk` is a transparent **demo heuristic**, not an ML prediction. It weights the attack-type baseline and seven 0–100 business-risk features as follows: event frequency 0.12, asset criticality 0.20, vulnerability context 0.13, source reputation 0.10, historical occurrence 0.08, potential impact 0.22, affected scope 0.10, and attack-type baseline 0.05. The weights total 1.0.

The final rounded score maps to Low/P4 for 0–20, Medium/P3 for 21–40, High/P2 for 41–70, and Critical/P1 for 71–100.

`POST /predict/attack` accepts a separate future CIC-IDS2017 network-flow contract and returns HTTP 503 until a trained attack-detection artifact is integrated. Business-risk fields are intentionally not used for attack detection.

Run locally:

```bash
python -m venv .venv
.venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
```

Check `GET http://localhost:8001/health`.
