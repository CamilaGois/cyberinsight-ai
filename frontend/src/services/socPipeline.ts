import {
  getIncidents,
  saveIncidents,
  type Incident,
} from "./incidentStorage";

import {
  savePlaybook,
  type Playbook,
} from "./playbookStorage";

import { detectAttackType } from "./detectionEngine";

function generateSOCPlaybook(incident: Incident): Playbook {
  const attackType = detectAttackType(incident);

  const steps =
    incident.severity === "Alta"
      ? [
          "Isolar o ativo comprometido",
          "Coletar e preservar evidências",
          "Analisar os logs relacionados",
          "Identificar a origem do incidente",
          "Escalar o incidente para o SOC Nível 2",
        ]
      : incident.severity === "Média"
        ? [
            "Validar o alerta de segurança",
            "Analisar os logs relacionados",
            "Identificar atividades suspeitas",
            "Registrar o incidente",
          ]
        : [
            "Monitorar a atividade",
            "Validar possíveis falsos positivos",
            "Registrar o evento",
          ];

  return {
    id: incident.id,
    title: `Playbook: ${incident.title} — ${String(attackType)}`,
    severity: incident.severity,
    steps,
  };
}

export function runSOCPipeline(): void {
  const incidents = getIncidents();

  const updatedIncidents: Incident[] = incidents.map((incident) => ({
    ...incident,
    status: "Em análise",
  }));

  saveIncidents(updatedIncidents);

  const playbooks: Playbook[] =
    updatedIncidents.map(generateSOCPlaybook);

  savePlaybook(playbooks);

  window.dispatchEvent(new Event("playbookUpdated"));
  window.dispatchEvent(new Event("incidentsUpdated"));
}
