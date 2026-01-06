import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import RoleSelect from "./pages/RoleSelect";
import Dashboard from "./pages/CitizenDashboard"; 
import GovernmentDashboard from "./pages/GovernmentDashboard";
import GovernmentLogin from "./pages/GovernmentLogin";

export default function App() {
  return (
    <Router>
      <Routes>

        {}
        <Route path="/" element={<Landing />} />

        {}
        <Route path="/role" element={<RoleSelect />} />

        {}
        <Route path="/dashboard" element={<Dashboard />} />

        {}
        <Route path="/gov-login" element={<GovernmentLogin />} />
        <Route path="/gov-dashboard" element={<GovernmentDashboard />} />

      </Routes>
    </Router>
  );
}
