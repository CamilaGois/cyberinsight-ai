from fastapi import APIRouter

router = APIRouter(
    prefix="/api/incidents",
    tags=["Incidents"]
)


@router.get("/")
def list_incidents():
    return [
        {
            "id": 1,
            "title": "Tentativa de brute force detectada",
            "severity": "Crítica",
            "status": "Em investigação",
            "source": "192.168.1.45"
        },
        {
            "id": 2,
            "title": "Malware detectado",
            "severity": "Alta",
            "status": "Em análise",
            "source": "10.0.0.23"
        },
        {
            "id": 3,
            "title": "Port Scan",
            "severity": "Média",
            "status": "Resolvido",
            "source": "172.16.0.10"
        }
    ]