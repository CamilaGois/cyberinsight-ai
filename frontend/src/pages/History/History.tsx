import { useEffect, useState } from "react";
import { getIncidents, type Incident } from "../../services/incidentStorage";

export default function History() {
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    setIncidents(getIncidents());
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>📁 Histórico de Incidentes</h1>

      <table
        style={{
          width: "100%",
          marginTop: 20,
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Severidade</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {incidents.map((i) => (
            <tr key={i.id}>
              <td>{i.id}</td>
              <td>{i.title}</td>
              <td>{i.severity}</td>
              <td>{i.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}