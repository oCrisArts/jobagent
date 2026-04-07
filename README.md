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

## Design tokens & sincronização com Figma

Este projeto inclui um arquivo de design tokens em formato DTCG em `design-tokens/dtcg.tokens.json` e usa variáveis CSS definidas em `app/globals.css` para manter o design system. Para facilitar a sincronização com o arquivo Figma, há um utilitário que converte tokens em variáveis CSS e atualiza `app/globals.css`.

O utilitário:
- Script: `scripts/sync-figma-tokens.js`
- Backup automático: cria backups em `scripts/backups/` antes de sobrescrever `app/globals.css`.
- Arquivo local padrão de tokens: `design-tokens/dtcg.tokens.json`
- Arquivo globals padrão: `app/globals.css`

Como usar localmente:
1. Defina sua chave do Figma como variável de ambiente (não a comite):
```bash
# export (mac/linux)
export FIGMA_TOKEN=figd_XXXXXXXXXXXX
# Windows PowerShell
$env:FIGMA_TOKEN="figd_XXXXXXXXXXXX"
```

2. Rodar sincronização (busca do Figma se o token estiver presente; caso contrário usa o arquivo local):
```bash
npm run sync-tokens
# ou (modo fetch explícito)
npm run figma:fetch
```

Opções do script:
- `--fileKey <FIGMA_FILE_KEY>` — especifica o fileKey do Figma (padrão: 1D3V3IzG38D6t8Z2qdWhBd)
- `--globals <path/to/globals.css>` — alterar caminho do globals a ser atualizado
- `--local <path/to/local/tokens.json>` — alterar caminho do tokens local
- `--dry-run` — gera o bloco de variáveis no stdout sem escrever arquivos

Observações de segurança e fluxo:
- Nunca comite `FIGMA_TOKEN` em repositórios públicos. Use `.env.local` ou variáveis de ambiente no CI.
- O script tenta obter tokens do arquivo Figma (procurando por nodos de texto contendo JSON), e, se não encontrar, usa o arquivo local `design-tokens/dtcg.tokens.json`.
- Antes de sobrescrever `app/globals.css`, o script salva um backup em `scripts/backups/`.

Sobre Tailwind vs SASS
- Atualmente o projeto usa Tailwind CSS e variáveis CSS em `app/globals.css` para manter a paridade com o design system do Figma.
- Se você prefere SASS, é possível migrar o pipeline para usar SCSS/SASS (Next.js suporta SASS). Um caminho comum:
  1. Adicionar dependência `sass`.
  2. Converter `globals.css` para `globals.scss` e importar onde necessário.
  3. Mapear as variáveis CSS para variáveis SASS (ou gerar um arquivo `_tokens.scss` usando este mesmo script).
- Observação: Tailwind não "usa SASS" por si só — ele gera classes utilitárias. Mas você pode combinar Tailwind com SASS para lógica e mixins que preferir.

Exemplo rápido para CI:
- No pipeline, execute:
```bash
# set FIGMA_TOKEN no ambiente do CI
npm ci
npm run sync-tokens     # atualiza globals.css com tokens mais recentes
npm run build
```

Se quiser, posso:
- Adicionar um exemplo de `.env.example` com comentário sobre `FIGMA_TOKEN`.
- Gerar um arquivo `_tokens.scss` a partir dos tokens (para facilitar migração para SASS).
- Rodar o script aqui (se você autorizar e fornecer a token temporária) e mostrar o diff gerado em `app/globals.css`.

