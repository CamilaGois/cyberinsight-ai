const API_URL = "http://127.0.0.1:8000/api";

export type ApiIncident = {
  id: number;
  titulo_alerta: string;
  severidade: "Crítica" | "Alta" | "Média" | "Baixa";
  status: string;
  ip_origem: string;
  timestamp: string;
  host_afetado: string;
};

export type ApiPlaybook = {
  id: number;
  tática_mitre: string;
  técnica_mapeada: string;
  confiança: number;
  severidade: "Crítica" | "Alta" | "Média";
  tempo_estimado_min: number;
  passos_de_mitigação: string[];
  isolamento_recomendado: boolean;
  prioridade: string;
};

export type LogAnalysisResponse = {
  status: string;
  timestamp_analise: string;
  eventos_processados: number;
  alertas_gerados: number;
  eventos_criticos: number;
  severidade_predominante: string;
  resumo_executivo: {
    ameaca_identificada: string;
    ttps_mapeadas: string[];
    risco_geral: string;
    recomendacao_imediata: string;
    tempo_resposta_estimado_horas: number;
  };
  iocs_detectados: Array<{
    tipo: string;
    valor: string;
    reputacao: string;
    observacoes: string;
  }>;
  correlacao_eventos: {
    ataques_relacionados: number;
    padroes_similares: string;
    actor_possivel: string;
  };
};

export type ApiIoC = {
  id: number;
  tipo: string;
  valor: string;
  severidade: "Crítica" | "Alta" | "Média" | "Baixa";
  classificacao: string;
  primeira_deteccao: string;
  ultima_atividade: string;
  geoloc: string;
  confianca: number;
  fonte: string;
  relacionados: number;
};

export async function getApiIncidents(): Promise<ApiIncident[]> {
  const response = await fetch(`${API_URL}/incidents/`);

  if (!response.ok) {
    throw new Error("Erro ao buscar incidentes da API");
  }

  return response.json();
}

export async function importLogMock(logContent: string): Promise<LogAnalysisResponse> {
  const response = await fetch(`${API_URL}/logs/import`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ log_raw: logContent }),
  });

  if (!response.ok) {
    throw new Error("Erro ao importar log");
  }

  return response.json();
}

export async function getApiPlaybooks(): Promise<ApiPlaybook[]> {
  const response = await fetch(`${API_URL}/playbooks/`);

  if (!response.ok) {
    throw new Error("Erro ao buscar playbooks");
  }

  return response.json();
}
export async function getApiIoCs(): Promise<ApiIoC[]> {
  const response = await fetch(`${API_URL}/iocs/`);

  if (!response.ok) {
    throw new Error("Erro ao buscar IoCs da API");
  }

  return response.json();
}