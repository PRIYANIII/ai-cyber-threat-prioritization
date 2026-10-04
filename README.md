# AI-Powered Cyber Threat Intelligence & Threat Prioritization

Step 1 establishes the independent frontend, backend, and ML-service foundations for a cyber threat intelligence and threat prioritization platform.

This is **not** primarily a Network Intrusion Detection System. It is not a packet classifier or a PCAP-based NIDS. The final system will organize threat intelligence and prioritize threats for action.

## Architecture

```text
React
  ↓
Node.js + Express
  ↓
MongoDB

Node.js
  ↓
Python FastAPI
  ↓
XGBoost
```

MongoDB and XGBoost are planned for later phases and are not connected in this foundation.

## Planned threat-prioritization flow

```text
Threat/Event Data
  → Threat Analysis
  → Feature Engineering
  → XGBoost
  → Risk Score
  → Severity
  → Priority
  → Alert
  → Dashboard
```

## Services

- `client`: React, Vite, Tailwind CSS user interface.
- `server`: Node.js and Express API. Health endpoint: `GET /api/health`.
- `ml-service`: Python FastAPI service. Health endpoint: `GET /health`.

## Getting started

Install the frontend dependencies:

```bash
cd client
npm install
```

Install the backend dependencies:

```bash
cd server
npm install
```

Create a Python virtual environment and install the ML-service dependencies:

```bash
cd ml-service
python -m venv .venv
# Windows PowerShell
.venv\\Scripts\\Activate.ps1
pip install -r requirements.txt
```

Start the services in separate terminals:

```bash
# client
cd client
npm run dev

# server
cd server
npm run dev

# ml-service
cd ml-service
uvicorn app.main:app --reload
```

The local URLs are `http://localhost:5173`, `http://localhost:5000/api/health`, and `http://localhost:8000/health`.

Copy `.env.example` to `.env` when environment configuration is needed; do not commit secrets.
