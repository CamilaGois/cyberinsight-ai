import { useRef, useState } from "react";
import "./LogInput.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import { analyzeLogWithAI, type IncidentAnalysis } from "../../services/api";

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
  const [analise, setAnalise] = useState<IncidentAnalysis | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  function selecionarArquivo(file?: File) {
    if (!file) return;

    setArquivo(file);
    setImportado(false);
    setAnalise(null);
    setErro(null);
  }

  async function importarLog() {
    if (!arquivo) return;

    setCarregando(true);
    setAnalise(null);
    setErro(null);
    try {
      const conteudo = await arquivo.text();
      const resultado = await analyzeLogWithAI(conteudo);
      setAnalise(resultado);
      setImportado(true);
    } catch (err) {
      console.error("Erro ao analisar log:", err);
      setImportado(false);
      setErro(err instanceof Error ? err.message : "Erro desconhecido ao analisar log");
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
                    <h2>Resultado da análise</h2>
                    <small>Análise realizada via IA</small>
                  </div>
                </div>

                <div className="result-grid">
                  <div className="result-card blue">
                    <span>Classificação</span>
                    <strong>{analise.classificacao}</strong>
                  </div>

                  <div className="result-card yellow">
                    <span>Severidade</span>
                    <strong>{analise.severidade}</strong>
                  </div>

                  <div className="result-card red">
                    <span>Confiança</span>
                    <strong>{analise.nivel_confianca}%</strong>
                  </div>

                  <div className="result-card purple">
                    <span>Playbook</span>
                    <strong>{analise.playbook_sugerido.nome || "N/A"}</strong>
                  </div>
                </div>
              </article>
            )}
          </div>

          <aside className="log-right-column">
            <article className="log-card ai-log-card">
              <div className="log-card-header">
                <div>
                  <h2>Análise IA</h2>
                  <small>Análise via SOC Agent</small>
                </div>
              </div>

              {carregando && (
                <p className="empty-analysis">Analisando log com IA...</p>
              )}

              {erro && !carregando && (
                <p className="empty-analysis" style={{ color: "var(--red, #e74c3c)" }}>
                  {erro}
                </p>
              )}

              {!carregando && !erro && (!importado || !analise) && (
                <p className="empty-analysis">
                  Importe um arquivo de log para visualizar a análise.
                </p>
              )}

              {!carregando && importado && analise && (
                <>
                  <div className="analysis-file">
                    <span>Arquivo analisado</span>
                    <strong>{arquivo?.name}</strong>
                  </div>

                  <div className="confidence-box">
                    <span>Classificação</span>
                    <strong>{analise.classificacao}</strong>
                  </div>

                  <div className="mitre-box">
                    <span>Severidade</span>
                    <strong>{analise.severidade}</strong>
                  </div>

                  <div className="confidence-box">
                    <span>Confiança</span>
                    <strong>{analise.nivel_confianca}%</strong>
                  </div>

                  <h3>Resumo executivo</h3>
                  <p>{analise.resumo_executivo}</p>

                  <h3>Evidências</h3>
                  <ul>
                    {analise.evidencias.map((ev, i) => (
                      <li key={i}>{ev}</li>
                    ))}
                  </ul>

                  <h3>Técnicas MITRE ATT&CK</h3>
                  <ul>
                    {analise.tecnicas_mitre_attck.map((tec) => (
                      <li key={tec.id}>
                        {tec.id} — {tec.nome} (confiança: {tec.confianca}%)
                      </li>
                    ))}
                  </ul>

                  <h3>IoCs relacionados</h3>
                  {analise.iocs_relacionados.length === 0 ? (
                    <p>Nenhum IoC detectado.</p>
                  ) : (
                    <ul>
                      {analise.iocs_relacionados.map((ioc, i) => (
                        <li key={i}>
                          {ioc.tipo}: {ioc.valor} (fonte: {ioc.fonte})
                        </li>
                      ))}
                    </ul>
                  )}

                  <h3>Recomendações</h3>
                  <ul>
                    {analise.recomendacoes.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>

                  <h3>Playbook sugerido</h3>
                  <p>{analise.playbook_sugerido.nome || "Nenhum playbook sugerido."}</p>
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
                  IA real <span>Integrada</span>
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