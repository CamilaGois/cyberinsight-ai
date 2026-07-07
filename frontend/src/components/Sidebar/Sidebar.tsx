import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      style={{
        width: 240,
        background: "#0f172a",
        color: "#fff",
        padding: 20,
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ marginBottom: 30 }}>
        🛡️ CyberInsight AI
      </h2>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 15,
        }}
      >
        <Link
          to="/"
          style={{
            color: "#fff",
            textDecoration: "none",
          }}
        >
          📊 SOC Dashboard
        </Link>

        <Link
          to="/logs"
          style={{
            color: "#fff",
            textDecoration: "none",
          }}
        >
          📥 Entrada de Logs
        </Link>

        <Link
          to="/history"
          style={{
            color: "#fff",
            textDecoration: "none",
          }}
        >
          📁 Histórico
        </Link>

        <Link
          to="/playbook"
          style={{
            color: "#fff",
            textDecoration: "none",
          }}
        >
          📚 Playbook
        </Link>
      </nav>
    </div>
  );
}