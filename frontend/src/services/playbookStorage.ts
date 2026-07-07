import { getIncidents, type Incident } from "./incidentStorage";

export type Playbook = {
  id: number;
  title: string;
  steps: string[];
  severity: "ALTA" | "MÉDIA" | "BAIXA";
};

const STORAGE_KEY = "cyberplaybook";

export function getPlaybook(): Playbook[] {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

export function savePlaybook(data: Playbook[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function generatePlaybookFromIncidents(): Playbook[] {
  const incidents: Incident[] = getIncidents();

  return incidents.map((inc) => ({
    id: inc.id,
    title: `Playbook: ${inc.title}`,
    severity: inc.severity,
    steps:
      inc.severity === "ALTA"
        ? [
            "Isolar ativo comprometido",
            "Coletar evidências",
            "Analisar logs",
            "Escalar SOC",
          ]
        : inc.severity === "MÉDIA"
        ? [
            "Validar alerta",
            "Analisar logs",
            "Registrar incidente",
          ]
        : [
            "Monitorar atividade",
            "Registrar evento",
          ],
  }));
}

export function refreshPlaybook() {
  const generated = generatePlaybookFromIncidents();
  savePlaybook(generated);

  window.dispatchEvent(new Event("playbookUpdated"));
}