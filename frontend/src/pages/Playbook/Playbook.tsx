import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import { getApiPlaybooks, type ApiPlaybook } from "../../services/api";
import "./Playbook.css";

function Playbook() {
  const [playbooks, setPlaybooks] = useState<ApiPlaybook[]>([]);
  const [playbookSelecionado, setPlaybookSelecionado] = useState<ApiPlaybook | null>(null);
  const [statusExecucao, setStatusExecucao] = useState("");

  useEffect(() => {
    getApiPlaybooks()
      .then((dados) => {
        setPlaybooks(dados);
        setPlaybookSelecionado(dados[0] ?? null);
      })
      .catch((erro) => {
        console.error("Erro ao carregar playbooks da API:", erro);
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