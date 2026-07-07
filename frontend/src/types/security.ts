export interface Incident {
  id: string;

  title: string;

  description: string;

  severity: "BAIXA" | "MÉDIA" | "ALTA";

  status: "Novo" | "Em análise" | "Resolvido";

  source: string;

  timestamp: string;

  recommendation?: string;
}