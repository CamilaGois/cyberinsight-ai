import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("camila.soc@cyberinsight.ai");
  const [password, setPassword] = useState("demo123");

  function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    navigate("/");
  }

  return (
    <div className="login-page">
      <section className="login-card">
        <div className="login-brand">
          <div className="login-logo">CI</div>
          <div>
            <strong>CyberInsight AI</strong>
            <span>Threat Detection Platform</span>
          </div>
        </div>

        <h1>Acesso SOC</h1>
        <p>
          Entre em modo demonstração para acessar o dashboard, logs, histórico e
          playbooks simulados.
        </p>

        <form onSubmit={handleLogin}>
          <label>
            E-mail
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          <label>
            Senha
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          <button type="submit">Entrar</button>
        </form>

        <button
          type="button"
          className="demo-button"
          onClick={() => navigate("/")}
        >
          Entrar em modo demonstração
        </button>

        <Link to="/landing" className="back-link">
          Voltar para Landing Page
        </Link>
      </section>

      <aside className="login-side">
        <span>IA Mock</span>
        <h2>Ambiente seguro para simular análise de incidentes.</h2>
        <ul>
          <li>Dashboard SOC</li>
          <li>Upload de logs</li>
          <li>Histórico de incidentes</li>
          <li>Playbooks simulados</li>
        </ul>
      </aside>
    </div>
  );
}