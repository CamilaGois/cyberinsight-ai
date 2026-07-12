import { Routes, Route, Navigate } from "react-router-dom";

import SOCDashboard from "../pages/SOCDashboard/SOCDashboard";
import LogInput from "../pages/LogInput/LogInput";
import History from "../pages/History/History";
import Playbook from "../pages/Playbook/Playbook";
import IOCExplorer from "../pages/IOCExplorer/IOCExplorer";
import Landing from "../pages/Landing/Landing";
import Login from "../pages/Login/Login";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SOCDashboard />} />
      <Route path="/logs" element={<LogInput />} />
      <Route path="/history" element={<History />} />
      <Route path="/playbook" element={<Playbook />} />
      <Route path="/ioc" element={<IOCExplorer />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}