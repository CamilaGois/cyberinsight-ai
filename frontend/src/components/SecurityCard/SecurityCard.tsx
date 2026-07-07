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
  const severityColor =
    severity === "ALTA"
      ? "#ff4d4f"
      : severity === "MÉDIA"
      ? "#faad14"
      : "#52c41a";

  return (
    <div
      style={{
        background: "#fff",
        borderLeft: `6px solid ${severityColor}`,
        padding: 18,
        marginTop: 15,
        borderRadius: 10,
        boxShadow: "0 2px 8px rgba(0,0,0,.08)",
        transition: "0.2s",
      }}
    >
      <h3
        style={{
          marginBottom: 10,
          color: "#0f172a",
        }}
      >
        🚨 {title}
      </h3>

      <p>
        <strong>Severidade:</strong> {severity}
      </p>

      <p>
        <strong>Status:</strong> {status}
      </p>

      <button
        onClick={onAnalyze}
        style={{
          marginTop: 15,
          padding: "10px 16px",
          border: "none",
          background: "#0f172a",
          color: "#fff",
          borderRadius: 8,
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        🔍 Analisar Log
      </button>
    </div>
  );
}