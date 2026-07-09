from fastapi import FastAPI
from app.routers import incidents
from app.routers import logs
from app.routers import playbooks

app = FastAPI(
    title = "CyberInsight AI API",
    version = "1.0.0"
)

app.include_router(incidents.router)
app.include_router(logs.router)
app.include_router(playbooks.router)

@app.get("/")
def root():
    return {
        "status": "online",
        "message": "CyberInsight AI API Backend funcionando!"
    }

