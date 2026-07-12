from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import incidents, logs, playbooks, iocs

app = FastAPI(
    title="CyberInsight AI API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(incidents.router)
app.include_router(logs.router)
app.include_router(playbooks.router)
app.include_router(iocs.router)


@app.get("/")
def root():
    return {
        "status": "online",
        "message": "CyberInsight AI API Backend funcionando!"
    }