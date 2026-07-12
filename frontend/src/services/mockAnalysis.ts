import type { Incident } from "./incidentStorage";

export function mockAnalysis(log: string): Incident {
  const text = log.toLowerCase();
  const now = new Date().toISOString();

  let severity: Incident["severity"] = "Baixa";
  const status: Incident["status"] = "Novo";
  let title = "Evento de Segurança";
  let description = "Evento de segurança identificado a partir do log informado.";

  if (
    text.includes("failed password") ||
    text.includes("brute") ||
    text.includes("login failed")
  ) {
    title = "Possível Ataque de Força Bruta";
    description =
      "Foram identificadas tentativas repetidas de autenticação com falha.";
    severity = "Alta";
  } else if (
    text.includes("scan") ||
    text.includes("nmap") ||
    text.includes("port")
  ) {
    title = "Possível Varredura de Rede";
    description =
      "Foram identificados indícios de varredura de portas ou reconhecimento de rede.";
    severity = "Média";
  } else if (
    text.includes("malware") ||
    text.includes("ransomware")
  ) {
    title = "Possível Malware";
    description =
      "Foram identificados termos relacionados a malware ou ransomware no log.";
    severity = "Alta";
  }

  return {
    id: Date.now().toString(),
    title,
    description,
    severity,
    status,
    source: "Análise de Log",
    createdAt: now,
    updatedAt: now,
  };
}
