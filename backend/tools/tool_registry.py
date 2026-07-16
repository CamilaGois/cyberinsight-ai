"""
Tool Registry
Responsabilidade: Centralizar o registro de todas as tools do SOC Agent,
fornecendo:
1. Lista formatada para OpenAI Tool Calling (JSON Schema)
2. Dispatch de execução por nome da tool
"""
from typing import Any, Callable

from tools import analyze_security_log
from tools import search_iocs
from tools import search_incident_history
from tools import get_playbook


# Registro de tools: nome → { "definicao": dict, "funcao": Callable }
_TOOL_REGISTRY: dict[str, dict[str, Any]] = {
    analyze_security_log.TOOL_NAME: {
        "definicao": {
            "type": "function",
            "function": {
                "name": analyze_security_log.TOOL_NAME,
                "description": analyze_security_log.TOOL_DESCRIPTION,
                "strict": True,
                "parameters": analyze_security_log.TOOL_PARAMETERS,
            }
        },
        "funcao": analyze_security_log.execute,
    },
    search_iocs.TOOL_NAME: {
        "definicao": {
            "type": "function",
            "function": {
                "name": search_iocs.TOOL_NAME,
                "description": search_iocs.TOOL_DESCRIPTION,
                "strict": True,
                "parameters": search_iocs.TOOL_PARAMETERS,
            }
        },
        "funcao": search_iocs.execute,
    },
    search_incident_history.TOOL_NAME: {
        "definicao": {
            "type": "function",
            "function": {
                "name": search_incident_history.TOOL_NAME,
                "description": search_incident_history.TOOL_DESCRIPTION,
                "strict": True,
                "parameters": search_incident_history.TOOL_PARAMETERS,
            }
        },
        "funcao": search_incident_history.execute,
    },
    get_playbook.TOOL_NAME: {
        "definicao": {
            "type": "function",
            "function": {
                "name": get_playbook.TOOL_NAME,
                "description": get_playbook.TOOL_DESCRIPTION,
                "strict": True,
                "parameters": get_playbook.TOOL_PARAMETERS,
            }
        },
        "funcao": get_playbook.execute,
    },
}


def get_openai_tools() -> list[dict[str, Any]]:
    """
    Retorna a lista de definições de tools no formato
    esperado pelo SDK da OpenAI (Tool Calling).
    """
    return [
        entry["definicao"]
        for entry in _TOOL_REGISTRY.values()
    ]


def get_tool_names() -> list[str]:
    """Retorna os nomes de todas as tools registradas."""
    return list(_TOOL_REGISTRY.keys())


def execute_tool(name: str, arguments: dict[str, Any]) -> dict[str, Any]:
    """
    Executa a tool pelo nome, passando os argumentos fornecidos.

    Args:
        name: Nome da tool a ser executada.
        arguments: Dicionário com os argumentos da tool.

    Returns:
        Resultado da execução da tool.

    Raises:
        ValueError: Se a tool não estiver registrada.
    """
    entry = _TOOL_REGISTRY.get(name)
    if not entry:
        raise ValueError(
            f"Tool '{name}' não encontrada. "
            f"Tools disponíveis: {', '.join(get_tool_names())}"
        )

    funcao: Callable = entry["funcao"]
    return funcao(**arguments)