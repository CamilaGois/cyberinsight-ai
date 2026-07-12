import { getIncidents, type Incident } from "./incidentStorage";

export type Playbook = {
  id: string;
  title: string;
  steps: string[];
  severity: Incident["severity"];
};

const STORAGE_KEY = "cyberplaybook";

export function getPlaybook(): Playbook[] {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored) as Playbook[];
  } catch {
    return [];
  }
}

export function savePlaybook(data: Playbook[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function generatePlaybookFromIncidents(): Playbook[] {
  const incidents = getIncidents();

  return incidents.map(
    (incident): Playbook => ({
      id: incident.id,
      title: `Playbook: ${incident.title}`,
      severity: incident.severity,
      steps:
        incident.severity === "Alta"
          ? [
              "Isolar o ativo comprometido",
              "Coletar e preservar evidências",
              "Analisar logs relacionados",
              "Identificar origem e impacto",
              "Escalar o incidente para o SOC Nível 2",
            ]
          : incident.severity === "Média"
            ? [
                "Validar o alerta",
                "Analisar os logs relacionados",
                "Identificar atividades suspeitas",
                "Registrar o incidente",
              ]
            : [
                "Monitorar a atividade",
                "Validar possíveis falsos positivos",
                "Registrar o evento",
              ],
    }),
  );
}

export function refreshPlaybook(): void {
  const generated = generatePlaybookFromIncidents();

  savePlaybook(generated);
  window.dispatchEvent(new Event("playbookUpdated"));
}
