# ✅ Configuração Final Vercel - Passo-a-Passo

## 📊 Você está aqui:
```
"New Project" screen com:
- Repository: oCrisArts/jobagent ✓
- Team: cristianoacostam-4390 (Hobby)
- Project Name: sync
- Framework: Next.js ✓
- Root Directory: ./
```

---

## 🔧 O que falta configurar (3 etapas):

### **ETAPA 1: Build and Output Settings**
Clique em **"Build and Output Settings"** para expandir:

```
Build Command: next build
Output Directory: .next
Install Command: npm install (deixar default)
Development Command: next dev (deixar default)
```

✅ Deixe como está (está correto)

---

### **ETAPA 2: Environment Variables** (IMPORTANTE!)
Clique em **"Environment Variables"** para expandir.

Adicione TODAS estas variáveis:

```
Nome da variável | Valor
─────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL | [do seu Supabase]
NEXT_PUBLIC_SUPABASE_ANON_KEY | [do seu Supabase]
SUPABASE_SERVICE_ROLE_KEY | [do seu Supabase]
NEXT_PUBLIC_APP_URL | https://sync.vercel.app
GOOGLE_GEMINI_API_KEY | [do Google Cloud]
ANTHROPIC_API_KEY | [do Anthropic]
STRIPE_PUBLIC_KEY | [do Stripe - não precisa ser secreto]
STRIPE_SECRET_KEY | [do Stripe - SECRETO]
STRIPE_WEBHOOK_SECRET | [gerado depois]
```

**Como adicionar:**
1. Clique em campo de entrada
2. Digite: `NEXT_PUBLIC_SUPABASE_URL`
3. Digite o valor (copiar de `.env.local` ou Supabase dashboard)
4. Clique "Add" ou Enter
5. Repita para cada variável

---

### **ETAPA 3: Deploy!**
Após adicionar as variáveis:

1. Clique no botão **azul "Deploy"** (canto inferior direito)
2. Aguarde ~5-10 minutos (vai compilar)
3. Verá: "Deployment successful!"

---

## ⚠️ Se não tiver as variáveis:

**Se não tem os valores ainda:**
1. Deixe as env vars em branco por enquanto
2. Clique "Deploy"
3. Depois você adiciona (Settings > Environment Variables)

---

## 📝 Checklist ANTES de clicar "Deploy":

- [ ] Project Name: `sync` ✓
- [ ] Framework: Next.js ✓
- [ ] Root Directory: `./` ✓
- [ ] Build Command: `next build` ✓
- [ ] Output Directory: `.next` ✓
- [ ] Env vars adicionadas (ou deixadas em branco)

---

## ✅ Pronto! Clique em "Deploy"!
