"""
OpenAI Service
Responsabilidade única: encapsular toda comunicação com o SDK oficial da OpenAI.
Não contém lógica de negócio, Tool Calling ou regras do SOC Agent.
Preparado para futura substituição por Gemini, Ollama ou outros provedores.
"""
import logging
import os
from pathlib import Path
from typing import Any, Optional

import openai
from dotenv import load_dotenv
from openai import OpenAI
from pydantic import BaseModel

# Carrega variáveis do backend/.env usando caminho absoluto
_ENV_PATH = Path(__file__).resolve().parents[1] / ".env"
load_dotenv(dotenv_path=_ENV_PATH)

logger = logging.getLogger(__name__)


class OpenAIService:
    """
    Serviço de encapsulamento do SDK da OpenAI.

    Gerencia a configuração do cliente (API Key, modelo, temperatura,
    timeout) e expõe um método único para chat completion que aceita
    mensagens, tools (Tool Calling) e response_format (Structured Output).

    Atributos de classe (podem ser sobrescritos por variáveis de ambiente):
        DEFAULT_MODEL (str): Modelo padrão (OPENAI_MODEL ou "gpt-4o").
        DEFAULT_TEMPERATURE (float): Temperatura padrão (OPENAI_TEMPERATURE ou 0.1).
        DEFAULT_TIMEOUT (int): Timeout em segundos (OPENAI_TIMEOUT ou 60).

    Exemplo de uso:
        service = OpenAIService()
        response = service.chat_completion(
            messages=[
                {"role": "system", "content": "Você é um SOC Agent."},
                {"role": "user", "content": log_raw}
            ],
            tools=my_tools_list,
            response_format=IncidentAnalysis
        )
    """

    def __init__(
        self,
        api_key: Optional[str] = None,
        model: Optional[str] = None,
        temperature: Optional[float] = None,
        timeout: Optional[int] = None,
    ) -> None:
        """
        Inicializa o serviço da OpenAI.

        Args:
            api_key: Chave da API. Se None, lê de OPENAI_API_KEY.
            model: Modelo a ser usado. Se None, lê de OPENAI_MODEL ou usa "gpt-4o".
            temperature: Temperatura do modelo. Se None, lê de OPENAI_TEMPERATURE
                         ou usa 0.1.
            timeout: Timeout em segundos. Se None, lê de OPENAI_TIMEOUT ou usa 60.
        """
        self.api_key = api_key or os.getenv("OPENAI_API_KEY", "")
        if not self.api_key:
            raise RuntimeError(
                "OPENAI_API_KEY não encontrada. "
                "Verifique se a chave está definida em backend/.env"
            )

        self.model = (
            model
            or os.getenv("OPENAI_MODEL")
            or "gpt-4o-mini"
        )
        self.temperature = (
            temperature
            or _parse_float_env("OPENAI_TEMPERATURE", 0.1)
        )
        self.timeout = (
            timeout
            or _parse_int_env("OPENAI_TIMEOUT", 60)
        )

        self.client = OpenAI(
            api_key=self.api_key,
            timeout=self.timeout,
            max_retries=2,
        )

        logger.info(
            "OpenAIService inicializado | modelo=%s | temperature=%.2f | timeout=%ds",
            self.model,
            self.temperature,
            self.timeout,
        )

    # ------------------------------------------------------------------
    # Método principal
    # ------------------------------------------------------------------

    def chat_completion(
        self,
        messages: list[dict[str, str]],
        tools: Optional[list[dict[str, Any]]] = None,
        response_format: Optional[type[BaseModel]] = None,
    ) -> dict[str, Any]:
        """
        Envia uma requisição de chat completion para a OpenAI.

        Args:
            messages: Lista de mensagens no formato
                      [{"role": "...", "content": "..."}].
            tools: Lista opcional de definições de tools no formato
                   OpenAI Tool Calling. Ex.: [{"type": "function", ...}].
            response_format: Schema Pydantic opcional para Structured Outputs.
                             Se fornecido, a resposta será validada contra
                             este schema pelo próprio modelo.

        Returns:
            Dicionário contendo a resposta completa da API. A estrutura
            segue o padrão da OpenAI:
                {
                    "choices": [{"message": {...}, "finish_reason": "..."}],
                    "usage": {...},
                    ...
                }

        Raises:
            openai.AuthenticationError: Se a API Key for inválida.
            openai.RateLimitError: Se o limite de taxa for excedido.
            openai.APITimeoutError: Se a requisição exceder o timeout.
            openai.APIError: Para outros erros da API.
            ValueError: Se a lista de mensagens estiver vazia.
        """
        if not messages:
            raise ValueError("A lista de mensagens não pode estar vazia.")

        kwargs: dict[str, Any] = {
            "model": self.model,
            "messages": messages,
            "temperature": self.temperature,
        }

        if tools:
            kwargs["tools"] = tools
            kwargs["tool_choice"] = "auto"

        if response_format is not None:
            kwargs["response_format"] = response_format

        try:
            logger.debug(
                "Enviando requisição | model=%s | tools=%s | response_format=%s",
                self.model,
                bool(tools),
                response_format.__name__ if response_format else None,
            )

            response = self.client.chat.completions.parse(**kwargs)

            logger.debug(
                "Resposta recebida | finish_reason=%s | "
                "prompt_tokens=%s | completion_tokens=%s | total_tokens=%s",
                response.choices[0].finish_reason if response.choices else "N/A",
                response.usage.prompt_tokens if response.usage else "N/A",
                response.usage.completion_tokens if response.usage else "N/A",
                response.usage.total_tokens if response.usage else "N/A",
            )

            # Converte o objeto Response para dict para compatibilidade
            return response.model_dump(mode="json")

        except openai.AuthenticationError as e:
            logger.error("Falha de autenticação na OpenAI: %s", e)
            raise
        except openai.RateLimitError as e:
            logger.error("Rate limit excedido na OpenAI: %s", e)
            raise
        except openai.APITimeoutError as e:
            logger.error("Timeout na requisição à OpenAI: %s", e)
            raise
        except openai.APIError as e:
            logger.error("Erro na API da OpenAI: %s", e)
            raise
        except Exception as e:
            logger.error("Erro inesperado na comunicação com a OpenAI: %s", e)
            raise

    # ------------------------------------------------------------------
    # Informações de configuração
    # ------------------------------------------------------------------

    def get_config(self) -> dict[str, Any]:
        """Retorna a configuração atual do serviço (sem expor a chave)."""
        return {
            "model": self.model,
            "temperature": self.temperature,
            "timeout": self.timeout,
        }


def _parse_float_env(key: str, default: float) -> float:
    """Lê uma variável de ambiente e a converte para float."""
    raw = os.getenv(key)
    if raw is None:
        return default
    try:
        return float(raw)
    except (ValueError, TypeError):
        logger.warning("Valor inválido para %s='%s'. Usando default=%.2f.", key, raw, default)
        return default


def _parse_int_env(key: str, default: int) -> int:
    """Lê uma variável de ambiente e a converte para int."""
    raw = os.getenv(key)
    if raw is None:
        return default
    try:
        return int(raw)
    except (ValueError, TypeError):
        logger.warning("Valor inválido para %s='%s'. Usando default=%d.", key, raw, default)
        return default