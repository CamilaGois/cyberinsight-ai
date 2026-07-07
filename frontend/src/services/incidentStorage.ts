export type IncidentSeverity = "Baixa" | "Média" | "Alta" | "Crítica";

export type IncidentStatus =
  | "Novo"
  | "Em análise"
  | "Em andamento"
  | "Resolvido"
  | "Fechado";

export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  source: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "cyberinsight_incidents";

export function getIncidents(): Incident[] {
  const storedIncidents = localStorage.getItem(STORAGE_KEY);

  if (!storedIncidents) {
    return [];
  }

  try {
    return JSON.parse(storedIncidents) as Incident[];
  } catch {
    return [];
  }
}

export function saveIncidents(incidents: Incident[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(incidents));
}

export function addIncident(
  incident: Omit<Incident, "id" | "createdAt" | "updatedAt">
): Incident {
  const incidents = getIncidents();

  const now = new Date().toISOString();

  const newIncident: Incident = {
    id: crypto.randomUUID(),
    ...incident,
    createdAt: now,
    updatedAt: now,
  };

  const updatedIncidents = [newIncident, ...incidents];

  saveIncidents(updatedIncidents);

  return newIncident;
}

export function updateIncident(
  id: string,
  updatedData: Partial<Omit<Incident, "id" | "createdAt">>
): Incident | null {
  const incidents = getIncidents();

  const incidentIndex = incidents.findIndex((incident) => incident.id === id);

  if (incidentIndex === -1) {
    return null;
  }

  const updatedIncident: Incident = {
    ...incidents[incidentIndex],
    ...updatedData,
    updatedAt: new Date().toISOString(),
  };

  incidents[incidentIndex] = updatedIncident;

  saveIncidents(incidents);

  return updatedIncident;
}

export function deleteIncident(id: string): void {
  const incidents = getIncidents();

  const updatedIncidents = incidents.filter((incident) => incident.id !== id);

  saveIncidents(updatedIncidents);
}

export function getIncidentById(id: string): Incident | undefined {
  return getIncidents().find((incident) => incident.id === id);
}

export function clearIncidents(): void {
  localStorage.removeItem(STORAGE_KEY);
}