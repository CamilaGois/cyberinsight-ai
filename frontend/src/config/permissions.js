/**
 * config/permissions.js
 * Configuração centralizada de níveis de acesso e endpoints do sistema.
 */

export const ROLES = {
  ADMIN: "ADMIN",
  VIEWER: "VIEWER",
};

export const PERMISSIONS = {
  [ROLES.ADMIN]: {
    canImportLogs: true,
    canDeleteIncidents: true,
    canManageUsers: true,
    canAccessAnalytics: true,
  },
  [ROLES.VIEWER]: {
    canImportLogs: false,
    canDeleteIncidents: false,
    canManageUsers: false,
    canAccessAnalytics: true,
  },
};

export const CONFIG = {
  API_ENDPOINTS: {
    UPLOAD_LOGS: process.env.REACT_APP_UPLOAD_ENDPOINT || "/api/logs/import",
    INCIDENTS: "/api/incidents",
    PLAYBOOKS: "/api/playbooks",
    IOCS: "/api/iocs",
  },
  DEFAULT_REDIRECT: "/",
  AUTH_REDIRECT: "/login",
  SESSION_TIMEOUT_MS: 30 * 60 * 1000,
};

/**
 * Verifica se usuário tem permissão
 */
export function hasPermission(role, permission) {
  return PERMISSIONS[role] ? PERMISSIONS[role][permission] : false;
}