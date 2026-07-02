import { Routes, Route } from "react-router-dom";

function Home() {
  return <h2 style={{ padding: 20 }}>Dashboard OK 🔐</h2>;
}

function NewIncident() {
  return <h2 style={{ padding: 20 }}>Novo Incidente OK</h2>;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<NewIncident />} />
    </Routes>
  );
}
