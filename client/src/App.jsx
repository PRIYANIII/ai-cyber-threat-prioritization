import { Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import AlertsPage from './pages/AlertsPage';
import DashboardPage from './pages/DashboardPage';
import ThreatEventsPage from './pages/ThreatEventsPage';

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/threats" element={<ThreatEventsPage />} />
        <Route path="/alerts" element={<AlertsPage />} />
      </Routes>
    </AppLayout>
  );
}
