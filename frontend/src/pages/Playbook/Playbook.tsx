import { useEffect, useState } from "react";
import { getPlaybook, type Playbook } from "../../services/playbookStorage";

export default function Playbook() {
  const [data, setData] = useState<Playbook[]>([]);

  useEffect(() => {
    setData(getPlaybook());

    const refresh = () => setData(getPlaybook());

    window.addEventListener("playbookUpdated", refresh);

    return () => {
      window.removeEventListener("playbookUpdated", refresh);
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>🧠 SOC Playbook</h1>

      {data.map((pb) => (
        <div key={pb.id} style={{ marginBottom: 20 }}>
          <h3>{pb.title}</h3>

          <ul>
            {pb.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}