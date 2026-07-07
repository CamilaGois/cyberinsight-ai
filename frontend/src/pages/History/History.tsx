import { useMemo, useState } from "react";
import "./History.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";


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

const incidentesHistorico: IncidenteHistorico[] = [
  {
    id: "INC-2026-001",
    dataHora: "06/07/2026 10:30:12",
    severidade: "Crítica",
    incidente: "Tentativa de brute force detectada",
    origem: "192.168.1.45",
    status: "Em investigação",
    analista: "Camila Gois",
  },
  {
    id: "INC-2026-002",
    dataHora: "06/07/2026 10:28:45",
    severidade: "Alta",
    incidente: "Malware detectado em host",
    origem: "10.0.0.23",
    status: "Em análise",
    analista: "Camila Gois",
  },
  {
    id: "INC-2026-003",
    dataHora: "06/07/2026 10:25:31",
    severidade: "Alta",
    incidente: "Múltiplas tentativas de login falharam",
    origem: "172.16.0.10",
    status: "Novo",
    analista: "Equipe SOC N1",
  },
  {
    id: "INC-2026-004",
    dataHora: "06/07/2026 10:22:18",
    severidade: "Média",
    incidente: "Acesso a servidor fora do horário",
    origem: "10.0.0.15",
    status: "Em investigação",
    analista: "Equipe SOC N2",
  },
  {
    id: "INC-2026-005",
    dataHora: "06/07/2026 10:18:07",
    severidade: "Baixa",
    incidente: "Varredura de portas detectada",
    origem: "192.168.1.88",
    status: "Monitorando",
    analista: "Camila Gois",
  },
  {
    id: "INC-2026-006",
    dataHora: "06/07/2026 09:54:40",
    severidade: "Crítica",
    incidente: "Possível exfiltração de dados",
    origem: "10.0.2.19",
    status: "Contido",
    analista: "Equipe SOC N2",
  },
  {
    id: "INC-2026-007",
    dataHora: "06/07/2026 09:40:11",
    severidade: "Média",
    incidente: "Consulta DNS para domínio suspeito",
    origem: "172.16.4.22",
    status: "Resolvido",
    analista: "Camila Gois",
  },
  {
    id: "INC-2026-008",
    dataHora: "06/07/2026 09:12:03",
    severidade: "Baixa",
    incidente: "Tentativa de conexão RDP bloqueada",
    origem: "192.168.10.7",
    status: "Resolvido",
    analista: "Equipe SOC N1",
  },
];

function History() {
  const [busca, setBusca] = useState("");
  const [filtroSeveridade, setFiltroSeveridade] =
    useState<FiltroSeveridade>("Todos");
  const [incidenteSelecionado, setIncidenteSelecionado] =
    useState<IncidenteHistorico>(incidentesHistorico[0]);

  const incidentesFiltrados = useMemo(() => {
    return incidentesHistorico.filter((incidente) => {
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
  }, [busca, filtroSeveridade]);

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
            <strong>245</strong>
          </article>

          <article className="history-kpi-card red">
            <span>Críticos</span>
            <strong>18</strong>
          </article>

          <article className="history-kpi-card yellow">
            <span>Em investigação</span>
            <strong>34</strong>
          </article>

          <article className="history-kpi-card green">
            <span>Resolvidos</span>
            <strong>193</strong>
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
                          incidenteSelecionado.id === incidente.id ? "selected" : ""
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
                  <p>Evento identificado pela origem {incidenteSelecionado.origem}.</p>
                </div>

                <div>
                  <span>Triagem</span>
                  <p>
                    Incidente classificado como {incidenteSelecionado.severidade} e
                    encaminhado para análise.
                  </p>
                </div>

                <div>
                  <span>Status atual</span>
                  <p>{incidenteSelecionado.status} por {incidenteSelecionado.analista}.</p>
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
                O incidente selecionado apresenta sinais compatíveis com atividade
                suspeita e exige validação do contexto antes de qualquer ação definitiva.
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
          </aside>
        </section>
      </main>
    </div>
  );
}

export default History;