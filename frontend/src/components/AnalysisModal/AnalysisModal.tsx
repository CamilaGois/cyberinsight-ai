type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  severity: string;
};

export default function AnalysisModal({
  open,
  onClose,
  title,
  severity,
}: Props) {
  if (!open) return null;

  const analysis =
    severity === "ALTA"
      ? {
          confidence: "96%",
          mitre: "T1110 - Brute Force",
          summary:
            "Foi identificado um possível ataque de força bruta com múltiplas tentativas de autenticação em curto intervalo de tempo.",
          recommendations: [
            "Bloquear temporariamente o endereço IP de origem",
            "Habilitar autenticação multifator (MFA)",
            "Alterar as credenciais comprometidas",
            "Verificar indicadores de comprometimento (IoCs)",
            "Monitorar novas tentativas de acesso",
          ],
        }
      : severity === "MÉDIA"
      ? {
          confidence: "88%",
          mitre: "T1046 - Network Service Discovery",
          summary:
            "Foi detectada uma atividade de reconhecimento de rede compatível com varredura de portas.",
          recommendations: [
            "Validar a origem da conexão",
            "Revisar regras do firewall",
            "Monitorar novas conexões",
            "Correlacionar eventos no SIEM",
          ],
        }
      : {
          confidence: "73%",
          mitre: "T1078 - Valid Accounts",
          summary:
            "Evento considerado de baixo risco, porém deve permanecer em monitoramento.",
          recommendations: [
            "Registrar o evento",
            "Continuar monitorando",
            "Revisar logs periodicamente",
          ],
        };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          width: 700,
          background: "#fff",
          borderRadius: 10,
          padding: 30,
          boxShadow: "0 8px 24px rgba(0,0,0,.2)",
        }}
      >
        <h2>🤖 CyberInsight AI</h2>

        <hr />

        <h3>{title}</h3>

        <p>
          <strong>Severidade:</strong> {severity}
        </p>

        <p>
          <strong>Confiança da análise:</strong> {analysis.confidence}
        </p>

        <p>
          <strong>MITRE ATT&CK:</strong> {analysis.mitre}
        </p>

        <p>
          <strong>Resumo da análise</strong>
        </p>

        <p>{analysis.summary}</p>

        <h3>Recomendações</h3>

        <ul>
          {analysis.recommendations.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <button
          onClick={onClose}
          style={{
            marginTop: 20,
            padding: "10px 18px",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            background: "#0f172a",
            color: "#fff",
          }}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}