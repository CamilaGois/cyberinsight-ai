from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import Optional

router = APIRouter(prefix="/api/zabbix", tags=["Zabbix"])


class ZabbixEvent(BaseModel):
    host: str = Field(..., description="Nome do host que gerou o evento")
    evento: str = Field(..., description="Descrição do evento")
    severidade: str = Field(..., description="Severidade do evento (info, warning, average, high, disaster)")
    timestamp: str = Field(..., description="Timestamp ISO 8601 do evento")
    status: str = Field(..., description="Status do evento (problem, resolved)")
    valor: str = Field(..., description="Valor da métrica que disparou o evento")


@router.post("/events", status_code=201)
def receive_zabbix_event(event: ZabbixEvent):
    """
    Recebe eventos do Zabbix via webhook.

    - **host**: nome do host
    - **evento**: descrição do evento
    - **severidade**: severidade (info, warning, average, high, disaster)
    - **timestamp**: data/hora ISO 8601
    - **status**: problem ou resolved
    - **valor**: valor da métrica
    """
    return {
        "status": "recebido",
        "source": "Zabbix",
        "simulado": True,
        "mensagem": "Evento recebido com sucesso"
    }