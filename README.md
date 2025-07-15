# Audit360 Motéis

Aplicativo web em React + TypeScript para auditorias de motéis. O projeto foi criado manualmente com Vite e utiliza um backend simulado via `localStorage`.

## Scripts

- `npm run dev` inicia o servidor de desenvolvimento (requer dependências instaladas).
- `npm run build` gera a versão de produção.

## Funcionalidades

- Autenticação simples de usuário (Supervisor, Gestora e Diretor).
- Dashboard com listagem de auditorias e botão para iniciar novas auditorias.
- Formulários de checklist com opções "Conforme", "Não conforme leve", "Não conforme grave" e upload de fotos.
- Relatórios filtrados por unidade, data e responsável.
- Agenda de reuniões com cadastro de encontros.
- Tela de performance das gestoras (blackbelts) com resumo de auditorias.

As informações são salvas no `localStorage` do navegador e as imagens ficam codificadas em base64.
