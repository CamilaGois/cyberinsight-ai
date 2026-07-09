import { useEffect, useState } from "react";
import "./SOCDashboard.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import { getApiIncidents, type ApiIncident } from "../../services/api";

type Severidade = "Crítica" | "Alta" | "Média" | "Baixa";

type Incidente = {
  id: number;
  horario: string;
  severidade: Severidade;
  titulo: string;
  origem: string;
  status: string;
};

type AtividadeRede = {
  origem: string;
  destino: string;
  porta: string;
  protocolo: string;
  bytes: string;
  descricao: string;
};

const atividadesRede: AtividadeRede[] = [
  {
    origem: "192.168.1.45",
    destino: "203.0.113.10",
    porta: "22",
    protocolo: "SSH",
    bytes: "1.2 KB",
    descricao: "Tentativa de SSH brute force",
  },
  {
    origem: "10.0.0.23",
    destino: "185.199.108.153",
    porta: "443",
    protocolo: "HTTPS",
    bytes: "5.7 KB",
    descricao: "Conexão com domínio suspeito",
  },
  {
    origem: "172.16.0.10",
    destino: "192.168.1.1",
    porta: "53",
    protocolo: "DNS",
    bytes: "512 B",
    descricao: "Consulta DNS suspeita",
  },
  {
    origem: "192.168.1.88",
    destino: "10.0.0.15",
    porta: "3389",
    protocolo: "RDP",
    bytes: "2.1 KB",
    descricao: "Tentativa de conexão RDP",
  },
];

const barrasTimeline = Array.from({ length: 26 }, (_, index) => ({
  baixa: 18 + ((index * 7) % 24),
  media: 14 + ((index * 5) % 22),
  alta: 10 + ((index * 9) % 20),
  critica: 6 + ((index * 4) % 18),
}));

function mapApiIncident(item: ApiIncident): Incidente {
  return {
    id: item.id,
    horario: "10:30:00",
    severidade: item.severity,
    titulo: item.title,
    origem: item.source,
    status: item.status,
  };
}

