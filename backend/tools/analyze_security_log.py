"""
Tool: analyze_security_log
Responsabilidade: Receber log bruto e extrair eventos normalizados.
Não consulta banco de dados — opera apenas no texto recebido.
"""
import re
from typing import Any


TOOL_NAME = "analyze_security_log"
TOOL_DESCRIPTION = (
    "Analisa um log de segurança bruto e extrai eventos normalizados "
    "(timestamp, origem, destino, tipo de evento, usuário, ação). "
    "Retorna contagem de eventos processados e lista de eventos extraídos."
)
TOOL_PARAMETERS = {
    "type": "object",
    "properties": {
        "log_raw": {
            "type": "string",
            "description": "Log de segurança bruto para análise"
        }
    },
    "required": ["log_raw"],
    "additionalProperties": False
}


def execute(log_raw: str) -> dict[str, Any]:
    """
    Parseia o log bruto e retorna eventos normalizados.

    Args:
        log_raw: Texto bruto do log de segurança.

    Returns:
        Dicionário com:
            - eventos_processados: int
            - eventos_extraidos: list[dict]
            - alertas_gerados: int
            - event_criticos: int
    """
    if not log_raw or not log_raw.strip():
        return {
            "eventos_processados": 0,
            "eventos_extraidos": [],
            "alertas_gerados": 0,
            "eventos_criticos": 0,
            "observacao": "Nenhum log fornecido para análise."
        }

    linhas = log_raw.strip().split("\n")
    eventos = []

    # Padrões comuns de logs de segurança
    padroes = [
        # SSH Failed password
        re.compile(
            r"(?P<timestamp>\w+\s+\d+\s+\d{2}:\d{2}:\d{2})"
            r".*sshd\[\d+\]:\s+Failed password for"
            r"\s+(?P<usuario>\S+)"
            r"\s+from\s+(?P<origem>\S+)"
            r"\s+port\s+\d+\s+ssh2"
        ),
        # SSH Accepted password
        re.compile(
            r"(?P<timestamp>\w+\s+\d+\s+\d{2}:\d{2}:\d{2})"
            r".*sshd\[\d+\]:\s+Accepted password for"
            r"\s+(?P<usuario>\S+)"
            r"\s+from\s+(?P<origem>\S+)"
            r"\s+port\s+\d+\s+ssh2"
        ),
        # Firewall / connection attempt
        re.compile(
            r"(?P<timestamp>\w+\s+\d+\s+\d{2}:\d{2}:\d{2})"
            r".*?(?:DROP|BLOCK|REJECT)"
            r".*?SRC=(?P<origem>\S+)"
            r".*?DST=(?P<destino>\S+)"
            r".*?DPT=(?P<porta>\d+)"
        ),
        # Generic syslog pattern
        re.compile(
            r"(?P<timestamp>\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2})"
            r".*?(?P<origem>\d+\.\d+\.\d+\.\d+)"
        ),
    ]

    for linha in linhas:
        linha = linha.strip()
        if not linha:
            continue

        evento = {
            "timestamp": None,
            "origem": None,
            "destino": None,
            "tipo_evento": "desconhecido",
            "usuario": None,
            "acao": None,
            "linha_original": linha[:200]  # truncado para segurança
        }

        for padrao in padroes:
            match = padrao.search(linha)
            if match:
                grupos = match.groupdict()
                evento["timestamp"] = grupos.get("timestamp")
                evento["origem"] = grupos.get("origem")
                evento["destino"] = grupos.get("destino")
                evento["usuario"] = grupos.get("usuario")

                if "Failed password" in linha:
                    evento["tipo_evento"] = "falha_autenticacao"
                    evento["acao"] = "tentativa_de_acesso_negada"
                elif "Accepted password" in linha:
                    evento["tipo_evento"] = "autenticacao_sucesso"
                    evento["acao"] = "acesso_autorizado"
                elif "DROP" in linha or "BLOCK" in linha or "REJECT" in linha:
                    evento["tipo_evento"] = "bloqueio_firewall"
                    evento["acao"] = "conexao_bloqueada"
                else:
                    evento["tipo_evento"] = "evento_sistema"
                    evento["acao"] = "registro_sistema"

                break

        eventos.append(evento)

    # Contagem de tipos
    total_criticos = sum(
        1 for e in eventos
        if e["tipo_evento"] in ("falha_autenticacao", "bloqueio_firewall")
    )

    return {
        "eventos_processados": len(eventos),
        "eventos_extraidos": eventos,
        "alertas_gerados": total_criticos,
        "eventos_criticos": total_criticos
    }