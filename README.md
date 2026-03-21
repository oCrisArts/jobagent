# JobAgent 🎯

Agente inteligente para busca de vagas e adaptação de currículo com IA.

## Stack

- **Next.js 16** — Frontend + Backend (API Routes)
- **Claude API (Anthropic)** — Agente de IA
- **NextAuth.js** — Login com LinkedIn
- **JSearch (RapidAPI)** — Busca de vagas (LinkedIn, Indeed, Glassdoor)
- **Tailwind CSS** — Estilização

## Como rodar localmente

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/jobagent.git
cd jobagent
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
```bash
cp .env.example .env.local
```

Preencha o `.env.local` com suas chaves:

| Variável | Onde conseguir |
|---|---|
| `ANTHROPIC_API_KEY` | [console.anthropic.com](https://console.anthropic.com) |
| `LINKEDIN_CLIENT_ID` | [LinkedIn Developers](https://www.linkedin.com/developers/apps) |
| `LINKEDIN_CLIENT_SECRET` | [LinkedIn Developers](https://www.linkedin.com/developers/apps) |
| `NEXTAUTH_SECRET` | `openssl rand -base64 32` |
| `RAPIDAPI_KEY` | [RapidAPI JSearch](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch) |

### 4. Rode o projeto
```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

## Estrutura do projeto

```
/app
  /api
    /agent        → Agente Claude (chat + decisão de ação)
    /auth         → NextAuth + LinkedIn OAuth
    /jobs         → Busca de vagas via JSearch
    /resume       → Adaptação de currículo com IA
  layout.tsx
  page.tsx
  providers.tsx
/components
  ChatInterface.tsx   → Interface de chat principal
  JobCard.tsx         → Card de vaga
  LoginButton.tsx     → Botão login LinkedIn
```

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Importe o repositório no Vercel
2. Adicione as variáveis de ambiente no dashboard
3. Deploy automático a cada push na `main`
