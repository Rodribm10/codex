import { useEffect, useState } from 'react';
import { Audit } from '../types';

interface Metric {
  responsible: string;
  total: number;
  severe: number;
}

export default function Performance() {
  const [metrics, setMetrics] = useState<Metric[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('audits');
    if (stored) {
      const audits: Audit[] = JSON.parse(stored);
      const map: Record<string, Metric> = {};
      audits.forEach((a) => {
        if (!map[a.responsible]) {
          map[a.responsible] = { responsible: a.responsible, total: 0, severe: 0 };
        }
        map[a.responsible].total += 1;
        if (a.answers.some((ans) => ans.status === 'Não conforme grave')) {
          map[a.responsible].severe += 1;
        }
      });
      setMetrics(Object.values(map));
    }
  }, []);

  return (
    <div className="container">
      <h2>Performance das Blackbelts</h2>
      {metrics.map((m) => (
        <div key={m.responsible} className="audit-item">
          <strong>{m.responsible}</strong> - Auditorias: {m.total} - Ocorrências graves: {m.severe}
        </div>
      ))}
      {metrics.length === 0 && <p>Nenhuma auditoria registrada.</p>}
    </div>
  );
}
