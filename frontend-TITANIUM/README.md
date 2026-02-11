# TITANIUM | Gestão de Elite para Clínicas 🦷

Micro SaaS de alta performance desenvolvido para automatizar a gestão financeira, clínica e o marketing de consultórios odontológicos através de Inteligência Artificial.

## 🚀 Sobre o Projeto

O **TITANIUM** atua como o sistema operacional central da clínica, focado em três pilares:
1.  **Blindagem Financeira:** Gestão de recorrência no cartão (sem consumir limite), Split de pagamentos e controle de inadimplência.
2.  **Inteligência Artificial:** Automação de marketing (InstaSmile), Anamnese por voz (transcrição clínica) e Recall inteligente de pacientes.
3.  **Eficiência Operacional:** Agenda com lista de espera turbo, GED de exames e monitoramento de reputação (NPS).

## 🛠️ Tecnologias (Frontend)

Este projeto utiliza uma stack moderna focada em performance e UX:

- **Core:** [React](https://react.dev/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **UI & Estilização:** [Tailwind CSS](https://tailwindcss.com/) + [ShadcnUI](https://ui.shadcn.com/)
- **Gerenciamento de Estado:** [TanStack Query](https://tanstack.com/query/latest) (React Query)
- **Agenda:** [FullCalendar](https://fullcalendar.io/) (Visualizações de Dia, Semana, Mês)
- **Formulários:** React Hook Form + Zod (Validação robusta)
- **Gráficos:** Recharts
- **Ícones:** Lucide React

## 📦 Como rodar o projeto

Pré-requisitos: Node.js (versão 18 ou superior) instalado.

```bash
# 1. Clone este repositório
git clone <URL_DO_SEU_REPO>

# 2. Acesse a pasta do projeto
cd titanium-frontend

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev