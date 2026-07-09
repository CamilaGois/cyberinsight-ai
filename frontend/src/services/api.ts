const API_URL = "http://127.0.0.1:8000/api";

export type ApiIncident = {
  id: number;
  title: string;
  severity: "Crítica" | "Alta" | "Média" | "Baixa";
  status: string;
  source: string;
};

export async function getApiIncidents(): Promise<ApiIncident[]> {
  const response = await fetch(`${API_URL}/incidents/`);

  if (!response.ok) {
    throw new Error("Erro ao buscar incidentes da API");
  }

  return response.json();
}

export async function importLogMock() {
  const response = await fetch(`${API_URL}/logs/import`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Erro ao importar log");
  }

  return response.json();
}

export async function getApiPlaybooks() {
  const response = await fetch(`${API_URL}/playbooks/`);

  if (!response.ok) {
    throw new Error("Erro ao buscar playbooks");
  }

  return response.json();
}