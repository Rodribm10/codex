import { FormEvent, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { limpeza, operacao, manutencao, Question } from '../data/questions';
import { Audit } from '../types';
import { useAuth } from '../auth';

const options = ['Conforme', 'Não conforme leve', 'Não conforme grave'] as const;

export default function AuditForm() {
  const { type } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const questions: Question[] =
    type === 'limpeza' ? limpeza : type === 'operacao' ? operacao : manutencao;

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [photos, setPhotos] = useState<Record<string, string>>({});

  const handleFile = (q: string, files: FileList | null) => {
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotos((p) => ({ ...p, [q]: reader.result as string }));
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const stored = localStorage.getItem('audits');
    const audits: Audit[] = stored ? JSON.parse(stored) : [];
    const audit: Audit = {
      type: type || '',
      date: new Date().toISOString().substring(0, 10),
      responsible: user?.name || '',
      answers: questions.map((q) => ({
        questionId: q.id,
        status: (answers[q.id] as any) || 'Conforme',
        photo: photos[q.id]
      }))
    };
    audits.push(audit);
    localStorage.setItem('audits', JSON.stringify(audits));
    navigate('/');
  };

  return (
    <div className="container">
      <h2>Auditoria {type}</h2>
      <form onSubmit={handleSubmit}>
        {questions.map((q) => (
          <div key={q.id}>
            <label>{q.text}</label>
            <select
              value={answers[q.id] || 'Conforme'}
              onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
            >
              {options.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            <input type="file" accept="image/*" onChange={(e) => handleFile(q.id, e.target.files)} />
          </div>
        ))}
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
