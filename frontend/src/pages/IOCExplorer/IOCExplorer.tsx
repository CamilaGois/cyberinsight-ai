import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import { getApiIoCs, type ApiIoC } from "../../services/api";
import "./IOCExplorer.css";

function IOCExplorer() {
  const [iocs, setIocs] = useState<ApiIoC[]>([]);
  const [filtro, setFiltro] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState<string>("Todos");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    setCarregando(true);
    getApiIoCs()
      .then((dados) => {
        setIocs(dados);
        setCarregando(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar IoCs:", err);
        setErro("Erro ao carregar IoCs da API");
        setCarregando(false);
      });
  }, []);

  const tiposDisponiveis = [
    "Todos",
    ...Array.from(new Set(iocs.map((i) => i.tipo))),
  ];

  const iocsFiltrados = iocs.filter((ioc) => {
    const matchFiltro = ioc.valor
      .toLowerCase()
      .includes(filtro.toLowerCase()) ||
      ioc.classificacao.toLowerCase().includes(filtro.toLowerCase());

    const matchTipo = tipoFiltro === "Todos" || ioc.tipo === tipoFiltro;

    return matchFiltro && matchTipo;
  });

  const getSeveridadeColor = (severidade: string): string => {
    switch (severidade) {
      case "Crítica":
        return "#d32f2f";
      case "Alta":
        return "#f57c00";
      case "Média":
        return "#fbc02d";
      case "Baixa":
        return "#388e3c";
      default:
        return "#757575";
    }
  };

  const formatarData = (isoString: string): string => {
    const data = new Date(isoString);
    return data.toLocaleString("pt-BR");
  };

  const getTipoIcon = (tipo: string): string => {
    switch (tipo) {
      case "IPv4":
        return "🌐";
      case "Hash MD5":
      case "Hash SHA256":
        return "#️⃣";
      case "Domínio":
        return "🔗";
      case "Email":
        return "📧";
      case "URL":
        return "🔍";
      default:
        return "📌";
    }
  };

  return (
    <div className="ioc-layout">
      <Sidebar />

      <main className="ioc-main">
        <Topbar
          title="Explorador de IoCs"
          subtitle="Indicadores de Comprometimento - IPs, Hashes, Domínios e URLs Maliciosos"
        />

        <section className="ioc-container">
          <div className="ioc-filters">
            <div className="filter-group">
              <label htmlFor="tipo-select">Tipo de IoC:</label>
              <select
                id="tipo-select"
                value={tipoFiltro}
                onChange={(e) => setTipoFiltro(e.target.value)}
                className="filter-select"
              >
                {tiposDisponiveis.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="search-input">Buscar:</label>
              <input
                id="search-input"
                type="text"
                placeholder="Digite IP, domínio, hash ou classificação..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-stats">
              <span>{iocsFiltrados.length} de {iocs.length} registros</span>
            </div>
          </div>

          {carregando && (
            <div className="loading-state">
              <p>⏳ Carregando indicadores de comprometimento...</p>
            </div>
          )}

          {erro && (
            <div className="error-state">
              <p>❌ {erro}</p>
            </div>
          )}

          {!carregando && !erro && iocsFiltrados.length === 0 && (
            <div className="empty-state">
              <p>📭 Nenhum IoC encontrado com os filtros aplicados.</p>
            </div>
          )}

          {!carregando && !erro && iocsFiltrados.length > 0 && (
            <div className="ioc-table-wrapper">
              <table className="ioc-table">
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Indicador</th>
                    <th>Classificação</th>
                    <th>Severidade</th>
                    <th>Confiança</th>
                    <th>Primeira Detecção</th>
                    <th>Última Atividade</th>
                    <th>Geolocalização</th>
                    <th>Fonte</th>
                    <th>Correlatos</th>
                  </tr>
                </thead>
                <tbody>
                  {iocsFiltrados.map((ioc) => (
                    <tr key={ioc.id} className={`severity-${ioc.severidade.toLowerCase()}`}>
                      <td className="tipo-cell">
                        <span className="tipo-badge">
                          {getTipoIcon(ioc.tipo)} {ioc.tipo}
                        </span>
                      </td>
                      <td className="valor-cell">
                        <code className="ioc-valor">{ioc.valor}</code>
                      </td>
                      <td className="classificacao-cell">
                        {ioc.classificacao}
                      </td>
                      <td className="severidade-cell">
                        <span
                          className="severity-badge"
                          style={{
                            backgroundColor: getSeveridadeColor(
                              ioc.severidade
                            ),
                          }}
                        >
                          {ioc.severidade}
                        </span>
                      </td>
                      <td className="confianca-cell">
                        <div className="confidence-bar">
                          <div
                            className="confidence-fill"
                            style={{ width: `${ioc.confianca}%` }}
                          />
                          <span>{ioc.confianca}%</span>
                        </div>
                      </td>
                      <td className="data-cell">
                        {formatarData(ioc.primeira_deteccao)}
                      </td>
                      <td className="data-cell">
                        {formatarData(ioc.ultima_atividade)}
                      </td>
                      <td className="geoloc-cell">
                        <span className="geoloc-badge">{ioc.geoloc}</span>
                      </td>
                      <td className="fonte-cell">{ioc.fonte}</td>
                      <td className="relacionados-cell">
                        <span className="relacionados-badge">
                          {ioc.relacionados}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default IOCExplorer;
