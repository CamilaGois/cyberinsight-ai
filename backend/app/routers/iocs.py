from fastapi import APIRouter
from datetime import datetime, timedelta

router = APIRouter(
    prefix="/api/iocs",
    tags=["IoCs"]
)


@router.get("/")
def list_iocs():
    now = datetime.utcnow()
    return [
        {
            "id": 1,
            "tipo": "IPv4",
            "valor": "203.0.113.45",
            "severidade": "Crítica",
            "classificacao": "Botnet Command & Control",
            "primeira_deteccao": (now - timedelta(days=7)).isoformat() + "Z",
            "ultima_atividade": (now - timedelta(hours=2)).isoformat() + "Z",
            "geoloc": "RU",
            "confianca": 98,
            "fonte": "OSINT Feed",
            "relacionados": 3
        },
        {
            "id": 2,
            "tipo": "Hash MD5",
            "valor": "d41d8cd98f00b204e9800998ecf8427e",
            "severidade": "Alta",
            "classificacao": "Trojan.Win32.Generic",
            "primeira_deteccao": (now - timedelta(days=2)).isoformat() + "Z",
            "ultima_atividade": (now - timedelta(hours=12)).isoformat() + "Z",
            "geoloc": "Unknown",
            "confianca": 92,
            "fonte": "VirusTotal",
            "relacionados": 1
        },
        {
            "id": 3,
            "tipo": "Domínio",
            "valor": "malicious-domain.xyz",
            "severidade": "Crítica",
            "classificacao": "Phishing Infrastructure",
            "primeira_deteccao": (now - timedelta(days=14)).isoformat() + "Z",
            "ultima_atividade": (now - timedelta(minutes=30)).isoformat() + "Z",
            "geoloc": "NL",
            "confianca": 99,
            "fonte": "DNS Sinkhole",
            "relacionados": 5
        },
        {
            "id": 4,
            "tipo": "IPv4",
            "valor": "192.0.2.123",
            "severidade": "Média",
            "classificacao": "Proxy/VPN",
            "primeira_deteccao": (now - timedelta(days=30)).isoformat() + "Z",
            "ultima_atividade": (now - timedelta(days=1)).isoformat() + "Z",
            "geoloc": "US",
            "confianca": 85,
            "fonte": "OSINT Feed",
            "relacionados": 2
        },
        {
            "id": 5,
            "tipo": "Hash SHA256",
            "valor": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
            "severidade": "Alta",
            "classificacao": "Ransomware.LockBit",
            "primeira_deteccao": (now - timedelta(days=5)).isoformat() + "Z",
            "ultima_atividade": (now - timedelta(hours=4)).isoformat() + "Z",
            "geoloc": "Unknown",
            "confianca": 96,
            "fonte": "ThreatIntel API",
            "relacionados": 4
        },
        {
            "id": 6,
            "tipo": "Domínio",
            "valor": "exfil-data-server.ru",
            "severidade": "Alta",
            "classificacao": "Data Exfiltration",
            "primeira_deteccao": (now - timedelta(days=3)).isoformat() + "Z",
            "ultima_atividade": (now - timedelta(minutes=15)).isoformat() + "Z",
            "geoloc": "RU",
            "confianca": 94,
            "fonte": "Network Monitoring",
            "relacionados": 3
        },
        {
            "id": 7,
            "tipo": "Email",
            "valor": "attacker@compromised-email.com",
            "severidade": "Média",
            "classificacao": "Phishing Campaign",
            "primeira_deteccao": (now - timedelta(days=10)).isoformat() + "Z",
            "ultima_atividade": (now - timedelta(days=2)).isoformat() + "Z",
            "geoloc": "Unknown",
            "confianca": 88,
            "fonte": "Email Gateway",
            "relacionados": 2
        },
        {
            "id": 8,
            "tipo": "URL",
            "valor": "http://malicious-domain.xyz/payload.exe",
            "severidade": "Crítica",
            "classificacao": "Malware Distribution",
            "primeira_deteccao": (now - timedelta(days=1)).isoformat() + "Z",
            "ultima_atividade": (now - timedelta(hours=1)).isoformat() + "Z",
            "geoloc": "NL",
            "confianca": 97,
            "fonte": "URLhaus",
            "relacionados": 6
        },
    ]
