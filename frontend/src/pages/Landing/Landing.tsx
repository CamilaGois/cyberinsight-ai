import "./Landing.css";

const funcionalidades = [
  {
    titulo: "Dashboard SOC",
    descricao:
      "Visualização centralizada de incidentes, KPIs, alertas e status operacional.",
  },
  {
    titulo: "Entrada de Logs",
    descricao:
      "Interface para importação simulada de logs de segurança em diferentes formatos.",
  },
  {
    titulo: "Histórico",
    descricao:
      "Consulta e auditoria dos incidentes analisados durante a operação.",
  },
  {
    titulo: "Playbooks",
    descricao:
      "Procedimentos simulados para resposta a incidentes com base em severidade.",
  },
  {
    titulo: "IA (Mock)",
    descricao:
      "Resumos, recomendações e classificações simuladas sem uso de IA real.",
  },
  {
    titulo: "FastAPI",
    descricao:
      "Arquitetura planejada para futura integração com APIs e serviços inteligentes.",
  },
];

const tecnologias = [
  "React",
  "TypeScript",
  "FastAPI",
  "SQLite",
  "Codex",
  "ChatGPT",
  "GitHub",
];

const fluxo = [
  "Importação",
  "Análise IA (Mock)",
  "Classificação",
  "Resposta",
  "Histórico",
];

const roadmap = [
  "Hoje",
  "Mock",
  "Integração LLM",
  "RAG",
  "SIEM",
  "MITRE ATT&CK",
];

function Landing() {
  return (
    <main className="landing-page">
      <section className="landing-hero">
        <nav className="landing-nav">
          <div className="landing-logo">
            <div className="landing-logo-icon">CI</div>
            <strong>CyberInsight AI</strong>
          </div>

          <a
            href="https://github.com/CamilaGois/cyberinsight-ai"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </nav>

        <div className="hero-content">
          <div className="hero-text">
            <span className="hero-badge">SOC • IA Generativa • Segurança</span>

            <h1>
              Plataforma Inteligente para Análise de Incidentes de Segurança
            </h1>

            <p>
              O CyberInsight AI é um protótipo de plataforma para apoiar
              analistas SOC na visualização, organização e resposta a incidentes
              de segurança. Nesta etapa, todas as análises de IA são simuladas
              com dados mock, sem integração com modelos reais.
            </p>

            <div className="hero-actions">
              <a href="/dashboard" className="primary-action">
                Acessar Plataforma
              </a>

              <a
                href="https://github.com/CamilaGois/cyberinsight-ai"
                target="_blank"
                rel="noreferrer"
                className="secondary-action"
              >
                Ver Projeto no GitHub
              </a>
            </div>
          </div>

          <div className="hero-panel" aria-label="Prévia do painel SOC">
            <div className="hero-panel-header">
              <span />
              <span />
              <span />
            </div>

            <div className="hero-kpi-grid">
              <div>
                <span>Incidentes</span>
                <strong>128</strong>
              </div>
              <div>
                <span>Críticos</span>
                <strong>15</strong>
              </div>
              <div>
                <span>IA Mock</span>
                <strong>85%</strong>
              </div>
            </div>

            <div className="hero-chart">
              {Array.from({ length: 18 }, (_, index) => (
                <i
                  key={index}
                  style={{
                    height: `${28 + ((index * 11) % 62)}%`,
                  }}
                />
              ))}
            </div>

            <div className="hero-alert">
              <strong>Alerta ativo</strong>
              <span>Brute force detectado • MITRE T1110</span>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <div className="section-heading">
          <span>Funcionalidades</span>
          <h2>Estrutura preparada para uma operação SOC moderna</h2>
          <p>
            O protótipo reúne telas e fluxos essenciais para demonstrar como a
            IA Generativa poderá apoiar analistas em versões futuras.
          </p>
        </div>

        <div className="features-grid">
          {funcionalidades.map((funcionalidade) => (
            <article className="landing-card" key={funcionalidade.titulo}>
              <h3>{funcionalidade.titulo}</h3>
              <p>{funcionalidade.descricao}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section split-section">
        <div>
          <div className="section-heading left">
            <span>Fluxo</span>
            <h2>Fluxo da plataforma</h2>
            <p>
              A jornada simula desde a entrada de logs até o registro histórico
              do incidente analisado.
            </p>
          </div>

          <div className="flow-list">
            {fluxo.map((etapa, index) => (
              <div className="flow-item" key={etapa}>
                <strong>{etapa}</strong>
                {index < fluxo.length - 1 && <span>↓</span>}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="section-heading left">
            <span>Roadmap</span>
            <h2>Evolução prevista</h2>
            <p>
              A aplicação foi pensada para evoluir de um protótipo mock para uma
              solução integrada com LLM, RAG e fontes reais de segurança.
            </p>
          </div>

          <div className="roadmap-list">
            {roadmap.map((item, index) => (
              <div className="roadmap-item" key={item}>
                <strong>{item}</strong>
                {index < roadmap.length - 1 && <span>↓</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-section">
        <div className="section-heading">
          <span>Tecnologias</span>
          <h2>Stack utilizada e planejada</h2>
        </div>

        <div className="tech-grid">
          {tecnologias.map((tecnologia) => (
            <div key={tecnologia}>{tecnologia}</div>
          ))}
        </div>
      </section>

      <footer className="landing-footer">
        <p>
          Projeto desenvolvido para avaliação da disciplina IA Generativa.
          Protótipo sem backend funcional e sem integração com IA real.
        </p>
      </footer>
    </main>
  );
}

export default Landing;