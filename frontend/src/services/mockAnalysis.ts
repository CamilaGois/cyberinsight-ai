import type { Incident } from "./incidentStorage";

export function mockAnalysis(log: string): Incident {
  const text = log.toLowerCase();

  let severity: Incident["severity"] = "BAIXA";
  let status: Incident["status"] = "Novo";
  let title = "Evento de Segurança";

  if (
    text.includes("failed password") ||
    text.includes("brute") ||
    text.includes("login failed")
  ) {
    title = "Possível Ataque de Força Bruta";
    severity = "ALTA";
  } else if (
    text.includes("scan") ||
    text.includes("nmap") ||
    text.includes("port")
  ) {
    title = "Possível Varredura de Rede";
    severity = "MÉDIA";
  } else if (
    text.includes("malware") ||
    text.includes("ransomware")
  ) {
    title = "Possível Malware";
    severity = "ALTA";
  }

  return {
    id: Date.now(),
    title,
    severity,
    status,
  };
}