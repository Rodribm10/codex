import { Link } from 'react-router-dom';
import { useAuth } from '../auth';

export default function Header() {
  const { user, logout } = useAuth();
  return (
    <header>
      <h1>Audit360 Hotéis</h1>
      <nav>
        <Link to="/">Auditorias</Link>
        <Link to="/reports">Relatórios</Link>
      </nav>
      <div>
        {user && (
          <>
            <span>{user.name} - {user.email}</span>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </header>
  );
}
