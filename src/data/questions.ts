export interface Question {
  id: string;
  text: string;
}

export const limpeza: Question[] = [
  { id: 'l1', text: 'Quartos limpos' },
  { id: 'l2', text: 'Áreas comuns higienizadas' }
];

export const operacao: Question[] = [
  { id: 'o1', text: 'Atendimento cordial' },
  { id: 'o2', text: 'Tempo de espera adequado' }
];

export const manutencao: Question[] = [
  { id: 'm1', text: 'Equipamentos funcionando' },
  { id: 'm2', text: 'Estrutura sem danos' }
];
