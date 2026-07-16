"""
Tool: search_iocs
Responsabilidade: Buscar Indicadores de Comprometimento (IoCs) por tipo e valor.
Não consulta banco de dados — utiliza dados mockados para validar o fluxo.
"""
from typing import Any


TOOL_NAME = "search_iocs"
TOOL_DESCRIPTION = (
    "Busca Indicadores de Comprometimento (IoCs) na base de conhecimento "
    "por tipo (ip, dominio, hash, url) e valor. "
    "Retorna lista de IoCs encontrados ou lista vazia se não houver correspondência."
)
TOOL_PARAMETERS = {
    "type": "object",
    "properties": {
        "tipo": {
            "type": "string",
            "enum": ["ip", "dominio", "hash", "url"],
            "description": "Tipo do IoC a ser buscado"
        },
        "valor": {
            "type": "string",
            "description": "Valor do IoC a ser buscado (ex: IP, domínio, hash ou URL)"
        }
    },
    "required": ["tipo", "valor"],
    "additionalProperties": False
}


# Dados mockados — mesmas informações dos routers existentes
_IOCS_MOCK = [
    {"tipo": "ip", "valor": "203.0.113.45", "severidade": "Critica", "classificacao": "Botnet Command & Control", "confianca": 98, "geoloc": "RU", "fonte": "OSINT Feed"},
    {"tipo": "hash", "valor": "d41d8cd98f00b204e9800998ecf8427e", "severidade": "Alta", "classificacao": "Trojan.Win32.Generic", "confianca": 92, "fonte": "VirusTotal"},
    {"tipo": "dominio", "valor": "malicious-domain.xyz", "severidade": "Critica", "classificacao": "Phishing Infrastructure", "confianca": 99, "geoloc": "NL", "fonte": "DNS Sinkhole"},
    {"tipo": "ip", "valor": "192.0.2.123", "severidade": "Media", "classificacao": "Proxy/VPN", "confianca": 85, "geoloc": "US", "fonte": "OSINT Feed"},
    {"tipo": "hash", "valor": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", "severidade": "Alta", "classificacao": "Ransomware.LockBit", "confianca": 96, "fonte": "ThreatIntel API"},
    {"tipo": "dominio", "valor": "exfil-data-server.ru", "severidade": "Alta", "classificacao": "Data Exfiltration", "confianca": 94, "geoloc": "RU", "fonte": "Network Monitoring"},
    {"tipo": "url", "valor": "http://malicious-domain.xyz/payload.exe", "severidade": "Critica", "classificacao": "Malware Distribution", "confianca": 97, "geoloc": "NL", "fonte": "URLhaus"},
]


def execute(tipo: str, valor: str) -> dict[str, Any]:
    """
    Busca IoCs por tipo e valor.

    Args:
        tipo: Tipo do IoC (ip, dominio, hash, url).
        valor: Valor a ser buscado.

    Returns:
        Dicionário com:
            - total_encontrados: int
            - iocs: list[dict]
    """
    if not tipo or not valor:
        return {
            "total_encontrados": 0,
            "iocs": [],
            "observacao": "Parâmetros tipo e valor são obrigatórios."
        }

    # Normaliza tipo para comparação
    tipo_normalizado = tipo.strip().lower()

    # Mapeamento de tipos do mock para os tipos da tool
    mapa_tipos = {
        "ip": ["ip", "ipv4", "ipv6"],
        "dominio": ["dominio", "domínio", "domain"],
        "hash": ["hash", "md5", "sha256", "sha1"],
        "url": ["url", "uri"],
    }

    tipos_equivalentes = mapa_tipos.get(tipo_normalizado, [tipo_normalizado])

    resultados = []
    valor_lower = valor.strip().lower()

    for ioc in _IOCS_MOCK:
        # Verifica se o tipo do mock corresponde ao tipo solicitado
        tipo_mock = ioc["tipo"].strip().lower()
        if tipo_mock not in tipos_equivalentes:
            continue

        # Verifica se o valor contém correspondência (parcial ou exata)
        valor_mock = ioc["valor"].strip().lower()
        if valor_lower in valor_mock or valor_mock in valor_lower:
            resultados.append({
                "tipo": ioc["tipo"],
                "valor": ioc["valor"],
                "severidade": ioc.get("severidade", "N/A"),
                "classificacao": ioc.get("classificacao", "N/A"),
                "confianca": ioc.get("confianca", 0),
                "geoloc": ioc.get("geoloc", "Unknown"),
                "fonte": ioc.get("fonte", "N/A")
            })

    return {
        "total_encontrados": len(resultados),
        "iocs": resultados
    }