function SOCDashboard() {
  const [incidentes, setIncidentes] = useState<Incidente[]>([]);

  useEffect(() => {
    getApiIncidents()
      .then((dados) => {
        setIncidentes(dados.map(mapApiIncident));
      })
      .catch((erro) => {
        console.error("Erro ao carregar incidentes da API:", erro);
      });
  }, []);

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
    <div className="soc-layout">
      <Sidebar />

      <main className="soc-main">
        <Topbar
          title="SOC Dashboard"
          subtitle="Visão geral da operação de segurança em tempo real"
        />

        <section className="soc-kpi-grid">
          <article className="soc-kpi-card blue">
            <span>Incidentes totais</span>
            <strong>{incidentes.length}</strong>
            <p>Dados carregados via API</p>
          </article>

          <article className="soc-kpi-card red">
            <span>Incidentes críticos</span>
            <strong>{totalCriticos}</strong>
            <p>Prioridade alta no SOC</p>
          </article>

          <article className="soc-kpi-card yellow">
            <span>Em investigação</span>
            <strong>{totalInvestigacao}</strong>
            <p>Casos em análise</p>
          </article>

          <article className="soc-kpi-card green">
            <span>Resolvidos</span>
            <strong>{totalResolvidos}</strong>
            <p>Incidentes encerrados</p>
          </article>
        </section>

        <section className="soc-chart-grid">
          <article className="soc-card timeline-card">
            <div className="soc-card-header">
              <h2>Timeline de eventos</h2>
              <small>Visualização simulada</small>
            </div>

            <div className="timeline-legend">
              <span className="critica">Críticos</span>
              <span className="alta">Altos</span>
              <span className="media">Médios</span>
              <span className="baixa">Baixos</span>
            </div>

            <div className="timeline-bars">
              {barrasTimeline.map((barra, index) => (
                <div className="timeline-bar" key={index}>
                  <i className="baixa" style={{ height: `${barra.baixa}%` }} />
                  <i className="media" style={{ height: `${barra.media}%` }} />
                  <i className="alta" style={{ height: `${barra.alta}%` }} />
                  <i className="critica" style={{ height: `${barra.critica}%` }} />
                </div>
              ))}
            </div>
          </article>

          <article className="soc-card">
            <div className="soc-card-header">
              <h2>Tipos de incidente</h2>
              <small>Total {incidentes.length}</small>
            </div>

            <div className="donut-row">
              <div className="mock-donut">
                <strong>{incidentes.length}</strong>
                <span>Total</span>
              </div>

              <div className="incident-types">
                <p><span className="red-dot" /> Brute force <strong>1</strong></p>
                <p><span className="yellow-dot" /> Malware <strong>1</strong></p>
                <p><span className="blue-dot" /> Acesso suspeito <strong>0</strong></p>
                <p><span className="green-dot" /> Phishing <strong>0</strong></p>
                <p><span className="purple-dot" /> Outros <strong>1</strong></p>
              </div>
            </div>
          </article>

          <article className="soc-card">
            <div className="soc-card-header">
              <h2>Severidade dos incidentes</h2>
              <small>Distribuição</small>
            </div>

            <div className="severity-list">
              <div>
                <span>Crítica</span>
                <i className="red-bar" style={{ width: "36%" }} />
                <strong>{totalCriticos}</strong>
              </div>
              <div>
                <span>Alta</span>
                <i className="orange-bar" style={{ width: "70%" }} />
                <strong>
                  {incidentes.filter((i) => i.severidade === "Alta").length}
                </strong>
              </div>
              <div>
                <span>Média</span>
                <i className="yellow-bar" style={{ width: "84%" }} />
                <strong>
                  {incidentes.filter((i) => i.severidade === "Média").length}
                </strong>
              </div>
              <div>
                <span>Baixa</span>
                <i className="green-bar" style={{ width: "72%" }} />
                <strong>
                  {incidentes.filter((i) => i.severidade === "Baixa").length}
                </strong>
              </div>
            </div>
          </article>
        </section>

        <section className="soc-content-grid">
          <div className="soc-left-column">
            <article className="soc-card">
              <div className="soc-card-header">
                <h2>Incidentes recentes</h2>
                <small>Dados vindos da API FastAPI</small>
              </div>

              <div className="soc-table-wrap">
                <table className="soc-table">
                  <thead>
                    <tr>
                      <th>Horário</th>
                      <th>Severidade</th>
                      <th>Título</th>
                      <th>Origem</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>

                  <tbody>
                    {incidentes.map((incidente) => (
                      <tr key={incidente.id}>
                        <td>{incidente.horario}</td>
                        <td>
                          <span className={`severity-pill ${incidente.severidade}`}>
                            {incidente.severidade}
                          </span>
                        </td>
                        <td>{incidente.titulo}</td>
                        <td>{incidente.origem}</td>
                        <td>{incidente.status}</td>
                        <td>
                          <button className="table-action" type="button">
                            Ver
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            <article className="soc-card">
              <div className="soc-card-header">
                <h2>Atividade de Rede (Zeek)</h2>
                <small>Eventos simulados</small>
              </div>

              <div className="soc-table-wrap">
                <table className="soc-table">
                  <thead>
                    <tr>
                      <th>Origem</th>
                      <th>Destino</th>
                      <th>Porta</th>
                      <th>Protocolo</th>
                      <th>Bytes</th>
                      <th>Descrição</th>
                    </tr>
                  </thead>

                  <tbody>
                    {atividadesRede.map((atividade) => (
                      <tr key={`${atividade.origem}-${atividade.destino}-${atividade.porta}`}>
                        <td>{atividade.origem}</td>
                        <td>{atividade.destino}</td>
                        <td>{atividade.porta}</td>
                        <td>{atividade.protocolo}</td>
                        <td>{atividade.bytes}</td>
                        <td>{atividade.descricao}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          </div>

          <aside className="soc-right-column">
            <article className="soc-card">
              <div className="soc-card-header">
                <h2>Alertas ativos</h2>
                <small>{incidentes.length} alertas</small>
              </div>

              {incidentes.map((incidente) => (
                <div
                  key={incidente.id}
                  className={
                    incidente.severidade === "Crítica"
                      ? "active-alert red-alert"
                      : "active-alert yellow-alert"
                  }
                >
                  <strong>{incidente.titulo}</strong>
                  <span>{incidente.origem} - {incidente.horario}</span>
                </div>
              ))}
            </article>

            <article className="soc-card ai-card">
              <div className="soc-card-header">
                <h2>Análise IA (Mock)</h2>
                <small>Sem IA real</small>
              </div>

              <p>
                A IA analisou {incidentes.length} eventos retornados pela API nas
                últimas 24 horas.
              </p>

              <div className="risk-score">
                <span>Probabilidade de ameaça crítica</span>
                <strong>85%</strong>
                <div>
                  <i />
                </div>
              </div>

              <h3>Recomendações simuladas</h3>
              <ul>
                <li>Bloquear IPs maliciosos identificados.</li>
                <li>Verificar integridade dos hosts afetados.</li>
                <li>Revisar políticas de autenticação.</li>
                <li>Priorizar investigação dos eventos críticos.</li>
              </ul>
            </article>
          </aside>
        </section>
      </main>
    </div>
  );
}

export default SOCDashboard;