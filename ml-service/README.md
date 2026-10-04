# Cyber Threat ML Service

FastAPI foundation for the future threat-prioritization ML service. XGBoost is listed as a future dependency but no model logic is implemented in Step 1.

Run locally:

```bash
python -m venv .venv
.venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Check `GET http://localhost:8000/health`.
