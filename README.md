# TITANIUM | Sistema Operacional de Elite para Clínicas

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?style=for-the-badge)
![Status](https://img.shields.io/badge/status-STABLE-success.svg?style=for-the-badge)
![Engine](https://img.shields.io/badge/engine-Vite_5-646cff.svg?style=for-the-badge&logo=vite&logoColor=white)
![Language](https://img.shields.io/badge/language-TypeScript_5-3178c6.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Framework](https://img.shields.io/badge/framework-React_18-61dafb.svg?style=for-the-badge&logo=react&logoColor=black)
![License](https://img.shields.io/badge/license-PROPRIETARY-red.svg?style=for-the-badge)

> **"A odontologia não aceita mais amadorismo."**
> O TITANIUM é um ecossistema SaaS de alta performance que integra Gestão Clínica Avançada, Marketing via Inteligência Artificial e Automação de Relacionamento. Projetado para clínicas que operam em nível de elite.

---

## 📑 Sumário Executivo

1.  [Visão do Produto](#-visão-do-produto)
2.  [Arquitetura de Engenharia](#-arquitetura-de-engenharia)
3.  [Módulos & Capacidades](#-módulos--capacidades)
4.  [Stack Tecnológica Detalhada](#-stack-tecnológica-detalhada)
5.  [Estrutura de Código (Mapografia)](#-estrutura-de-código-mapografia)
6.  [Guia de Instalação & Setup](#-guia-de-instalação--setup)
7.  [Protocolos de Desenvolvimento](#-protocolos-de-desenvolvimento)
8.  [Testes & Qualidade](#-testes--qualidade)
9.  [Segurança & Compliance](#-segurança--compliance)
10. [Deploy & CI/CD](#-deploy--cicd)

---

## 🔭 Visão do Produto

O **TITANIUM Frontend** não é apenas uma interface; é uma aplicação SPA (Single Page Application) robusta construída sob a filosofia **Mobile-First**. O objetivo é eliminar o atrito entre o profissional de saúde e a tecnologia.

### Diferenciais Competitivos
* **Zero-Lag UI:** Implementação agressiva de *Optimistic Updates* e *Caching* inteligente para sensação de instantaneidade.
* **IA Nativa:** Integração profunda com modelos de linguagem e visão computacional (Gemini/GPT) para automação de tarefas cognitivas (Anamnese e Marketing).
* **Fluxo de Trabalho Guiado:** O sistema não espera o usuário clicar; ele sugere a próxima ação (Ex: Ao finalizar consulta, sugere automaticamente o NPS e o Agendamento de Retorno).

---

## 🏛 Arquitetura de Engenharia

O projeto segue uma arquitetura modular baseada em *Features*, desacoplando a lógica de negócios da camada de apresentação visual.

### Princípios Fundamentais
1.  **Server State Management:** Todo dado vindo da API é gerenciado pelo **TanStack Query**. Não usamos `useEffect` para chamadas de API manuais. Isso garante cache, deduplicação de requests e revalidação automática em segundo plano.
2.  **Type Safety Absoluta:** O TypeScript é configurado em modo estrito. Não é permitido o uso de `any`. As interfaces são compartilhadas e validadas em tempo de execução via **Zod**.
3.  **Atomic Design Adaptado:** Componentes UI (`src/components/ui`) são burros e estilizados via **Tailwind**. Componentes de negócio (`src/pages/*`) contêm a lógica e o estado.
4.  **Headless UI:** Utilizamos **Radix UI** (através do ShadcnUI) para garantir acessibilidade (a11y) nativa sem comprometer o design.

---

## 🚀 Módulos & Capacidades

O sistema opera através de 5 vetores principais de funcionalidade:

### 1. Centro de Comando (Agenda Inteligente)
* **Motor:** `@fullcalendar/react` altamente customizado.
* **Funcionalidades:**
    * Visualizações: Mês, Semana, Dia e Lista.
    * **Status Color-Coded:** Feedback visual imediato do estado do paciente (Confirmado, Em Atendimento, Faltou).
    * **Drag & Drop Persistente:** Reagendamento intuitivo com sincronização imediata no backend.
    * **Lista de Espera Turbo:** Sidebar que utiliza algoritmo de fila para preencher horários vagos automaticamente ("Tapa-Buraco").

### 2. Hub Clínico (Prontuário Eletrônico)
* **Conceito:** Uma linha do tempo infinita da saúde do paciente.
* **Funcionalidades:**
    * **Anamnese por Voz (IA):** O dentista dita a evolução, e a IA transcreve, estrutura e categoriza o texto no prontuário.
    * **GED Integrado:** Upload *Drag & Drop* de exames (DICOM, JPG, PDF) com visualizador (Lightbox) embutido e zoom de alta resolução.
    * **Override de Recall:** Sistema flexível que permite definir retornos personalizados (ex: 12 dias) que sobrescrevem as regras gerais da clínica.

### 3. Marketing Generator (InstaSmile)
* **Conceito:** Transformar o consultório em um estúdio de criação de conteúdo.
* **Funcionalidades:**
    * **Split-Screen Studio:** Interface para carregar foto "Antes" e "Depois".
    * **Processamento de Imagem:** Aplicação automática de *Watermark* (Logo) e ajustes de brilho/contraste.
    * **Copywriting IA:** O sistema analisa a imagem e gera 3 opções de legendas para Instagram focadas em conversão, respeitando o código de ética.

### 4. Gestão de Reputação (NPS)
* **Funcionalidades:**
    * **NPS em Tempo Real:** Dashboard visual (`recharts`) mostrando a saúde da marca.
    * **Filtro de Detratores:** Feedbacks negativos abrem tickets internos; feedbacks positivos (Promotores) são convidados a postar no Google Reviews.

### 5. Automação Operacional (Enfermeiro Robô)
* **Conceito:** Régua de relacionamento pós-procedimento.
* **Funcionalidades:**
    * Configuração de sequências de mensagens (WhatsApp) baseadas no tipo de tratamento (Ex: Extração vs Clareamento).
    * Monitoramento de palavras-chave de risco (ex: "Dor", "Sangue") nas respostas dos pacientes.

---

## 💻 Stack Tecnológica Detalhada

### Core
* **Runtime:** Node.js v18+
* **Build Tool:** Vite 5 (Rollup under the hood)
* **Framework:** React 18.3+

### Estilização & UI
* **CSS Framework:** Tailwind CSS 3.4
* **Component Library:** ShadcnUI (Radix Primitives)
* **Iconografia:** Lucide React
* **Animações:** Tailwindcss-animate

### State & Data
* **Async State:** TanStack Query v5
* **Global Client State:** React Context API (Auth, Theme)
* **Routing:** React Router DOM v6

### Formulários
* **Gerenciador:** React Hook Form (Uncontrolled components para performance)
* **Validação:** Zod (Schema-first validation)

### Utilitários
* **Datas:** date-fns (Imutável e leve)
* **HTTP:** Axios (Interceptadores de Request/Response)
* **Gráficos:** Recharts

---

## 🗺 Estrutura de Código (Mapografia)

Entenda onde cada peça do sistema se encaixa:

```text
src/
├── components/           # Blocos de construção da UI
│   ├── auth/             # Componentes de proteção (AuthGuard)
│   ├── Dashboard/        # Widgets complexos (NPS, KPIs)
│   ├── layout/           # Estrutura macro (Sidebar, Header)
│   └── ui/               # Biblioteca ShadcnUI (Button, Input, Sheet...)
│
├── contexts/             # Provedores de Estado Global
│   └── AuthContext.tsx   # Gerenciamento de Sessão/Token
│
├── hooks/                # Lógica Reutilizável (Custom Hooks)
│   ├── use-mobile.tsx    # Detecção de viewport
│   └── use-toast.ts      # Sistema de notificações
│
├── lib/                  # Configurações e Helpers
│   ├── axios.ts          # Instância Singleton do Axios
│   └── utils.ts          # Class merger (clsx + tailwind-merge)
│
├── pages/                # Rotas da Aplicação (Lazy Loaded)
│   ├── Agenda/           # Lógica do FullCalendar
│   ├── Marketing/        # Lógica do InstaSmile
│   ├── Patients/         # Detalhes, GED e Prontuário
│   ├── Settings/         # Configurações do Robô
│   ├── Login.tsx         # Entrada do sistema
│   └── LandingPage.tsx   # Página de Vendas (Public)
│
├── types/                # Definições de Tipos (TypeScript)
│   ├── auth.ts           # Interfaces de Usuário/Token
│   ├── clinic.ts         # Interfaces de Dados da Clínica
│   └── index.ts          # Tipos genéricos
│
└── test/                 # Configuração de Testes
    ├── setup.ts          # Mock de ambiente DOM
    └── example.test.ts   # Exemplos de uso
```
---

🔌 Guia de Instalação & Setup
Siga estes passos para levantar o ambiente de desenvolvimento local.

Pré-requisitos
Node.js 18 ou superior.

NPM, Yarn, PNPM ou Bun.

Passo 1: Clonar e Instalar
```text
Bash
git clone [https://github.com/jorlanh/titanium-frontend.git](https://github.com/jorlanh/titanium-frontend.git)
cd titanium-frontend

# Instalar dependências (Clean Install recomendado)
npm ci
# OU
npm install
```

Passo 2: Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto copiando a estrutura abaixo:

Snippet de código
```text
# URL da API Backend (Java/Spring)
VITE_API_URL=http://localhost:8080/api

# Configurações Opcionais
VITE_APP_NAME="TITANIUM"
VITE_Google_OAUTH_ID="seu-client-id-google"
```

Passo 3: Executar
Bash
```text
# Iniciar servidor de desenvolvimento (HMR ativo)
npm run dev
```
O sistema estará acessível em http://localhost:8080 (ou porta definida pelo Vite).

---
👨‍💻 Protocolos de Desenvolvimento
Para manter a qualidade "Elite", todo código deve seguir estas regras:

1. Regra do Componente Atômico
Se um componente na pasta pages/ ultrapassar 200 linhas, ele deve ser quebrado em sub-componentes menores e movido para uma pasta local ou components/.

2. Tratamento de Erros (Zod)
Nunca confie nos dados vindos do usuário ou da API. Use Zod para validar todas as entradas de formulário e, idealmente, as respostas da API.

```text
TypeScript
// Exemplo de Schema Obrigatório
const patientSchema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  email: z.string().email("Email inválido"),
});
```
3. Gerenciamento de Hooks
Lógica de negócios complexa (ex: calcular datas de retorno, processar upload de imagem) deve ser extraída para um Custom Hook dentro de src/hooks. A UI deve apenas renderizar dados, não processá-los.

4. Estilização
Não crie arquivos .css ou .scss separados (exceto globals). Use Tailwind Utility Classes. Se uma combinação de classes for usada repetidamente, abstraia para um componente ou use a função cva (Class Variance Authority).

---

🧪 Testes & Qualidade
O projeto utiliza Vitest para testes unitários e de integração.

Comandos de Teste
Bash
```text
# Rodar todos os testes uma vez
npm run test

# Rodar em modo Watch (desenvolvimento)
npm run test:watch
```

O que testar?
Funções utilitárias em src/lib.

Hooks customizados com lógica de estado complexa.

Renderização condicional crítica (ex: AuthGuard redirecionando usuários não logados).

---

🛡 Segurança & Compliance
Autenticação (JWT)
O Frontend não gerencia a validade do token. Ele apenas armazena e repassa.

Interceptor: O arquivo src/lib/axios.ts intercepta todas as requisições para anexar o token Bearer.

401 Handling: Se a API retornar 401 Unauthorized, o frontend deve limpar o estado de autenticação e redirecionar para /login.

Proteção de Rotas
O componente AuthGuard implementa RBAC (Role-Based Access Control) no Frontend.

ADMIN_PLATAFORMA: Vê o dashboard de Super Admin.

ADMIN_CLINICA: Vê a agenda e dados dos pacientes.

Sanitização
O React já protege contra XSS por padrão ao renderizar strings. No entanto, ao usar dangerouslySetInnerHTML (evite ao máximo), certifique-se de que o conteúdo foi sanitizado.

🚢 Deploy & CI/CD
Para gerar a versão de produção otimizada:

```text
Bash
npm run build
```
Isso gerará a pasta dist/ contendo:

HTML minificado.

Assets (JS/CSS) com hash no nome (para cache busting).

Imagens otimizadas.

Servidor Web: A pasta dist/ pode ser servida por qualquer servidor estático (Nginx, Apache, Vercel, Netlify, AWS S3). Certifique-se de configurar o servidor para redirecionar todas as rotas (404) para index.html (SPA Fallback).

TITANIUM Systems © 2026 Developed by Jorlan Heider
