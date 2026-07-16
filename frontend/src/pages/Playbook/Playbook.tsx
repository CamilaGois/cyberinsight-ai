import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import { getApiPlaybooks, type ApiPlaybook } from "../../services/api";
import "./Playbook.css";

const FALLBACK_PLAYBOOKS: ApiPlaybook[] = [
  {
    id: 1,
    tática_mitre: "Execution",
    técnica_mapeada: "T1059 – Command and Scripting Interpreter",
    confiança: 85,
    severidade: "Alta",
    tempo_estimado_min: 15,
    passos_de_mitigação: [
      "Isolar o ativo comprometido da rede corporativa",
      "Revogar credenciais suspeitas identificadas",
      "Coletar evidências dos logs de execução remota",
      "Aplicar regras de bloqueio no firewall de perímetro",
    ],
    isolamento_recomendado: true,
    prioridade: "Alta",
  },
  {
    id: 2,
    tática_mitre: "Persistence",
    técnica_mapeada: "T1547 – Boot or Logon Autostart Execution",
    confiança: 72,
    severidade: "Média",
    tempo_estimado_min: 25,
    passos_de_mitigação: [
      "Verificar entradas de inicialização automática no registro",
      "Remover scheduled tasks e services suspeitos",
      "Auditar alterações recentes em pastas de inicialização",
      "Restaurar configurações originais de boot",
    ],
    isolamento_recomendado: false,
    prioridade: "Média",
  },
  {
    id: 3,
    tática_mitre: "Exfiltration",
    técnica_mapeada: "T1048 – Exfiltration Over Alternative Protocol",
    confiança: 91,
    severidade: "Crítica",
    tempo_estimado_min: 20,
    passos_de_mitigação: [
      "Bloquear imediatamente o tráfego de saída para IPs suspeitos",
      "Analisar logs de proxy e DNS para identificar conexões anômalas",
      "Isolar o host afetado e coletar imagem forense da memória",
      "Notificar equipe de resposta a incidentes",
    ],
    isolamento_recomendado: true,
    prioridade: "Crítica",
  },
];

