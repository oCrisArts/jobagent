# 🚀 GUIA RÁPIDO: GitHub Push + Vercel Deploy

## PARTE 1: Push no GitHub (5 minutos)

### Pré-requisitos:
- Git instalado
- Token GitHub criado (Settings > Developer settings > Personal access tokens)

### Abra PowerShell em `D:\xampp\htdocs\jobagent`:

```powershell
# 1. Ver status
git status

# 2. Adicionar tudo
git add -A

# 3. Commit com mensagem
git commit -m "feat: Sync.IA Sprint 1 + i18n Invisível

- Passo Zero: Supabase, Stripe, Package.json
- Sprint Dia 1: Análise negócio global (USD), 5 personas
- i18n Invisível: URLs limpas, cookie/header-based
- Estrutura: app/ sem [locale], messages/ com EN+PT
- Global: TAM 300M, profissionais diversos
- Documentação: /sprints/ (14 artefatos)"

# 4. Push (primeira vez pode pedir token)
git push origin main
```

## PARTE 2: Deploy no Vercel (3 minutos)

### Opção A: Via CLI (Automático)

```powershell
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Login no Vercel
vercel login

# 3. Deploy (na pasta do projeto)
cd "D:\xampp\htdocs\jobagent"
vercel

# Responder:
# "Set up and deploy?" → Y
# "Which scope?" → Seu nome/organização
# "Link to existing project?" → N (primeira vez)
# "Project name?" → sync-ia
# "Root directory?" → ./
# "Build command?" → next build
# "Output directory?" → .next

# 4. Deploy para produção
vercel --prod
```

### Opção B: Via Web (Manual)

1. Acesse https://vercel.com/dashboard
2. Clique em "New Project"
3. Clique em "Import Git Repository"
4. Autentique com GitHub
5. Selecione o repositório `jobagent`
6. Configure:
   - **Framework**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `next build`
   - **Output Directory**: `.next`
7. Clique "Deploy"

## PARTE 3: Variáveis de Ambiente (1 minuto)

No Vercel Dashboard, vá para **Settings > Environment Variables** e adicione:

```
NEXT_PUBLIC_SUPABASE_URL=seu_valor
NEXT_PUBLIC_SUPABASE_ANON_KEY=seu_valor
SUPABASE_SERVICE_ROLE_KEY=seu_valor
GOOGLE_CLIENT_ID=seu_valor
GOOGLE_CLIENT_SECRET=seu_valor
GOOGLE_GEMINI_API_KEY=seu_valor
LINKEDIN_CLIENT_ID=seu_valor
LINKEDIN_CLIENT_SECRET=seu_valor
ANTHROPIC_API_KEY=seu_valor
STRIPE_PUBLIC_KEY=seu_valor
STRIPE_SECRET_KEY=seu_valor
STRIPE_WEBHOOK_SECRET=seu_valor
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=seu_valor
NEXT_PUBLIC_APP_URL=https://seu-app.vercel.app
```

## Resultado Final

✅ GitHub: https://github.com/oCrisArts/jobagent
✅ Vercel: https://sync-ia.vercel.app (ou seu domínio)
✅ Live: Seu app global em produção!

## Troubleshooting

**Erro "fatal: not a git repository"**
```powershell
cd "D:\xampp\htdocs\jobagent"
git init
git remote add origin https://github.com/oCrisArts/jobagent.git
git branch -M main
```

**Erro no Vercel: Missing env variables**
→ Adicionar em Settings > Environment Variables

**Erro: "Build failed"**
→ Verificar `npm run build` localmente antes

---

**Total: ~9 minutos para ter tudo online!** 🎉
