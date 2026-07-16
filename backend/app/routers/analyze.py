"""
Router: /api/ai/analyze
Responsabilidade: Receber um log de segurança e retornar a análise do SOC Agent.
O router não contém lógica de negócio, prompts, tools ou SQL.
"""
from fastapi import APIRouter

from agents.soc_agent import SOCAgent
from app.schemas import AnalyzeRequest, IncidentAnalysis

router = APIRouter(
    prefix="/api/ai",
    tags=["AI Analysis"],
)


@router.post("/analyze", response_model=IncidentAnalysis)
def analyze_security_event(request: AnalyzeRequest):
    """
    Analisa um log de segurança utilizando o SOC Agent.

    Args:
        request: Corpo da requisição contendo o log bruto (log_raw).

    Returns:
        IncidentAnalysis: Análise estruturada contendo classificação,
        severidade, evidências, IoCs, recomendações e playbook sugerido.
    """
    agent = SOCAgent()
    result = agent.run(request.log_raw)
    return result