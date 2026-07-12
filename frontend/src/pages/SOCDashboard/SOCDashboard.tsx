import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  BookOpenCheck,
  Clock3,
  FileInput,
  History,
  LayoutDashboard,
  Search,
  Settings,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./SOCDashboard.css";

type IncidentSeverity = "Crítica" | "Alta" | "Média" | "Baixa";
type IncidentStatus =
  | "Novo"
  | "Em análise"
  | "Em investigação"
  | "Monitorando"
  | "Resolvido";

type Incident = {
  id: number | string;
  title: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  source?: string;
  time?: string;
  type?: string;
};

const FALLBACK_INCIDENTS: Incident[] = [
  {
    id: 1,
    title: "Tentativa de força bruta bloqueada",
    severity: "Crítica",
    status: "Em investigação",
    source: "192.168.1.45",
    time: "10:30:12",
    type: "Força Bruta",
  },
  {
    id: 2,
    title: "Malware detectado no host",
    severity: "Alta",
    status: "Em análise",
    source: "10.0.0.23",
    time: "10:28:45",
    type: "Malware",
  },
  {
    id: 3,
    title: "Múltiplas tentativas de login falharam",
    severity: "Alta",
    status: "Novo",
    source: "172.16.0.10",
    time: "10:25:31",
    type: "Acesso Suspeito",
  },
  {
    id: 4,
    title: "Acesso ao servidor fora do horário",
    severity: "Média",
    status: "Em investigação",
    source: "10.0.0.15",
    time: "10:22:18",
    type: "Acesso Suspeito",
  },
  {
    id: 5,
    title: "Varredura de portas identificada",
    severity: "Baixa",
    status: "Monitorando",
    source: "192.168.1.88",
    time: "10:18:07",
    type: "Outros",
  },
];

const TIMELINE_DATA = [
  { hour: "06h", criticos: 10, altos: 18, medios: 14, baixos: 9 },
  { hour: "08h", criticos: 14, altos: 25, medios: 19, baixos: 11 },
  { hour: "10h", criticos: 22, altos: 34, medios: 28, baixos: 16 },
  { hour: "12h", criticos: 18, altos: 30, medios: 24, baixos: 14 },
  { hour: "14h", criticos: 28, altos: 39, medios: 33, baixos: 21 },
  { hour: "16h", criticos: 20, altos: 31, medios: 27, baixos: 17 },
];

const PIE_COLORS = ["#ff4d4f", "#ff9f0a", "#1f9cf0", "#22c55e", "#7c4dff"];

function normalizeSeverity(value: unknown): IncidentSeverity {
  const text = String(value ?? "").trim().toLowerCase();

  if (text.includes("crít") || text.includes("crit")) return "Crítica";
  if (text.includes("alt")) return "Alta";
  if (text.includes("méd") || text.includes("med")) return "Média";
  return "Baixa";
}

function normalizeStatus(value: unknown): IncidentStatus {
  const text = String(value ?? "").trim().toLowerCase();

  if (text.includes("resol")) return "Resolvido";
  if (text.includes("investig")) return "Em investigação";
  if (text.includes("anál") || text.includes("anal")) return "Em análise";
  if (text.includes("monitor")) return "Monitorando";
  return "Novo";
}

function normalizeIncident(raw: Record<string, unknown>, index: number): Incident {
  return {
    id: String(raw.id ?? index + 1),
    title: String(
      raw.title ??
        raw.titulo ??
        raw.description ??
        raw.descricao ??
        "Evento de segurança"
    ),
    severity: normalizeSeverity(raw.severity ?? raw.severidade),
    status: normalizeStatus(raw.status),
    source: String(raw.source ?? raw.origem ?? raw.ip ?? "Origem não informada"),
    time: String(raw.time ?? raw.horario ?? "Agora"),
    type: String(raw.type ?? raw.tipo ?? "Outros"),
  };
}

