from datetime import datetime

from pydantic import BaseModel


class IncidentCreate(BaseModel):
    title: str
    description: str
    severity: str
    status: str
    source: str


class IncidentResponse(IncidentCreate):
    id: int
    created_at: datetime

    model_config = {
        "from_attributes": True
    }


# ─── Schemas do SOC Agent ────────────────────────────────────────────────────


class TecnicaMitre(BaseModel):
    """Técnica MITRE ATT&CK identificada na análise."""
    id: str
    nome: str
    confianca: int  # 0–100


class IocRelacionado(BaseModel):
    """Indicador de Comprometimento correlacionado."""
    tipo: str   # ip | dominio | hash | url
    valor: str
    fonte: str  # ferramenta que identificou o IOC


class IncidenteSimilar(BaseModel):
    """Incidente histórico similar ao evento analisado."""
    id: int
    titulo: str
    similaridade: str  # alta | media | baixa


class PlaybookSugerido(BaseModel):
    """Playbook de resposta recomendado."""
    id: str = ""
    nome: str = ""


class AnalyzeRequest(BaseModel):
    """Requisição para análise de log de segurança pelo SOC Agent."""
    log_raw: str


class IncidentAnalysis(BaseModel):
    """Resposta estruturada do SOC Agent — schema para Structured Output da OpenAI."""
    classificacao: str
    severidade: str          # critica | alta | media | baixa
    nivel_confianca: int     # 0–100
    resumo_executivo: str
    evidencias: list[str]
    tecnicas_mitre_attck: list[TecnicaMitre]
    iocs_relacionados: list[IocRelacionado]
    incidentes_similares: list[IncidenteSimilar]
    recomendacoes: list[str]
    playbook_sugerido: PlaybookSugerido
    requer_validacao_humana: bool = True
    limitacoes_da_analise: list[str]
