import { Routes, Route, Navigate } from "react-router-dom";

import SOCDashboard from "../pages/SOCDashboard/SOCDashboard";
import LogInput from "../pages/LogInput/LogInput";
import History from "../pages/History/History";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SOCDashboard />} />
      <Route path="/logs" element={<LogInput />} />
      <Route path="/history" element={<History />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}