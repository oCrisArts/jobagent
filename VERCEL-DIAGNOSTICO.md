# 🔍 Diagnóstico Vercel - Sync.IA Deploy Error

## ⚠️ Erros Mais Comuns e Soluções:

### **1️⃣ "Build failed: npm ERR!"**
```
Problema: Dependências faltando ou incompatíveis
Solução:
  - Vercel Settings > Environment Variables
  - Deletar todas as vars
  - Adicionar novamente
  - Redeploy
```

### **2️⃣ "Missing environment variables"**
```
Problema: Env vars não configuradas no Vercel
Solução:
  - Ir em: Vercel Dashboard > Settings > Environment Variables
  - Adicionar:
    NEXT_PUBLIC_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY
    SUPABASE_SERVICE_ROLE_KEY
    ANTHROPIC_API_KEY
    STRIPE_SECRET_KEY
    Etc...
```

### **3️⃣ "next: command not found"**
```
Problema: Build command não está correto
Solução:
  - Settings > General > Build & Output Settings
  - Build Command: npm run build
  - Output Directory: .next
```

### **4️⃣ "Cannot find module 'next-intl'"**
```
Problema: next-intl não foi instalado
Solução:
  - Verificar package.json tem: "next-intl": "^3.15.0"
  - Fazer push no GitHub
  - Vercel redeploy automático
```

### **5️⃣ "Port 3000 already in use"**
```
Problema: Porta conflict (raro no Vercel)
Solução:
  - Vercel usa porta dinâmica, ignorar
  - Ver se há outro erro real
```

### **6️⃣ "Module not found: ./middleware.ts"**
```
Problema: middleware.ts não existe ou caminho errado
Solução:
  - Verificar: app/middleware.ts existe?
  - npm run build localmente para testar
  - Fazer push se ok
```

### **7️⃣ "SyntaxError in .env"**
```
Problema: .env.production tem erro de sintaxe
Solução:
  - Não usar .env.production em Vercel (usar Dashboard)
  - Ou verificar sintaxe:
    VAR_NAME=value (sem espaços)
```

---

## 🔧 Verificação Pré-Deploy (CLI):

```powershell
cd "D:\xampp\htdocs\jobagent"

# 1. Verificar build local
npm run build

# 2. Verificar tipos TypeScript
npx tsc --noEmit

# 3. Verificar se next-intl está instalado
npm list next-intl

# 4. Verificar package.json
cat package.json | grep dependencies

# 5. Limpar e reinstalar
rm -r node_modules
npm install
npm run build
```

---

## 📊 Verificar Logs Vercel:

1. Vercel Dashboard → Seu Projeto → Deployments
2. Clique no último deployment (vermelho = erro)
3. Clique em "Build Logs"
4. Procure por erro (procure por "ERROR" ou "failed")
5. Anote o erro exato

---

## ✅ Checklist de Verificação:

- [ ] next-intl instalado? (package.json)
- [ ] middleware.ts existe? (app/middleware.ts)
- [ ] app/i18n.ts existe? (app/i18n.ts)
- [ ] messages/en.json existe? (messages/en.json)
- [ ] messages/pt.json existe? (messages/pt.json)
- [ ] Env vars adicionadas no Vercel Dashboard?
- [ ] Build command correto? (npm run build)
- [ ] Output directory correto? (.next)
- [ ] GitHub push feito?

---

## 🆘 Se Ainda Não Funcionar:

1. Copie o erro exato dos Build Logs
2. Compartilhe comigo
3. Vou debugar passo-a-passo
