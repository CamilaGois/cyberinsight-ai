import type { Incident } from "./incidentStorage";

export type AttackType =
  | "phishing"
  | "bruteforce"
  | "malware"
  | "portscan"
  | "unknown";

export function detectAttackType(incident: Incident): AttackType {
  const text = incident.title.toLowerCase();

  if (text.includes("phishing")) return "phishing";
  if (text.includes("brute") || text.includes("login")) return "bruteforce";
  if (text.includes("malware") || text.includes("virus")) return "malware";
  if (text.includes("scan") || text.includes("port")) return "portscan";

  return "unknown";
}