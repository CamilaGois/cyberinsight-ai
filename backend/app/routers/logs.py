from fastapi import APIRouter

router = APIRouter(
    prefix="/api/logs",
    tags=["Logs"]
)


@router.post("/import")
def import_logs():
    return {
        "status": "success",
        "eventos": 153,
        "alertas": 27,
        "criticos": 8,
        "severidade_predominante": "Alta",
        "arquivo": "simulado.log",
        "ia_real": False
    }