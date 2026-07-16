"""
SOC Agent
Responsabilidade única: orquestrar o fluxo completo de análise de segurança.

Fluxo:
    1. Carregar o system prompt de backend/prompts/system_prompt.txt
    2. Preparar mensagens (system + user)
    3. Registrar Tools via ToolRegistry
    4. Chamar OpenAIService com Tool Calling
    5. Processar tool calls em loop (até MAX_ITERATIONS)
    6. Receber resposta final com Structured Output
    7. Validar contra o schema Pydantic IncidentAnalysis
    8. Retornar JSON final

Regras:
    - Sem SQL diretamente no agente
    - Sem lógica de Tools dentro do agente
    - Sem acoplamento ao FastAPI
    - Reutilizável e testável independentemente
"""
import json
import logging
import os
from typing import Any, Optional

from app.schemas import IncidentAnalysis
from services.openai_service import OpenAIService
from tools.tool_registry import execute_tool, get_openai_tools

logger = logging.getLogger(__name__)

MAX_ITERATIONS = 10
PROMPT_PATH = os.path.join(
    os.path.dirname(__file__), "..", "prompts", "system_prompt.txt"
)


class SOCAgent:
    """
    Agente SOC responsável por orquestrar a análise de logs de segurança.

    O agente coordena o fluxo entre o system prompt, as Tools e o modelo
    LLM (via OpenAIService) para produzir uma análise estruturada.

    Exemplo de uso:
        agent = SOCAgent()
        result = agent.run("Mar 15 03:14:22 sshd[1234]: Failed password...")
        # result é um dict no formato de IncidentAnalysis
    """

    def __init__(
        self,
        openai_service: Optional[OpenAIService] = None,
        system_prompt: Optional[str] = None,
    ) -> None:
        """
        Inicializa o SOC Agent.

        Args:
            openai_service: Instância de OpenAIService. Se None, cria uma nova.
            system_prompt: Conteúdo do system prompt. Se None, carrega
                           do arquivo padrão.
        """
        self.openai_service = openai_service or OpenAIService()
        self.system_prompt = system_prompt or self._load_system_prompt()

        logger.info(
            "SOCAgent inicializado | prompt_size=%d caracteres",
            len(self.system_prompt),
        )

    # ------------------------------------------------------------------
    # API pública
    # ------------------------------------------------------------------

    def run(self, log_raw: str) -> dict[str, Any]:
        """
        Executa o fluxo completo de análise de um log de segurança.

        Args:
            log_raw: Log de segurança bruto a ser analisado.

        Returns:
            Dicionário no formato do schema IncidentAnalysis, contendo
            classificação, severidade, evidências, recomendações, etc.

        Raises:
            ValueError: Se log_raw estiver vazio.
            RuntimeError: Se o agente não conseguir produzir uma resposta
                          válida após MAX_ITERATIONS iterações de tool calls.
        """
        if not log_raw or not log_raw.strip():
            raise ValueError("O log de segurança não pode estar vazio.")

        # 1. Preparar mensagens
        messages = self._build_messages(log_raw)

        # 2. Obter definições das tools
        tools = get_openai_tools()

        # 3. Loop de tool calling
        for iteration in range(MAX_ITERATIONS):
            logger.info(
                "Iteração %d/%d | messages=%d",
                iteration + 1, MAX_ITERATIONS, len(messages),
            )

            # 3a. Chamar o modelo com tools + response_format
            response = self.openai_service.chat_completion(
                messages=messages,
                tools=tools,
                response_format=IncidentAnalysis,
            )

            # 3b. Extrair a mensagem de resposta
            choice = response["choices"][0]
            message = choice["message"]
            finish_reason = choice.get("finish_reason", "")

            logger.debug(
                "Resposta com tools | finish_reason=%s | tool_calls=%s",
                finish_reason,
                bool(message.get("tool_calls")),
            )

            # 3c. Adicionar a mensagem do assistente ao histórico
            messages.append(self._assistant_message(message))

            # 3d. Se não há tool calls, a resposta é final
            if not message.get("tool_calls"):
                break

            # 3e. Processar cada tool call
            for tool_call in message["tool_calls"]:
                tool_result = self._process_tool_call(tool_call)
                messages.append(tool_result)

            # 3f. Chamada FINAL sem tools para forçar o modelo a produzir
            #     o JSON estruturado (Structured Output).
            #     Sem tools disponíveis, o modelo NÃO pode chamar ferramentas
            #     e é OBRIGADO a responder com o schema response_format.
            logger.info(
                "Chamada final sem tools | iteration=%d", iteration + 1,
            )

            final_response = self.openai_service.chat_completion(
                messages=messages,
                tools=None,  # ← SEM tools — força produção do JSON
                response_format=IncidentAnalysis,
            )

            final_message = final_response["choices"][0]["message"]
            messages.append(self._assistant_message(final_message))

            # tools=None → o modelo não pode chamar tools →
            # final_message SEMPRE terá o content com o JSON final
            if not final_message.get("tool_calls"):
                break

        else:
            # Loop completou MAX_ITERATIONS sem resposta final
            logger.error(
                "Agente não produziu resposta final após %d iterações.",
                MAX_ITERATIONS,
            )
            raise RuntimeError(
                f"O agente não conseguiu concluir a análise após "
                f"{MAX_ITERATIONS} iterações de tool calls."
            )

        # 4. Extrair e validar a resposta final
        final_content = self._extract_final_response(messages)

        # 5. Validar contra o schema Pydantic
        validated = self._validate_response(final_content)

        logger.info(
            "Análise concluída | classificacao=%s | severidade=%s | "
            "confianca=%d",
            validated.classificacao,
            validated.severidade,
            validated.nivel_confianca,
        )

        return validated.model_dump()

    # ------------------------------------------------------------------
    # Métodos internos
    # ------------------------------------------------------------------

    def _load_system_prompt(self) -> str:
        """
        Carrega o system prompt do arquivo.

        Returns:
            Conteúdo do arquivo de system prompt.

        Raises:
            FileNotFoundError: Se o arquivo de prompt não for encontrado.
        """
        path = os.path.abspath(PROMPT_PATH)
        if not os.path.isfile(path):
            raise FileNotFoundError(
                f"Arquivo de system prompt não encontrado: {path}"
            )

        with open(path, "r", encoding="utf-8") as f:
            content = f.read()

        logger.info("System prompt carregado de: %s (%d caracteres)", path, len(content))
        return content

    def _build_messages(self, log_raw: str) -> list[dict[str, str]]:
        """
        Constrói a lista de mensagens para a requisição.

        Args:
            log_raw: Log bruto do usuário.

        Returns:
            Lista de mensagens no formato OpenAI.
        """
        return [
            {"role": "system", "content": self.system_prompt},
            {"role": "user", "content": log_raw},
        ]

    def _assistant_message(self, message: dict[str, Any]) -> dict[str, Any]:
        """
        Cria uma mensagem de assistente a partir da resposta do modelo.

        Args:
            message: Mensagem retornada pelo modelo.

        Returns:
            Mensagem formatada para o histórico.
        """
        msg: dict[str, Any] = {"role": "assistant", "content": message.get("content")}

        if message.get("tool_calls"):
            msg["tool_calls"] = [
                {
                    "id": tc["id"],
                    "type": tc["type"],
                    "function": {
                        "name": tc["function"]["name"],
                        "arguments": tc["function"]["arguments"],
                    },
                }
                for tc in message["tool_calls"]
            ]

        return msg

    def _process_tool_call(self, tool_call: dict[str, Any]) -> dict[str, Any]:
        """
        Processa uma única tool call: executa a tool e retorna
        a mensagem de resultado.

        Args:
            tool_call: Dicionário com os campos id, type, function.

        Returns:
            Mensagem no formato tool role para o histórico.
        """
        tool_name = tool_call["function"]["name"]
        tool_args_raw = tool_call["function"]["arguments"]

        # Parse dos argumentos (JSON string)
        try:
            tool_args = json.loads(tool_args_raw)
        except json.JSONDecodeError as e:
            logger.warning(
                "Erro ao fazer parse dos argumentos da tool '%s': %s",
                tool_name, e,
            )
            tool_args = {}

        logger.info(
            "Executando tool: %s | args=%s",
            tool_name, tool_args,
        )

        try:
            result = execute_tool(tool_name, tool_args)
            result_str = json.dumps(result, ensure_ascii=False, default=str)
        except Exception as e:
            logger.error("Erro ao executar tool '%s': %s", tool_name, e)
            result_str = json.dumps(
                {"erro": f"Falha ao executar {tool_name}: {str(e)}"},
                ensure_ascii=False,
            )

        logger.debug(
            "Tool '%s' executada | resultado (truncado)=%s",
            tool_name, result_str[:200],
        )

        return {
            "role": "tool",
            "tool_call_id": tool_call["id"],
            "content": result_str,
        }

    def _extract_final_response(
        self, messages: list[dict[str, Any]]
    ) -> str:
        """
        Extrai o conteúdo da resposta final do assistente.

        Percorre as mensagens de trás para frente e retorna o
        primeiro conteúdo não vazio de uma mensagem do assistente
        que não contém tool_calls.

        Args:
            messages: Histórico completo de mensagens.

        Returns:
            Conteúdo JSON da resposta final.

        Raises:
            RuntimeError: Se não encontrar resposta final válida.
        """
        for msg in reversed(messages):
            if (
                msg["role"] == "assistant"
                and msg.get("content")
                and not msg.get("tool_calls")
            ):
                return msg["content"]

        raise RuntimeError(
            "Não foi possível extrair uma resposta final do assistente."
        )

    def _validate_response(self, content: str) -> IncidentAnalysis:
        """
        Valida o conteúdo JSON contra o schema IncidentAnalysis.

        Args:
            content: String JSON retornada pelo modelo.

        Returns:
            Instância validada de IncidentAnalysis.

        Raises:
            ValueError: Se o conteúdo não for um JSON válido ou não
                        passar na validação do schema.
        """
        try:
            data = json.loads(content)
        except json.JSONDecodeError as e:
            raise ValueError(
                f"Resposta do modelo não é um JSON válido: {e}"
            ) from e

        try:
            return IncidentAnalysis(**data)
        except Exception as e:
            raise ValueError(
                f"Resposta do modelo não passou na validação do schema: {e}"
            ) from e