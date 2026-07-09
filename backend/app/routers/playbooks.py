from fastapi import APIRouter

router = APIRouter(
    prefix="/api/playbooks",
    tags=["Playbooks"]
)


@router.get("/")
def list_playbooks():
    return [
        {
            "id": 1,
            "name": "Brute Force",
            "mitre": "T1110",
            "severity": "Crítica",
            "confidence": 94,
            "estimated_time": "8 min"
        },
        {
            "id": 2,
            "name": "Malware",
            "mitre": "T1055",
            "severity": "Alta",
            "confidence": 91,
            "estimated_time": "12 min"
        },
        {
            "id": 3,
            "name": "Phishing",
            "mitre": "T1566",
            "severity": "Alta",
            "confidence": 96,
            "estimated_time": "10 min"
        },
        {
            "id": 4,
            "name": "Port Scan",
            "mitre": "T1046",
            "severity": "Média",
            "confidence": 88,
            "estimated_time": "6 min"
        }
    ]