"""
Tool: search_incident_history
Responsabilidade: Buscar incidentes similares no histórico por classificação e severidade.
Não consulta banco de dados — utiliza dados mockados para validar o fluxo.
"""
from typing import Any


TOOL_NAME = "search_incident_history"
TOOL_DESCRIPTION = (
    "Busca incidentes similares no histórico com base na classificação e severidade "
    "do evento analisado. Retorna lista de incidentes encontrados ou lista vazia."
)
TOOL_PARAMETERS = {
    "type": "object",
    "properties": {
        "classificacao": {
            "type": "string",
            "description": "Classificação do incidente (ex: Forca Bruta, Malware, Phishing)"
        },
        "severidade": {
            "type": "string",
            "description": "Severidade do incidente (critica, alta, media, baixa)"
        }
    },
    "required": ["classificacao", "severidade"],
    "additionalProperties": False
}


# Dados mockados — mesmas informações do router incidents.py
_INCIDENTS_MOCK = [
    {
        "id": 1,
        "titulo": "Brute Force Detectado - RDP",
        "severidade": "Critica",
        "status": "Investigando",
        "host_afetado": "SRV-PROD-01.corp.local",
        "ip_origem": "203.0.113.45",
        "tentativas": 847,
        "usuario_alvo": "Administrator",
        "porta": 3389,
        "classificacao": "Forca Bruta"
    },
    {
        "id": 2,
        "titulo": "Malware Detectado - Trojan.Win32.Generic",
        "severidade": "Alta",
        "status": "Triagem",
        "host_afetado": "DESKTOP-USR-24.corp.local",
        "ip_origem": "198.51.100.89",
        "hash_md5": "d41d8cd98f00b204e9800998ecf8427e",
        "nome_arquivo": "document_2024.exe",
        "quarentenado": True,
        "classificacao": "Malware"
    },
    {
        "id": 3,
        "titulo": "Port Scan - Reconhecimento de Rede",
        "severidade": "Media",
        "status": "Triagem",
        "host_afetado": "FIREWALL-PRINCIPAL",
        "ip_origem": "192.0.2.123",
        "portas_escaneadas": [22, 80, 443, 3306, 5432],
        "total_conexoes": 1240,
        "geoloc": "CN",
        "classificacao": "Scanning"
    },
    {
        "id": 4,
        "titulo": "Comportamento Anomalo - Acesso Fora do Horario",
        "severidade": "Media",
        "status": "Resolvido",
        "host_afetado": "MAIL-SERVER.corp.local",
        "ip_origem": "10.0.1.150",
        "usuario": "gerente_ti",
        "dados_transferidos_mb": 2450,
        "classificacao": "Insider Threat"
    },
    {
        "id": 5,
        "titulo": "SQL Injection Attempt - Web Application",
        "severidade": "Alta",
        "status": "Investigando",
        "host_afetado": "WEB-APP-PROD.corp.local",
        "ip_origem": "198.51.100.200",
        "url_alvo": "/api/users/search?id=1' OR '1'='1",
        "metodo_http": "GET",
        "bloqueado": True,
        "classificacao": "Acesso Nao Autorizado"
    }
]


# Mapeamento de variações de classificação para o valor canônico
_MAPA_CLASSIFICACAO = {
    "forca bruta": "Forca Bruta",
    "força bruta": "Forca Bruta",
    "brute force": "Forca Bruta",
    "malware": "Malware",
    "phishing": "Phishing",
    "acesso nao autorizado": "Acesso Nao Autorizado",
    "acesso não autorizado": "Acesso Nao Autorizado",
    "ddos": "DDoS",
    "scanning": "Scanning",
    "insider threat": "Insider Threat",
    "reconhecimento": "Scanning",
    "port scan": "Scanning",
}


def _normalizar_classificacao(valor: str) -> str:
    """Normaliza variações de classificação para o valor canônico do mock."""
    chave = valor.strip().lower()
    return _MAPA_CLASSIFICACAO.get(chave, valor.strip())


def execute(classificacao: str, severidade: str) -> dict[str, Any]:
    """
    Busca incidentes similares no histórico.

    Args:
        classificacao: Classificação do incidente.
        severidade: Severidade do incidente.

    Returns:
        Dicionário com:
            - total_encontrados: int
            - incidentes: list[dict]
    """
    if not classificacao or not severidade:
        return {
            "total_encontrados": 0,
            "incidentes": [],
            "observacao": "Parâmetros classificacao e severidade são obrigatórios."
        }

    classificacao_normalizada = _normalizar_classificacao(classificacao)
    severidade_normalizada = severidade.strip().lower()

    resultados = []

    for inc in _INCIDENTS_MOCK:
        # Verifica correspondência de classificação (case-insensitive)
        inc_class = inc.get("classificacao", "").strip().lower()
        if inc_class != classificacao_normalizada.strip().lower():
            continue

        # Verifica correspondência de severidade (case-insensitive)
        inc_sev = inc.get("severidade", "").strip().lower()
        if inc_sev != severidade_normalizada:
            continue

        # Calcula similaridade com base nos campos coincidentes
        similaridade = "media"
        if inc.get("ip_origem") or inc.get("usuario_alvo"):
            similaridade = "alta"

        resultados.append({
            "id": inc["id"],
            "titulo": inc["titulo"],
            "similaridade": similaridade,
            "severidade": inc.get("severidade", "N/A"),
            "status": inc.get("status", "N/A"),
            "host_afetado": inc.get("host_afetado", "N/A"),
            "ip_origem": inc.get("ip_origem", "N/A")
        })

    return {
        "total_encontrados": len(resultados),
        "incidentes": resultados
    }