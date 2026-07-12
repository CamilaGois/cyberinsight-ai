import { useRef, useState } from "react";
import "./LogInput.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import { importLogMock, type LogAnalysisResponse } from "../../services/api";

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
  const [analise, setAnalise] = useState<LogAnalysisResponse | null>(null);
  const [carregando, setCarregando] = useState(false);

  function selecionarArquivo(file?: File) {
    if (!file) return;

    setArquivo(file);
    setImportado(false);
    setAnalise(null);
  }

  async function importarLog() {
    if (!arquivo) return;

    setCarregando(true);
    try {
      const conteudo = await arquivo.text();
      const resultado = await importLogMock(conteudo);
      setAnalise(resultado);
      setImportado(true);
    } catch (erro) {
      console.error("Erro ao importar log:", erro);
      setImportado(false);
    } finally {
      setCarregando(false);
    }
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
                  disabled={!arquivo || carregando}
                  onClick={importarLog}
                >
                  {carregando ? "Processando..." : "Importar Log"}
                </button>
              </div>
            </article>

            {importado && analise && (
              <article className="log-card">
                <div className="log-card-header">
                  <div>
                    <h2>Resultado da importação</h2>
                    <small>Análise realizada via API</small>
                  </div>
                </div>

                <div className="result-grid">
                  <div className="result-card blue">
                    <span>Eventos processados</span>
                    <strong>{analise.eventos_processados}</strong>
                  </div>

                  <div className="result-card yellow">
                    <span>Alertas gerados</span>
                    <strong>{analise.alertas_gerados}</strong>
                  </div>

                  <div className="result-card red">
                    <span>Eventos críticos</span>
                    <strong>{analise.eventos_criticos}</strong>
                  </div>

                  <div className="result-card purple">
                    <span>Severidade predominante</span>
                    <strong>{analise.severidade_predominante}</strong>
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

              {!importado || !analise ? (
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
                    <span>Nível de risco geral</span>
                    <strong>{analise.resumo_executivo.risco_geral}</strong>
                    <div>
                      <i />
                    </div>
                  </div>

                  <div className="mitre-box">
                    <span>Ameaça identificada</span>
                    <strong>{analise.resumo_executivo.ameaca_identificada}</strong>
                  </div>

                  <h3>TTPs mapeadas (MITRE ATT&CK)</h3>
                  <ul>
                    {analise.resumo_executivo.ttps_mapeadas.map((ttp) => (
                      <li key={ttp}>{ttp}</li>
                    ))}
                  </ul>

                  <h3>Recomendação imediata</h3>
                  <p>{analise.resumo_executivo.recomendacao_imediata}</p>
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