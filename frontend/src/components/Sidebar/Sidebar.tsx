import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const navItems = [
  { label: "Dashboard", path: "/" },
  { label: "Entrada de Logs", path: "/logs" },
  { label: "Histórico", path: "/history" },
  { label: "Playbooks", path: "/playbook" },
  { label: "Alertas", path: "/alerts" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="app-sidebar">
      <div className="app-brand">
        <div className="app-brand-icon">CI</div>
        <div>
          <strong>CyberInsight AI</strong>
          <small>Threat Detection Platform</small>
        </div>
      </div>

      <nav className="app-nav">
        <span>Principal</span>

        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={location.pathname === item.path ? "active" : ""}
          >
            {item.label}
          </Link>
        ))}

        <span>Análise</span>
        <Link to="/ioc">IOC Explorer</Link>

        <span>Sistema</span>
        <Link to="/settings">Configurações</Link>
      </nav>

      <div className="app-system-status">
        <strong>Status do sistema</strong>
        <p>
          Sistema <span>Operacional</span>
        </p>
        <p>
          Zeek <span>Conectado</span>
        </p>
        <p>
          Splunk API <span>Mock</span>
        </p>
      </div>
    </aside>
  );
}