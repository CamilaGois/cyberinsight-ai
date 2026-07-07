import { useRef, useState } from "react";
import "./LogInput.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";

type TipoLog =
  | "Windows Event"
  | "Syslog"
  | "Apache"
  | "Zeek"
  | "Suricata"
  | "Firewall";

const tiposLog: TipoLog[] = [
  "Windows Event",
  "Syslog",
  "Apache",
  "Zeek",
  "Suricata",
  "Firewall",
];

function LogInput() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [arquivo, setArquivo] = useState<File | null>(null);
  const [tipoSelecionado, setTipoSelecionado] = useState<TipoLog>("Windows Event");
  const [importado, setImportado] = useState(false);
  const [dragAtivo, setDragAtivo] = useState(false);

  function selecionarArquivo(file?: File) {
    if (!file) return;

    setArquivo(file);
    setImportado(false);
  }

  function importarLog() {
    if (!arquivo) return;

    setImportado(true);
  }

  return (
    <div className="log-layout">
      <Sidebar />

      <main className="log-main">
        <Topbar
          title="Entrada de Logs"
            subtitle="Importe logs para simular análise de incidentes de segurança"
          />

        <section className="log-content-grid">
          <div className="log-left-column">
            <article className="log-card">
              <div className="log-card-header">
                <div>
                  <h2>Upload de logs</h2>
                  <small>Envie um arquivo para simular a importação</small>
                </div>
              </div>

              <div
                className={`drop-zone ${dragAtivo ? "active" : ""}`}
                onDragOver={(event) => {
                  event.preventDefault();
                  setDragAtivo(true);
                }}
                onDragLeave={() => setDragAtivo(false)}
                onDrop={(event) => {
                  event.preventDefault();
                  setDragAtivo(false);
                  selecionarArquivo(event.dataTransfer.files[0]);
                }}
              >
                <div className="drop-icon">⇧</div>
                <h3>Arraste e solte seu arquivo de log aqui</h3>
                <p>Formatos simulados: .log, .txt, .json, .csv, .evtx</p>

                {arquivo && (
                  <div className="selected-file">
                    <strong>Arquivo selecionado:</strong>
                    <span>{arquivo.name}</span>
                  </div>
                )}

                <input
                  ref={inputRef}
                  type="file"
                  hidden
                  accept=".log,.txt,.json,.csv,.evtx"
                  onChange={(event) => selecionarArquivo(event.target.files?.[0])}
                />

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => inputRef.current?.click()}
                >
                  Selecionar Arquivo
                </button>
              </div>
            </article>

            <article className="log-card">
              <div className="log-card-header">
                <div>
                  <h2>Tipo de log</h2>
                  <small>Selecione a origem dos eventos importados</small>
                </div>
              </div>

              <div className="log-type-grid">
                {tiposLog.map((tipo) => (
                  <button
                    key={tipo}
                    type="button"
                    className={tipoSelecionado === tipo ? "selected" : ""}
                    onClick={() => setTipoSelecionado(tipo)}
                  >
                    <strong>{tipo}</strong>
                    <span>Parser simulado</span>
                  </button>
                ))}
              </div>

              <div className="import-footer">
                <div>
                  <span>Tipo selecionado</span>
                  <strong>{tipoSelecionado}</strong>
                </div>

                <button
                  type="button"
                  className="primary-button"
                  disabled={!arquivo}
                  onClick={importarLog}
                >
                  Importar Log
                </button>
              </div>
            </article>

            {importado && (
              <article className="log-card">
                <div className="log-card-header">
                  <div>
                    <h2>Resultado da importação</h2>
                    <small>Dados simulados após processamento do arquivo</small>
                  </div>
                </div>

                <div className="result-grid">
                  <div className="result-card blue">
                    <span>Eventos</span>
                    <strong>153</strong>
                  </div>

                  <div className="result-card yellow">
                    <span>Alertas</span>
                    <strong>27</strong>
                  </div>

                  <div className="result-card red">
                    <span>Críticos</span>
                    <strong>8</strong>
                  </div>

                  <div className="result-card purple">
                    <span>Severidade predominante</span>
                    <strong>Alta</strong>
                  </div>
                </div>
              </article>
            )}
          </div>

          <aside className="log-right-column">
            <article className="log-card ai-log-card">
              <div className="log-card-header">
                <div>
                  <h2>Análise IA (Mock)</h2>
                  <small>Sem integração com IA real</small>
                </div>
              </div>

              {!importado ? (
                <p className="empty-analysis">
                  Importe um arquivo de log para visualizar a análise simulada.
                </p>
              ) : (
                <>
                  <div className="analysis-file">
                    <span>Arquivo analisado</span>
                    <strong>{arquivo?.name}</strong>
                  </div>

                  <div className="confidence-box">
                    <span>Confiança</span>
                    <strong>94%</strong>
                    <div>
                      <i />
                    </div>
                  </div>

                  <div className="mitre-box">
                    <span>MITRE ATT&CK</span>
                    <strong>T1110 - Brute Force</strong>
                  </div>

                  <h3>Recomendações simuladas</h3>
                  <ul>
                    <li>Validar origem dos eventos críticos.</li>
                    <li>Bloquear IPs com múltiplas tentativas de autenticação.</li>
                    <li>Verificar contas com falhas repetidas de login.</li>
                    <li>Correlacionar eventos com histórico recente de incidentes.</li>
                  </ul>
                </>
              )}
            </article>

            <article className="log-card">
              <div className="log-card-header">
                <div>
                  <h2>Resumo operacional</h2>
                  <small>Contexto da importação</small>
                </div>
              </div>

              <div className="summary-list">
                <p>
                  Status <span>{arquivo ? "Arquivo carregado" : "Aguardando arquivo"}</span>
                </p>
                <p>
                  Origem <span>{tipoSelecionado}</span>
                </p>
                <p>
                  Modo <span>Simulado</span>
                </p>
                <p>
                  IA real <span>Não integrada</span>
                </p>
              </div>
            </article>
          </aside>
        </section>
      </main>
    </div>
  );
}

export default LogInput;