import Dashboard from "../pages/Dashboard/Dashboard";
import IncidentForm from "../pages/IncidentForm/IncidentForm";
import Analysis from "../pages/Analysis/Analysis";
import History from "../pages/History/History";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/new" element={<IncidentForm />} />
      <Route path="/analysis" element={<Analysis />} />
      <Route path="/history" element={<History />} />
    </Routes>
  );
}
