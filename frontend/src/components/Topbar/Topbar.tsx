import "./Topbar.css";

type TopbarProps = {
  title: string;
  subtitle: string;
};

export default function Topbar({ title, subtitle }: TopbarProps) {
  return (
    <header className="app-topbar">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="app-topbar-actions">
        <button type="button">Últimas 24 horas</button>

        <div className="app-user">
          <span>C</span>
          <div>
            <strong>Camila Gois</strong>
            <small>Analista SOC</small>
          </div>
        </div>
      </div>
    </header>
  );
}