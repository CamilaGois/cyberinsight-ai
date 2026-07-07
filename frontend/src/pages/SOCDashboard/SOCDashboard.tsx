import "./SOCDashboard.css";

type Severidade = "Crítica" | "Alta" | "Média" | "Baixa";

type Incidente = {
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

const incidentes: Incidente[] = [
  {
    horario: "10:30:12",
    severidade: "Crítica",
    titulo: "Tentativa de brute force detectada",
    origem: "192.168.1.45",
    status: "Em investigação",
  },
  {
    horario: "10:28:45",
    severidade: "Alta",
    titulo: "Malware detectado em host",
    origem: "10.0.0.23",
    status: "Em análise",
  },
  {
    horario: "10:25:31",
    severidade: "Alta",
    titulo: "Múltiplas tentativas de login falharam",
    origem: "172.16.0.10",
    status: "Novo",
  },
  {
    horario: "10:22:18",
    severidade: "Média",
    titulo: "Acesso a servidor fora do horário",
    origem: "10.0.0.15",
    status: "Em investigação",
  },
  {
    horario: "10:18:07",
    severidade: "Baixa",
    titulo: "Varredura de portas detectada",
    origem: "192.168.1.88",
    status: "Monitorando",
  },
];

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

function SOCDashboard() {
  return (
    <div className="soc-layout">
      <aside className="soc-sidebar">
        <div className="soc-brand">
          <div className="soc-brand-icon">CI</div>
          <strong>CyberInsight AI</strong>
        </div>

        <nav className="soc-nav">
          <span>Principal</span>
          <a className="active">Dashboard</a>
          <a>Entrada de Logs</a>
          <a>Histórico</a>
          <a>Playbooks</a>
          <a>Alertas</a>

          <span>Análise</span>
          <a>Zeek Explorer</a>

          <span>Sistema</span>
          <a>Configurações</a>
        </nav>

        <div className="soc-system-status">
          <strong>Status do sistema</strong>
          <p>
            Sistema <span>Operacional</span>
          </p>
          <p>
            Zeek <span>Conectado</span>
          </p>
          <p>
            Splunk API <span>Conectado</span>
          </p>
        </div>
      </aside>

      <main className="soc-main">
        <header className="soc-header">
          <div>
            <h1>SOC Dashboard</h1>
            <p>Visão geral da operação de segurança em tempo real</p>
          </div>

          <div className="soc-header-actions">
            <button type="button">Últimas 24 horas</button>

            <div className="soc-user">
              <span>C</span>
              <div>
                <strong>Camila Gois</strong>
                <small>Analista SOC</small>
              </div>
            </div>
          </div>
        </header>

        <section className="soc-kpi-grid">
          <article className="soc-kpi-card blue">
            <span>Incidentes totais</span>
            <strong>128</strong>
            <p>+12% vs últimas 24h</p>
          </article>

          <article className="soc-kpi-card red">
            <span>Incidentes críticos</span>
            <strong>15</strong>
            <p>+25% vs últimas 24h</p>
          </article>

          <article className="soc-kpi-card yellow">
            <span>Em investigação</span>
            <strong>8</strong>
            <p>-11% vs últimas 24h</p>
          </article>

          <article className="soc-kpi-card green">
            <span>Resolvidos</span>
            <strong>97%</strong>
            <p>+8% vs últimas 24h</p>
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
              <small>Total 128</small>
            </div>

            <div className="donut-row">
              <div className="mock-donut">
                <strong>128</strong>
                <span>Total</span>
              </div>

              <div className="incident-types">
                <p><span className="red-dot" /> Brute force <strong>28</strong></p>
                <p><span className="yellow-dot" /> Malware <strong>25</strong></p>
                <p><span className="blue-dot" /> Acesso suspeito <strong>22</strong></p>
                <p><span className="green-dot" /> Phishing <strong>18</strong></p>
                <p><span className="purple-dot" /> Outros <strong>35</strong></p>
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
                <strong>15</strong>
              </div>
              <div>
                <span>Alta</span>
                <i className="orange-bar" style={{ width: "70%" }} />
                <strong>35</strong>
              </div>
              <div>
                <span>Média</span>
                <i className="yellow-bar" style={{ width: "84%" }} />
                <strong>42</strong>
              </div>
              <div>
                <span>Baixa</span>
                <i className="green-bar" style={{ width: "72%" }} />
                <strong>36</strong>
              </div>
            </div>
          </article>
        </section>

        <section className="soc-content-grid">
          <div className="soc-left-column">
            <article className="soc-card">
              <div className="soc-card-header">
                <h2>Incidentes recentes</h2>
                <small>Dados simulados</small>
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
                      <tr key={`${incidente.horario}-${incidente.titulo}`}>
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
                <small>3 alertas</small>
              </div>

              <div className="active-alert red-alert">
                <strong>Brute force em andamento</strong>
                <span>192.168.1.45 - 10:30:12</span>
              </div>

              <div className="active-alert yellow-alert">
                <strong>Malware detectado</strong>
                <span>10.0.0.23 - 10:28:45</span>
              </div>

              <div className="active-alert yellow-alert">
                <strong>Acesso suspeito</strong>
                <span>172.16.0.10 - 10:25:31</span>
              </div>
            </article>

            <article className="soc-card ai-card">
              <div className="soc-card-header">
                <h2>Análise IA (Mock)</h2>
                <small>Sem IA real</small>
              </div>

              <p>A IA analisou 128 eventos simulados nas últimas 24 horas.</p>

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