export interface AuditAnswer {
  questionId: string;
  status: 'Conforme' | 'Não conforme leve' | 'Não conforme grave';
  photo?: string; // base64
}

export interface Audit {
  type: string;
  date: string;
  responsible: string;
  answers: AuditAnswer[];
}

export interface Meeting {
  id: number;
  date: string;
  subject: string;
  participants: string;
}
