import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Audit } from '../types';

export default function Dashboard() {
  const [audits, setAudits] = useState<Audit[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('audits');
    if (stored) setAudits(JSON.parse(stored));
  }, []);

  return (
    <div className="container">
      <h2>Auditorias</h2>
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/audit/limpeza">Nova Auditoria Limpeza</Link>
        {' | '}
        <Link to="/audit/operacao">Nova Auditoria Operação</Link>
        {' | '}
        <Link to="/audit/manutencao">Nova Auditoria Manutenção</Link>
      </div>
      {audits.map((a, i) => (
        <div key={i} className="audit-item">
          <strong>{a.type}</strong> - {a.date} - {a.responsible}
        </div>
      ))}
      {audits.length === 0 && <p>Nenhuma auditoria registrada.</p>}
    </div>
  );
}