function Playbook() {
  const [playbooks, setPlaybooks] = useState<ApiPlaybook[]>([]);
  const [playbookSelecionado, setPlaybookSelecionado] = useState<ApiPlaybook | null>(null);
  const [statusExecucao, setStatusExecucao] = useState("");
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    getApiPlaybooks()
      .then((dados) => {
        setPlaybooks(dados);
        setPlaybookSelecionado(dados[0] ?? null);
        setErro(null);
      })
      .catch((erroCapturado) => {
        console.warn("API indisponível — usando dados simulados:", erroCapturado);
        setPlaybooks(FALLBACK_PLAYBOOKS);
        setPlaybookSelecionado(FALLBACK_PLAYBOOKS[0]);
        setErro("⚠ API indisponível — dados simulados.");
      });
  }, []);

  function executarPlaybook() {
    setStatusExecucao("Playbook executado em modo simulado.");
  }

  if (!playbookSelecionado) {
    return (
      <div className="playbook-layout">
        <Sidebar />
        <main className="playbook-main">
          <Topbar
            title="Playbooks SOC"
            subtitle="Procedimentos simulados de resposta a incidentes"
          />

          {erro && (
            <div className="playbook-banner warning">{erro}</div>
          )}

          <p>Carregando playbooks...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="playbook-layout">
      <Sidebar />

      <main className="playbook-main">
        <Topbar
          title="Playbooks SOC"
          subtitle="Procedimentos simulados de resposta a incidentes"
        />

        {erro && (
          <div className="playbook-banner warning">
            {erro}
          </div>
        )}

        <section className="playbook-grid">
          <div className="playbook-left-column">
            <section className="playbook-card">
              <div className="playbook-card-header">
                <div>
                  <h2>Catálogo de playbooks</h2>
                  <p>Selecione um procedimento para visualizar as etapas.</p>
                </div>
              </div>

              <div className="playbook-list">
                {playbooks.map((playbook) => (
                  <button
                    key={playbook.id}
                    type="button"
                    className={
                      playbookSelecionado.id === playbook.id
                        ? "playbook-item selected"
                        : "playbook-item"
                    }
                    onClick={() => {
                      setPlaybookSelecionado(playbook);
                      setStatusExecucao("");
                    }}
                  >
                    <div>
                      <strong>{playbook.tática_mitre}</strong>
                      <span>Técnica: {playbook.técnica_mapeada}</span>
                    </div>

                    <span className={`severity-pill ${playbook.severidade}`}>
                      {playbook.severidade}
                    </span>

                    <div className="playbook-meta">
                      <small>Confiança: {playbook.confiança}%</small>
                      <small>Tempo: {playbook.tempo_estimado_min} min</small>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section className="playbook-card">
              <div className="playbook-card-header">
                <div>
                  <h2>{playbookSelecionado.tática_mitre}</h2>
                  <p>Detalhamento do playbook selecionado.</p>
                </div>

                <span className={`severity-pill ${playbookSelecionado.severidade}`}>
                  {playbookSelecionado.severidade}
                </span>
              </div>

              <div className="selected-summary">
                <div>
                  <span>Técnica MITRE</span>
                  <strong>{playbookSelecionado.técnica_mapeada}</strong>
                </div>

                <div>
                  <span>Confiança</span>
                  <strong>{playbookSelecionado.confiança}%</strong>
                </div>

                <div>
                  <span>Tempo estimado</span>
                  <strong>{playbookSelecionado.tempo_estimado_min} min</strong>
                </div>

                <div>
                  <span>Prioridade</span>
                  <strong>{playbookSelecionado.prioridade}</strong>
                </div>
              </div>

              <div className="steps-panel">
                <h3>Passos de mitigação</h3>

                <ol>
                  {playbookSelecionado.passos_de_mitigação.map((passo, idx) => (
                    <li key={idx}>{passo}</li>
                  ))}
                </ol>
              </div>

              <div className="steps-panel">
                <h3>Isolamento recomendado</h3>
                <p>
                  {playbookSelecionado.isolamento_recomendado
                    ? "Sim - Isolar ativo afetado da rede"
                    : "Não - Monitorar sem isolar"}
                </p>
              </div>

              <div className="execution-area">
                <button type="button" onClick={executarPlaybook}>
                  Executar Playbook
                </button>

                {statusExecucao && <p>{statusExecucao}</p>}
              </div>
            </section>
          </div>

          <aside className="playbook-right-column">
            <section className="playbook-card ai-panel">
              <div className="playbook-card-header">
                <div>
                  <h2>Resumo do Playbook</h2>
                  <p>Informações de resposta simulada.</p>
                </div>
              </div>

              <div className="success-score">
                <span>Nível de confiança</span>
                <strong>{playbookSelecionado.confiança}%</strong>
                <div>
                  <i
                    style={{
                      width: `${playbookSelecionado.confiança}%`,
                    }}
                  />
                </div>
              </div>

              <div className="side-section">
                <h3>Severidade</h3>
                <span className={`severity-pill ${playbookSelecionado.severidade}`}>
                  {playbookSelecionado.severidade}
                </span>
              </div>

              <div className="side-section">
                <h3>Detalhes</h3>
                <ul>
                  <li>Tática: {playbookSelecionado.tática_mitre}</li>
                  <li>Prioridade: {playbookSelecionado.prioridade}</li>
                  <li>
                    Isolamento:{" "}
                    {playbookSelecionado.isolamento_recomendado
                      ? "Recomendado"
                      : "Não recomendado"}
                  </li>
                </ul>
              </div>
            </section>
          </aside>
        </section>
      </main>
    </div>
  );
}

export default Playbook;