"""
Tool: get_playbook
Responsabilidade: Retornar playbook de resposta para um tipo de incidente e severidade.
Não consulta banco de dados — utiliza dados mockados para validar o fluxo.
"""
from typing import Any


TOOL_NAME = "get_playbook"
TOOL_DESCRIPTION = (
    "Retorna o playbook de resposta recomendado para um tipo de incidente e severidade. "
    "O playbook contém passos de mitigação, tempo estimado e prioridade."
)
TOOL_PARAMETERS = {
    "type": "object",
    "properties": {
        "tipo_incidente": {
            "type": "string",
            "description": "Tipo do incidente (ex: Forca Bruta, Malware, Phishing, Scanning)"
        },
        "severidade": {
            "type": "string",
            "description": "Severidade do incidente (critica, alta, media, baixa)"
        }
    },
    "required": ["tipo_incidente", "severidade"],
    "additionalProperties": False
}


# Dados mockados — mesmas informações do router playbooks.py
_PLAYBOOKS_MOCK = [
    {
        "id": "PB-001",
        "nome": "Resposta a Brute Force SSH",
        "tipo_incidente": "Forca Bruta",
        "severidade": "Critica",
        "tatica_mitre": "Acesso Inicial",
        "tecnica_mapeada": "T1110 - Brute Force",
        "confianca": 94,
        "tempo_estimado_min": 8,
        "passos_de_mitigacao": [
            "1. Isolar host afetado da rede corporativa",
            "2. Ativar MFA para todas as contas de servico",
            "3. Resetar senhas de contas administrativas",
            "4. Analisar logs de autenticacao (ultimas 48h)",
            "5. Verificar IAM para permissoes anomalas",
            "6. Implementar rate limiting no RDP"
        ],
        "isolamento_recomendado": True,
        "prioridade": "CRITICA"
    },
    {
        "id": "PB-002",
        "nome": "Resposta a Infeccao por Malware",
        "tipo_incidente": "Malware",
        "severidade": "Alta",
        "tatica_mitre": "Execucao",
        "tecnica_mapeada": "T1055 - Process Injection",
        "confianca": 91,
        "tempo_estimado_min": 12,
        "passos_de_mitigacao": [
            "1. Quarentena do arquivo suspeito",
            "2. Terminar processos maliciosos",
            "3. Executar scan completo com antivirus",
            "4. Analisar processos filhos e conexoes de rede",
            "5. Verificar persistencia (registry, startup)",
            "6. Restaurar maquina a snapshot anterior se disponivel"
        ],
        "isolamento_recomendado": True,
        "prioridade": "ALTA"
    },
    {
        "id": "PB-003",
        "nome": "Resposta a Phishing",
        "tipo_incidente": "Phishing",
        "severidade": "Alta",
        "tatica_mitre": "Entrega de Engenharia Social",
        "tecnica_mapeada": "T1566 - Phishing",
        "confianca": 96,
        "tempo_estimado_min": 10,
        "passos_de_mitigacao": [
            "1. Bloquear remetente no gateway de email",
            "2. Remover email do servidor SMTP",
            "3. Avisar usuarios de possivel comprometimento",
            "4. Forcar reset de senha para destinatarios",
            "5. Analisar links e anexos com sandbox",
            "6. Implementar DMARC/SPF/DKIM policies"
        ],
        "isolamento_recomendado": False,
        "prioridade": "ALTA"
    },
    {
        "id": "PB-004",
        "nome": "Resposta a Scanning / Reconhecimento",
        "tipo_incidente": "Scanning",
        "severidade": "Media",
        "tatica_mitre": "Reconhecimento",
        "tecnica_mapeada": "T1046 - Network Service Discovery",
        "confianca": 88,
        "tempo_estimado_min": 6,
        "passos_de_mitigacao": [
            "1. Bloquear IP na firewall",
            "2. Revisar portas abertas desnecessariamente",
            "3. Implementar port filtering rules",
            "4. Ativar IDS/IPS para deteccao de varredura",
            "5. Monitorar atividades suspeitas da origem",
            "6. Considerar honeypots para rastreamento"
        ],
        "isolamento_recomendado": False,
        "prioridade": "MEDIA"
    },
    {
        "id": "PB-005",
        "nome": "Resposta a SQL Injection",
        "tipo_incidente": "Acesso Nao Autorizado",
        "severidade": "Alta",
        "tatica_mitre": "Exploracao de Seguranca da Aplicacao",
        "tecnica_mapeada": "T1190 - Exploit Public-Facing Application",
        "confianca": 92,
        "tempo_estimado_min": 15,
        "passos_de_mitigacao": [
            "1. Bloquear IP atacante na WAF",
            "2. Revisar aplicacao para vulnerabilidades SQL Injection",
            "3. Implementar prepared statements",
            "4. Auditar logs de aplicacao (ultimas 72h)",
            "5. Verificar integridade do banco de dados",
            "6. Ativar CORS mais restritivo e rate limiting"
        ],
        "isolamento_recomendado": False,
        "prioridade": "ALTA"
    }
]


