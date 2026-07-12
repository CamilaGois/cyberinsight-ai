import { useEffect, useMemo, useState } from "react";
import "./History.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import { getApiIncidents, type ApiIncident } from "../../services/api";

type Severidade = "Crítica" | "Alta" | "Média" | "Baixa";
type FiltroSeveridade = "Todos" | Severidade;

type IncidenteHistorico = {
  id: string;
  dataHora: string;
  severidade: Severidade;
  incidente: string;
  origem: string;
  status: string;
  analista: string;
};

function mapApiIncident(incident: ApiIncident): IncidenteHistorico {
  return {
    id: `INC-2026-${String(incident.id).padStart(3, "0")}`,
    dataHora: new Date(incident.timestamp).toLocaleString("pt-BR"),
    severidade: incident.severidade,
    incidente: incident.titulo_alerta,
    origem: incident.ip_origem,
    status: incident.status,
    analista: "Camila Gois",
  };
}

function History() {
  const [busca, setBusca] = useState("");
  const [filtroSeveridade, setFiltroSeveridade] =
    useState<FiltroSeveridade>("Todos");

  const [incidentes, setIncidentes] = useState<IncidenteHistorico[]>([]);
  const [incidenteSelecionado, setIncidenteSelecionado] =
    useState<IncidenteHistorico | null>(null);

  useEffect(() => {
    getApiIncidents()
      .then((data) => {
        const mapped = data.map(mapApiIncident);

        setIncidentes(mapped);
        setIncidenteSelecionado(mapped[0] ?? null);
      })
      .catch((error) => {
        console.error("Erro ao carregar incidentes da API:", error);
      });
  }, []);

  const incidentesFiltrados = useMemo(() => {
    return incidentes.filter((incidente) => {
      const textoBusca = busca.toLowerCase();

      const correspondeBusca =
        incidente.incidente.toLowerCase().includes(textoBusca) ||
        incidente.origem.toLowerCase().includes(textoBusca) ||
        incidente.status.toLowerCase().includes(textoBusca) ||
        incidente.analista.toLowerCase().includes(textoBusca);

      const correspondeSeveridade =
        filtroSeveridade === "Todos" ||
        incidente.severidade === filtroSeveridade;

      return correspondeBusca && correspondeSeveridade;
    });
  }, [busca, filtroSeveridade, incidentes]);

  const totalCriticos = incidentes.filter(
    (incidente) => incidente.severidade === "Crítica"
  ).length;

  const totalInvestigacao = incidentes.filter((incidente) =>
    incidente.status.toLowerCase().includes("investig")
  ).length;

  const totalResolvidos = incidentes.filter(
    (incidente) => incidente.status === "Resolvido"
  ).length;

  return (
    <div className="history-layout">
      <Sidebar />

      <main className="history-main">
        <Topbar
          title="Histórico de Incidentes"
          subtitle="Consulta e auditoria dos eventos analisados"
        />

        <section className="history-kpi-grid">
          <article className="history-kpi-card blue">
            <span>Total analisado</span>
            <strong>{incidentes.length}</strong>
          </article>

          <article className="history-kpi-card red">
            <span>Críticos</span>
            <strong>{totalCriticos}</strong>
          </article>

          <article className="history-kpi-card yellow">
            <span>Em investigação</span>
            <strong>{totalInvestigacao}</strong>
          </article>

          <article className="history-kpi-card green">
            <span>Resolvidos</span>
            <strong>{totalResolvidos}</strong>
          </article>
        </section>

        <section className="history-content-grid">
          <div className="history-left-column">
            <article className="history-card">
              <div className="history-card-header">
                <div>
                  <h2>Consulta de incidentes</h2>
                  <small>Busque por incidente, origem, status ou analista</small>
                </div>
              </div>

              <div className="history-filters">
                <input
                  type="search"
                  placeholder="Buscar incidente..."
                  value={busca}
                  onChange={(event) => setBusca(event.target.value)}
                />

                <div className="severity-filter">
                  {(["Todos", "Crítica", "Alta", "Média", "Baixa"] as FiltroSeveridade[]).map(
                    (severidade) => (
                      <button
                        key={severidade}
                        type="button"
                        className={filtroSeveridade === severidade ? "active" : ""}
                        onClick={() => setFiltroSeveridade(severidade)}
                      >
                        {severidade}
                      </button>
                    )
                  )}
                </div>
              </div>
            </article>

            <article className="history-card">
              <div className="history-card-header">
                <div>
                  <h2>Tabela de histórico</h2>
                  <small>{incidentesFiltrados.length} registros encontrados</small>
                </div>
              </div>

              <div className="history-table-wrap">
                <table className="history-table">
                  <thead>
                    <tr>
                      <th>Data/Hora</th>
                      <th>Severidade</th>
                      <th>Incidente</th>
                      <th>Origem</th>
                      <th>Status</th>
                      <th>Analista</th>
                    </tr>
                  </thead>

                  <tbody>
                    {incidentesFiltrados.map((incidente) => (
                      <tr
                        key={incidente.id}
                        className={
                          incidenteSelecionado?.id === incidente.id ? "selected" : ""
                        }
                        onClick={() => setIncidenteSelecionado(incidente)}
                      >
                        <td>{incidente.dataHora}</td>
                        <td>
                          <span className={`history-severity-pill ${incidente.severidade}`}>
                            {incidente.severidade}
                          </span>
                        </td>
                        <td>{incidente.incidente}</td>
                        <td>{incidente.origem}</td>
                        <td>{incidente.status}</td>
                        <td>{incidente.analista}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          </div>

          <aside className="history-right-column">
            {incidenteSelecionado ? (
              <>
                <article className="history-card">
                  <div className="history-card-header">
                    <div>
                      <h2>Linha do tempo do incidente</h2>
                      <small>{incidenteSelecionado.id}</small>
                    </div>
                  </div>

                  <div className="incident-summary">
                    <strong>{incidenteSelecionado.incidente}</strong>
                    <span>{incidenteSelecionado.dataHora}</span>
                  </div>

                  <div className="history-timeline">
                    <div>
                      <span>Detecção</span>
                      <p>
                        Evento identificado pela origem{" "}
                        {incidenteSelecionado.origem}.
                      </p>
                    </div>

                    <div>
                      <span>Triagem</span>
                      <p>
                        Incidente classificado como{" "}
                        {incidenteSelecionado.severidade} e encaminhado para análise.
                      </p>
                    </div>

                    <div>
                      <span>Status atual</span>
                      <p>
                        {incidenteSelecionado.status} por{" "}
                        {incidenteSelecionado.analista}.
                      </p>
                    </div>
                  </div>
                </article>

                <article className="history-card ai-history-card">
                  <div className="history-card-header">
                    <div>
                      <h2>Resumo IA (Mock)</h2>
                      <small>Sem integração com IA real</small>
                    </div>
                  </div>

                  <p>
                    O incidente selecionado apresenta sinais compatíveis com
                    atividade suspeita e exige validação do contexto antes de
                    qualquer ação definitiva.
                  </p>

                  <div className="history-confidence">
                    <span>Confiança da análise simulada</span>
                    <strong>91%</strong>
                    <div>
                      <i />
                    </div>
                  </div>

                  <h3>Recomendações simuladas</h3>
                  <ul>
                    <li>Revisar logs relacionados ao ativo de origem.</li>
                    <li>Correlacionar o evento com alertas das últimas 24 horas.</li>
                    <li>Validar se houve autenticação suspeita ou tráfego anômalo.</li>
                    <li>Registrar evidências antes de alterar o status do incidente.</li>
                  </ul>
                </article>
              </>
            ) : (
              <article className="history-card">
                <h2>Nenhum incidente selecionado</h2>
                <p>Os dados serão exibidos após o carregamento da API.</p>
              </article>
            )}
          </aside>
        </section>
      </main>
    </div>
  );
}

export default History;