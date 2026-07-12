from fastapi import APIRouter
from datetime import datetime, timedelta

router = APIRouter(
    prefix="/api/incidents",
    tags=["Incidents"]
)


@router.get("/")
def list_incidents():
    now = datetime.utcnow()
    return [
        {
            "id": 1,
            "titulo_alerta": "Brute Force Detectado - RDP",
            "severidade": "Crítica",
            "status": "Investigando",
            "host_afetado": "SRV-PROD-01.corp.local",
            "ip_origem": "203.0.113.45",
            "timestamp": (now - timedelta(minutes=15)).isoformat() + "Z",
            "tentativas": 847,
            "usuario_alvo": "Administrator",
            "porta": 3389
        },
        {
            "id": 2,
            "titulo_alerta": "Malware Detectado - Trojan.Win32.Generic",
            "severidade": "Alta",
            "status": "Triagem",
            "host_afetado": "DESKTOP-USR-24.corp.local",
            "ip_origem": "198.51.100.89",
            "timestamp": (now - timedelta(hours=2)).isoformat() + "Z",
            "hash_md5": "d41d8cd98f00b204e9800998ecf8427e",
            "nome_arquivo": "document_2024.exe",
            "quarentenado": True
        },
        {
            "id": 3,
            "titulo_alerta": "Port Scan - Reconhecimento de Rede",
            "severidade": "Média",
            "status": "Triagem",
            "host_afetado": "FIREWALL-PRINCIPAL",
            "ip_origem": "192.0.2.123",
            "timestamp": (now - timedelta(hours=6)).isoformat() + "Z",
            "portas_escaneadas": [22, 80, 443, 3306, 5432],
            "total_conexoes": 1240,
            "geoloc": "CN"
        },
        {
            "id": 4,
            "titulo_alerta": "Comportamento Anômalo - Acesso Fora do Horário",
            "severidade": "Média",
            "status": "Resolvido",
            "host_afetado": "MAIL-SERVER.corp.local",
            "ip_origem": "10.0.1.150",
            "timestamp": (now - timedelta(days=1)).isoformat() + "Z",
            "usuario": "gerente_ti",
            "dados_transferidos_mb": 2450
        },
        {
            "id": 5,
            "titulo_alerta": "SQL Injection Attempt - Web Application",
            "severidade": "Alta",
            "status": "Investigando",
            "host_afetado": "WEB-APP-PROD.corp.local",
            "ip_origem": "198.51.100.200",
            "timestamp": (now - timedelta(minutes=3)).isoformat() + "Z",
            "url_alvo": "/api/users/search?id=1' OR '1'='1",
            "metodo_http": "GET",
            "bloqueado": True
        }
    ]