# Mapeamento de variações de tipo de incidente para o valor canônico
_MAPA_TIPO_INCIDENTE = {
    "forca bruta": "Forca Bruta",
    "força bruta": "Forca Bruta",
    "brute force": "Forca Bruta",
    "malware": "Malware",
    "phishing": "Phishing",
    "acesso nao autorizado": "Acesso Nao Autorizado",
    "acesso não autorizado": "Acesso Nao Autorizado",
    "ddos": "DDoS",
    "scanning": "Scanning",
    "reconhecimento": "Scanning",
    "port scan": "Scanning",
    "insider threat": "Insider Threat",
}


def _normalizar_tipo(valor: str) -> str:
    """Normaliza variações de tipo de incidente para o valor canônico do mock."""
    chave = valor.strip().lower()
    return _MAPA_TIPO_INCIDENTE.get(chave, valor.strip())


def execute(tipo_incidente: str, severidade: str) -> dict[str, Any]:
    """
    Retorna o playbook de resposta recomendado.

    Args:
        tipo_incidente: Tipo do incidente.
        severidade: Severidade do incidente.

    Returns:
        Dicionário com:
            - encontrado: bool
            - playbook: dict | None
    """
    if not tipo_incidente or not severidade:
        return {
            "encontrado": False,
            "playbook": None,
            "observacao": "Parâmetros tipo_incidente e severidade são obrigatórios."
        }

    tipo_normalizado = _normalizar_tipo(tipo_incidente)
    severidade_normalizada = severidade.strip().lower()

    for pb in _PLAYBOOKS_MOCK:
        pb_tipo = pb.get("tipo_incidente", "").strip().lower()
        pb_sev = pb.get("severidade", "").strip().lower()

        if pb_tipo == tipo_normalizado.strip().lower() and pb_sev == severidade_normalizada:
            return {
                "encontrado": True,
                "playbook": {
                    "id": pb["id"],
                    "nome": pb["nome"],
                    "tipo_incidente": pb.get("tipo_incidente"),
                    "severidade": pb.get("severidade"),
                    "tatica_mitre": pb.get("tatica_mitre"),
                    "tecnica_mapeada": pb.get("tecnica_mapeada"),
                    "confianca": pb.get("confianca"),
                    "tempo_estimado_min": pb.get("tempo_estimado_min"),
                    "passos_de_mitigacao": pb.get("passos_de_mitigacao", []),
                    "isolamento_recomendado": pb.get("isolamento_recomendado", False),
                    "prioridade": pb.get("prioridade")
                }
            }

    # Se não encontrou correspondência exata, tenta matching apenas por tipo
    for pb in _PLAYBOOKS_MOCK:
        pb_tipo = pb.get("tipo_incidente", "").strip().lower()
        if pb_tipo == tipo_normalizado.strip().lower():
            return {
                "encontrado": True,
                "playbook": {
                    "id": pb["id"],
                    "nome": pb["nome"],
                    "tipo_incidente": pb.get("tipo_incidente"),
                    "severidade": pb.get("severidade"),
                    "tatica_mitre": pb.get("tatica_mitre"),
                    "tecnica_mapeada": pb.get("tecnica_mapeada"),
                    "confianca": pb.get("confianca"),
                    "tempo_estimado_min": pb.get("tempo_estimado_min"),
                    "passos_de_mitigacao": pb.get("passos_de_mitigacao", []),
                    "isolamento_recomendado": pb.get("isolamento_recomendado", False),
                    "prioridade": pb.get("prioridade")
                },
                "observacao": f"Playbook encontrado para o tipo '{tipo_incidente}', mas com severidade diferente da solicitada."
            }

    return {
        "encontrado": False,
        "playbook": None,
        "observacao": f"Nenhum playbook encontrado para tipo '{tipo_incidente}' e severidade '{severidade}'."
    }