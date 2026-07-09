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