function SOCDashboard() {
  const [incidents, setIncidents] = useState<Incident[]>(FALLBACK_INCIDENTS);
  const [apiStatus, setApiStatus] = useState<"online" | "fallback">("fallback");

  useEffect(() => {
    let active = true;

    async function loadIncidents() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/incidents/");

        if (!response.ok) {
          throw new Error(`Erro HTTP ${response.status}`);
        }

        const data: unknown = await response.json();

        const list = Array.isArray(data)
          ? data
          : typeof data === "object" && data !== null && Array.isArray((data as { incidents?: unknown }).incidents)
            ? (data as { incidents: unknown[] }).incidents
            : [];

        const normalized = list
          .filter((item): item is Record<string, unknown> => typeof item === "object" && item !== null)
          .map(normalizeIncident);

        if (active && normalized.length > 0) {
          setIncidents(normalized);
          setApiStatus("online");
        }
      } catch {
        if (active) {
          setIncidents(FALLBACK_INCIDENTS);
          setApiStatus("fallback");
        }
      }
    }

    void loadIncidents();

    return () => {
      active = false;
    };
  }, []);

  const metrics = useMemo(() => {
    const total = incidents.length === FALLBACK_INCIDENTS.length ? 128 : incidents.length;
    const critical = incidents.filter(
      (incident) => incident.severity === "Crítica" || incident.severity === "Alta"
    ).length;
    const investigation = incidents.filter(
      (incident) =>
        incident.status === "Em análise" || incident.status === "Em investigação"
    ).length;
    const resolved = incidents.filter(
      (incident) => incident.status === "Resolvido"
    ).length;

    return {
      total,
      critical: incidents.length === FALLBACK_INCIDENTS.length ? 15 : critical,
      investigation: incidents.length === FALLBACK_INCIDENTS.length ? 8 : investigation,
      resolvedPercentage:
        incidents.length === FALLBACK_INCIDENTS.length
          ? 97
          : total > 0
            ? Math.round((resolved / total) * 100)
            : 0,
    };
  }, [incidents]);

  const incidentTypes = useMemo(() => {
    if (incidents.length === FALLBACK_INCIDENTS.length) {
      return [
        { name: "Força Bruta", value: 28 },
        { name: "Malware", value: 25 },
        { name: "Acesso Suspeito", value: 22 },
        { name: "Phishing", value: 18 },
        { name: "Outros", value: 35 },
      ];
    }

    const counts = new Map<string, number>();

    incidents.forEach((incident) => {
      const type = incident.type?.trim() || "Outros";
      counts.set(type, (counts.get(type) ?? 0) + 1);
    });

    return Array.from(counts.entries()).map(([name, value]) => ({ name, value }));
  }, [incidents]);

  const severitySummary = useMemo(() => {
    const base =
      incidents.length === FALLBACK_INCIDENTS.length
        ? { Crítica: 15, Alta: 35, Média: 42, Baixa: 36 }
        : incidents.reduce<Record<IncidentSeverity, number>>(
            (acc, incident) => {
              acc[incident.severity] += 1;
              return acc;
            },
            { Crítica: 0, Alta: 0, Média: 0, Baixa: 0 }
          );

    return Object.entries(base).map(([label, value]) => ({
      label,
      value,
      percentage: Math.max(8, Math.round((value / Math.max(metrics.total, 1)) * 100)),
    }));
  }, [incidents, metrics.total]);

  const recentIncidents = incidents.slice(0, 5);

  return (
    <div className="soc-shell">
      <aside className="soc-sidebar">
        <div className="soc-brand">
          <div className="soc-brand-mark">CI</div>
          <div>
            <strong>CyberInsight IA</strong>
            <span>Security Operations Platform</span>
          </div>
        </div>

        <nav className="soc-nav">
          <p>PRINCIPAL</p>
          <a className="active" href="/">
            <LayoutDashboard size={18} />
            Painel
          </a>
          <a href="/logs">
            <FileInput size={18} />
            Entrada de Logs
          </a>
          <a href="/history">
            <History size={18} />
            Histórico
          </a>
          <a href="/playbook">
            <BookOpenCheck size={18} />
            Manuais de instruções
          </a>
          <a href="/alerts">
            <AlertTriangle size={18} />
            Alertas
          </a>

          <p>ANÁLISE</p>
          <a href="/zeek">
            <Search size={18} />
            Explorador Zeek
          </a>

          <p>SISTEMA</p>
          <a href="/settings">
            <Settings size={18} />
            Configurações
          </a>
        </nav>

        <div className="soc-system-state">
          <span className={apiStatus === "online" ? "online" : "fallback"} />
          {apiStatus === "online" ? "API conectada" : "Modo demonstração"}
        </div>
      </aside>

      <main className="soc-main">
        <header className="soc-header">
          <div>
            <h1>Painel de controle SOC</h1>
            <p>Visão geral da operação de segurança em tempo real</p>
          </div>

          <div className="soc-header-actions">
            <button type="button" className="soc-period-button">
              <Clock3 size={16} />
              Últimas 24 horas
            </button>

            <div className="soc-user">
              <div className="soc-avatar">
                <UserRound size={18} />
              </div>
              <div>
                <strong>Camila Gois</strong>
                <span>Analista SOC</span>
              </div>
            </div>
          </div>
        </header>

        <section className="soc-kpi-grid">
          <article className="soc-kpi-card total">
            <span>INCIDENTES TOTAIS</span>
            <strong>{metrics.total}</strong>
            <p>+12% em comparação com as últimas 24 horas</p>
          </article>

          <article className="soc-kpi-card critical">
            <span>INCIDENTES CRÍTICOS</span>
            <strong>{metrics.critical}</strong>
            <p>+25% em comparação com as últimas 24 horas</p>
          </article>

          <article className="soc-kpi-card investigation">
            <span>EM INVESTIGAÇÃO</span>
            <strong>{metrics.investigation}</strong>
            <p>-11% em relação às últimas 24 horas</p>
          </article>

          <article className="soc-kpi-card resolved">
            <span>RESOLVIDOS</span>
            <strong>{metrics.resolvedPercentage}%</strong>
            <p>+8% em relação às últimas 24 horas</p>
          </article>
        </section>

        <section className="soc-analytics-grid">
          <article className="soc-panel timeline-panel">
            <div className="soc-panel-heading">
              <div>
                <h2>Cronologia dos eventos</h2>
                <p>Comportamento por severidade</p>
              </div>
              <span>Simulação visual</span>
            </div>

            <div className="soc-chart-legend">
              <span className="critical-label">Críticos</span>
              <span className="high-label">Altos</span>
              <span className="medium-label">Médios</span>
              <span className="low-label">Baixos</span>
            </div>

            <div className="soc-chart-box">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={TIMELINE_DATA}>
                  <CartesianGrid strokeDasharray="4 4" stroke="#1f2e46" />
                  <XAxis dataKey="hour" stroke="#7790b2" />
                  <YAxis stroke="#7790b2" />
                  <Tooltip
                    contentStyle={{
                      background: "#0d1728",
                      border: "1px solid #26344c",
                      borderRadius: 10,
                    }}
                  />
                  <Area type="monotone" dataKey="criticos" stroke="#ff4d4f" fill="#ff4d4f" fillOpacity={0.08} />
                  <Area type="monotone" dataKey="altos" stroke="#ff7a1a" fill="#ff7a1a" fillOpacity={0.08} />
                  <Area type="monotone" dataKey="medios" stroke="#ffad0a" fill="#ffad0a" fillOpacity={0.08} />
                  <Area type="monotone" dataKey="baixos" stroke="#22c55e" fill="#22c55e" fillOpacity={0.08} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="soc-panel types-panel">
            <div className="soc-panel-heading">
              <div>
                <h2>Tipos de incidente</h2>
                <p>Distribuição consolidada</p>
              </div>
              <span>Total {metrics.total}</span>
            </div>

            <div className="soc-type-content">
              <div className="soc-donut">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={incidentTypes}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={48}
                      outerRadius={74}
                      paddingAngle={1}
                    >
                      {incidentTypes.map((item, index) => (
                        <Cell key={item.name} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "#0d1728",
                        border: "1px solid #26344c",
                        borderRadius: 10,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="soc-donut-center">
                  <strong>{metrics.total}</strong>
                  <span>Total</span>
                </div>
              </div>

              <div className="soc-type-list">
                {incidentTypes.map((item, index) => (
                  <div key={item.name}>
                    <span
                      className="soc-type-dot"
                      style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}
                    />
                    <span>{item.name}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <article className="soc-panel severity-panel">
            <div className="soc-panel-heading">
              <div>
                <h2>Gravidade dos incidentes</h2>
                <p>Distribuição</p>
              </div>
              <ShieldCheck size={20} />
            </div>

            <div className="soc-severity-list">
              {severitySummary.map((item) => (
                <div className="soc-severity-row" key={item.label}>
                  <div>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                  <div className="soc-severity-track">
                    <span
                      className={`severity-${item.label.toLowerCase().replace("í", "i").replace("é", "e")}`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="soc-lower-grid">
          <article className="soc-panel incidents-panel">
            <div className="soc-panel-heading">
              <div>
                <h2>Incidentes recentes</h2>
                <p>Últimos eventos registrados</p>
              </div>
              <span>{apiStatus === "online" ? "Dados da API" : "Dados simulados"}</span>
            </div>

            <div className="soc-table-wrapper">
              <table className="soc-table">
                <thead>
                  <tr>
                    <th>Horário</th>
                    <th>Gravidade</th>
                    <th>Título</th>
                    <th>Origem</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {recentIncidents.map((incident) => (
                    <tr key={incident.id}>
                      <td>{incident.time}</td>
                      <td>
                        <span className={`soc-badge ${incident.severity.toLowerCase().replace("í", "i").replace("é", "e")}`}>
                          {incident.severity}
                        </span>
                      </td>
                      <td>{incident.title}</td>
                      <td>{incident.source}</td>
                      <td>{incident.status}</td>
                      <td>
                        <button type="button" className="soc-view-button">
                          Ver
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <aside className="soc-side-stack">
            <article className="soc-panel alerts-panel">
              <div className="soc-panel-heading">
                <div>
                  <h2>Alertas ativos</h2>
                  <p>3 críticos</p>
                </div>
                <AlertTriangle size={20} />
              </div>

              <div className="soc-alert-card critical-alert">
                <strong>Força bruta em andamento</strong>
                <span>192.168.1.45 · 10:30:12</span>
              </div>
              <div className="soc-alert-card high-alert">
                <strong>Malware detectado</strong>
                <span>10.0.0.23 · 10:28:45</span>
              </div>
              <div className="soc-alert-card high-alert">
                <strong>Acesso suspeito</strong>
                <span>172.16.0.10 · 10:25:31</span>
              </div>
            </article>

            <article className="soc-panel ai-panel">
              <div className="soc-panel-heading">
                <div>
                  <h2>Análise IA (Simulação)</h2>
                  <p>Sem IA real</p>
                </div>
                <Activity size={20} />
              </div>

              <p>
                A IA analisou <strong>{metrics.total}</strong> eventos nas últimas 24 horas.
              </p>
              <div className="soc-ai-score">
                <span>Probabilidade de ameaça crítica</span>
                <strong>87%</strong>
              </div>
            </article>
          </aside>
        </section>

        <footer className="soc-footer">
          <BarChart3 size={16} />
          CyberInsight IA · Centro de Operações de Segurança
        </footer>
      </main>
    </div>
  );
}

export default SOCDashboard;
