import { useEffect, useState } from 'react';
import { Audit } from '../types';

export default function Reports() {
  const [audits, setAudits] = useState<Audit[]>([]);
  const [unit, setUnit] = useState('');
  const [responsible, setResponsible] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('audits');
    if (stored) setAudits(JSON.parse(stored));
  }, []);

  const filtered = audits.filter((a) => {
    return (
      (unit ? a.type === unit : true) &&
      (responsible ? a.responsible.includes(responsible) : true) &&
      (date ? a.date === date : true)
    );
  });

  return (
    <div className="container">
      <h2>Relatórios</h2>
      <div style={{ marginBottom: '1rem' }}>
        <label>Unidade</label>
        <select value={unit} onChange={(e) => setUnit(e.target.value)}>
          <option value="">Todas</option>
          <option value="limpeza">Limpeza</option>
          <option value="operacao">Operação</option>
          <option value="manutencao">Manutenção</option>
        </select>
        <label>Responsável</label>
        <input value={responsible} onChange={(e) => setResponsible(e.target.value)} />
        <label>Data</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      {filtered.map((a, i) => (
        <div key={i} className="audit-item">
          <strong>{a.type}</strong> - {a.date} - {a.responsible}
        </div>
      ))}
      {filtered.length === 0 && <p>Nenhum resultado.</p>}
    </div>
  );
}
