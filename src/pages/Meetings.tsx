import { useEffect, useState, FormEvent } from 'react';
import { useAuth } from '../auth';
import { Meeting } from '../types';

export default function Meetings() {
  const { user } = useAuth();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [date, setDate] = useState('');
  const [subject, setSubject] = useState('');
  const [participants, setParticipants] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('meetings');
    if (stored) setMeetings(JSON.parse(stored));
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newMeeting: Meeting = {
      id: Date.now(),
      date,
      subject,
      participants,
    };
    const updated = [...meetings, newMeeting];
    setMeetings(updated);
    localStorage.setItem('meetings', JSON.stringify(updated));
    setDate('');
    setSubject('');
    setParticipants('');
  };

  return (
    <div className="container">
      <h2>Reuniões</h2>
      {user?.role !== 'Supervisor' && (
        <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
          <label>Data</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          <label>Assunto</label>
          <input value={subject} onChange={(e) => setSubject(e.target.value)} required />
          <label>Participantes</label>
          <input value={participants} onChange={(e) => setParticipants(e.target.value)} required />
          <button type="submit">Agendar</button>
        </form>
      )}
      {meetings.map((m) => (
        <div key={m.id} className="audit-item">
          <strong>{m.date}</strong> - {m.subject} - {m.participants}
        </div>
      ))}
      {meetings.length === 0 && <p>Nenhuma reunião agendada.</p>}
    </div>
  );
}
