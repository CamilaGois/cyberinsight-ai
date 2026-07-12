import type { Incident } from "./incidentStorage";

export function mockAnalysis(log: string): Incident {
  const text = log.toLowerCase();

  let severity: Incident["severity"] = "Baixa";
  const status: Incident["status"] = "Novo";
  let title = "Evento de Segurança";

  if (
    text.includes("failed password") ||
    text.includes("brute") ||
    text.includes("login failed")
  ) {
    title = "Possível Ataque de Força Bruta";
    severity = "Alta";
  } else if (
    text.includes("scan") ||
    text.includes("nmap") ||
    text.includes("port")
  ) {
    title = "Possível Varredura de Rede";
    severity = "Média";
  } else if (
    text.includes("malware") ||
    text.includes("ransomware")
  ) {
    title = "Possível Malware";
    severity = "Alta";
  }

  return {
    id: Date.now().toString(),
    title,
    severity,
    status,
  };
}
