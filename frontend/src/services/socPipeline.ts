import { getIncidents, saveIncidents } from "./incidentStorage";
import { savePlaybook } from "./playbookStorage";
import { detectAttackType } from "./detectionEngine";
import { generateSOCPlaybook } from "./socPipeline";

export function runSOCPipeline() {
  const incidents = getIncidents();

  const enriched = incidents.map((inc) => ({
    ...inc,
    type: detectAttackType(inc),
    status: "Em investigação",
  }));

  // opcional: salvar evolução do incidente
  saveIncidents(enriched);

  const playbooks = enriched.map(generateSOCPlaybook);

  savePlaybook(playbooks);

  window.dispatchEvent(new Event("playbookUpdated"));
  window.dispatchEvent(new Event("incidentsUpdated"));
}