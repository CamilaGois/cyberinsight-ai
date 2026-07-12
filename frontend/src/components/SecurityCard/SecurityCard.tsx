import { ShieldAlert, AlertTriangle, Info, CheckCircle, Search } from 'lucide-react';

type Props = {
  title: string;
  severity: string;
  status: string;
  onAnalyze: () => void;
};

export default function SecurityCard({
  title,
  severity,
  status,
  onAnalyze,
}: Props) {
  
  // Função de mapeamento para ícones e cores
  const getSeverityStyle = (sev: string) => {
    const s = sev.toUpperCase();
    if (s === "CRÍTICA" || s === "CRITICAL") return { icon: <ShieldAlert size={20} />, color: "#ef4444" };
    if (s === "ALTA" || s === "HIGH") return { icon: <AlertTriangle size={20} />, color: "#f97316" };
    if (s === "MÉDIA" || s === "MEDIUM") return { icon: <Info size={20} />, color: "#eab308" };
    return { icon: <CheckCircle size={20} />, color: "#22c55e" };
  };

  const { icon, color } = getSeverityStyle(severity);

  return (
    <div
      style={{
        background: "#fff",
        borderLeft: `6px solid ${color}`,
        padding: 18,
        marginTop: 15,
        borderRadius: 10,
        boxShadow: "0 2px 8px rgba(0,0,0,.08)",
        transition: "0.2s",
      }}
    >
      <h3 style={{ marginBottom: 10, color: "#0f172a", display: "flex", alignItems: "center", gap: 8 }}>
        {icon} {title}
      </h3>

      <p style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
        <strong>Severidade:</strong> 
        <span style={{ color: color, fontWeight: 600 }}>{severity}</span>
      </p>

      <p style={{ marginBottom: 15 }}>
        <strong>Status:</strong> {status}
      </p>

      <button
        onClick={onAnalyze}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 16px",
          border: "none",
          background: "#0f172a",
          color: "#fff",
          borderRadius: 8,
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        <Search size={16} /> Analisar Log
      </button>
    </div>
  );
}