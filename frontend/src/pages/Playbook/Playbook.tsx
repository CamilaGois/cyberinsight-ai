import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import "./Playbook.css";

type Severidade = "Crítica" | "Alta" | "Média";

type PlaybookItem = {
  id: string;
  nome: string;
  mitre: string;
  severidade: Severidade;
  confianca: number;
  tempoMedio: string;
  probabilidadeSucesso: number;
};

const playbooks: PlaybookItem[] = [
  {
    id: "brute-force",
    nome: "Brute Force",
    mitre: "T1110",
    severidade: "Crítica",
    confianca: 94,
    tempoMedio: "8 min",
    probabilidadeSucesso: 92,
  },
  {
    id: "malware",
    nome: "Malware",
    mitre: "T1055",
    severidade: "Alta",
    confianca: 91,
    tempoMedio: "12 min",
    probabilidadeSucesso: 89,
  },
  {
    id: "phishing",
    nome: "Phishing",
    mitre: "T1566",
    severidade: "Alta",
    confianca: 96,
    tempoMedio: "10 min",
    probabilidadeSucesso: 94,
  },
  {
    id: "port-scan",
    nome: "Port Scan",
    mitre: "T1046",
    severidade: "Média",
    confianca: 88,
    tempoMedio: "6 min",
    probabilidadeSucesso: 86,
  },
];

const etapas = [
  "Identificar evento",
  "Validar evidências",
  "Isolar ativo afetado",
  "Aplicar contenção",
  "Registrar encerramento",
];

const iocsSimulados = [
  "192.168.1.45",
  "185.199.108.153",
  "login-failed-threshold",
  "suspicious-auth-pattern",
];

const recomendacoes = [
  "Correlacionar eventos com os últimos alertas críticos.",
  "Validar escopo antes de aplicar contenção.",
  "Registrar evidências antes do encerramento.",
  "Revisar políticas de autenticação e bloqueio.",
];

function Playbook() {
  const [playbookSelecionado, setPlaybookSelecionado] = useState<PlaybookItem>(
    playbooks[0]
  );
  const [statusExecucao, setStatusExecucao] = useState("");

  function executarPlaybook() {
    setStatusExecucao("Playbook executado em modo simulado.");
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
                      <strong>{playbook.nome}</strong>
                      <span>MITRE: {playbook.mitre}</span>
                    </div>

                    <span className={`severity-pill ${playbook.severidade}`}>
                      {playbook.severidade}
                    </span>

                    <div className="playbook-meta">
                      <small>Confiança: {playbook.confianca}%</small>
                      <small>Tempo médio: {playbook.tempoMedio}</small>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section className="playbook-card">
              <div className="playbook-card-header">
                <div>
                  <h2>{playbookSelecionado.nome}</h2>
                  <p>Detalhamento do playbook selecionado.</p>
                </div>

                <span className={`severity-pill ${playbookSelecionado.severidade}`}>
                  {playbookSelecionado.severidade}
                </span>
              </div>

              <div className="selected-summary">
                <div>
                  <span>MITRE ATT&CK</span>
                  <strong>{playbookSelecionado.mitre}</strong>
                </div>

                <div>
                  <span>Confiança</span>
                  <strong>{playbookSelecionado.confianca}%</strong>
                </div>

                <div>
                  <span>Tempo estimado</span>
                  <strong>{playbookSelecionado.tempoMedio}</strong>
                </div>
              </div>

              <div className="steps-panel">
                <h3>Etapas do playbook</h3>

                <ol>
                  {etapas.map((etapa) => (
                    <li key={etapa}>{etapa}</li>
                  ))}
                </ol>
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
                  <h2>Análise IA (Mock)</h2>
                  <p>Resumo simulado sem integração com IA real.</p>
                </div>
              </div>

              <div className="success-score">
                <span>Probabilidade de sucesso</span>
                <strong>{playbookSelecionado.probabilidadeSucesso}%</strong>
                <div>
                  <i
                    style={{
                      width: `${playbookSelecionado.probabilidadeSucesso}%`,
                    }}
                  />
                </div>
              </div>

              <div className="side-section">
                <h3>IOC simulados</h3>
                <div className="ioc-list">
                  {iocsSimulados.map((ioc) => (
                    <span key={ioc}>{ioc}</span>
                  ))}
                </div>
              </div>

              <div className="side-section">
                <h3>Recomendações simuladas</h3>
                <ul>
                  {recomendacoes.map((recomendacao) => (
                    <li key={recomendacao}>{recomendacao}</li>
                  ))}
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