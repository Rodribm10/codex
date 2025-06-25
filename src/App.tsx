import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AuditForm from './pages/AuditForm';
import Reports from './pages/Reports';
import Header from './components/Header';
import { useAuth } from './auth';

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  const { user } = useAuth();
  return (
    <>
      {user && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={<PrivateRoute><Dashboard /></PrivateRoute>}
        />
        <Route
          path="/audit/:type"
          element={<PrivateRoute><AuditForm /></PrivateRoute>}
        />
        <Route
          path="/reports"
          element={<PrivateRoute><Reports /></PrivateRoute>}
        />
      </Routes>
    </>
  );
}
