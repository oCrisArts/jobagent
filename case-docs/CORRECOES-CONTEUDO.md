# GUIA DE CORREÇÕES PARA index.html
## Alterações mínimas de conteúdo - Foco na precisão

---

## 1. USER STORIES (DIA 1) - TRADUZIR PARA PORTUGUÊS

### ANTES (Linha ~425):
```html
<div class="highlight-box">
    <strong>Given</strong> que Lucas está logado com um currículo cadastrado,<br>
    <strong>When</strong> ele busca vagas para "Frontend Developer" em "Remote",<br>
    <strong>Then</strong> o sistema exibe uma lista de vagas ordenadas por % de compatibilidade com seu perfil.
</div>
```

### DEPOIS:
```html
<div class="highlight-box">
    <strong>Dado</strong> que Lucas está logado com um currículo cadastrado,<br>
    <strong>Quando</strong> ele busca vagas para "Frontend Developer" em "Remote",<br>
    <strong>Então</strong> o sistema exibe uma lista de vagas ordenadas por % de compatibilidade com seu perfil.
</div>
```

### APLICAR EM TODAS AS USER STORIES:
- Busca de Vagas
- Análise de Match (IA)
- Adaptação de Currículo (IA)
- Todos os exemplos do Dia 5

---

## 2. ESTRUTURA DO PROJETO (DIA 4) - CORRIGIR PARA NEXT.JS REAL

### ANTES (Tela 4 - Estrutura do Projeto):
```html
<h2>Estrutura de Rotas</h2>
<table>
    <thead>
        <tr>
            <th>#</th>
            <th>Tarefa</th>
            <th>Critério de Sucesso</th>
            <th>Tempo Máximo</th>
        </tr>
    </thead>
```

### DEPOIS:
```html
<h2>Estrutura de Rotas Next.js</h2>

<p>O projeto JobAgent segue a arquitetura modular do Next.js 15 App Router com internacionalização (EN + PT), autenticação via NextAuth, e integração com APIs de IA (Gemini + Claude).</p>

<pre style="background: #f5f5f5; padding: 1rem; border-radius: 4px; overflow-x: auto;"><code>app/
├── [locale]/
│   ├── page.tsx              → Landing Page
│   ├── pricing/page.tsx      → Planos (Free vs Pro)
│   ├── auth/page.tsx         → Login/Signup com Google OAuth
│   └── dashboard/
│       ├── page.tsx          → HUD Principal (Cockpit)
│       ├── buscar/page.tsx   → Busca de Vagas (agregada)
│       ├── curriculo/page.tsx → Gestão e upload de CV
│       └── historico/page.tsx → Histórico de candidaturas
│
├── api/
│   ├── ai/match/route.ts    → Análise de compatibilidade (Gemini)
│   ├── ai/adapt/route.ts    → Adaptação automática de CV (Claude)
│   ├── jobs/search/route.ts → Busca agregada de vagas
│   ├── resume/parse/route.ts → Parser de PDF para currículo
│   ├── auth/[...nextauth]/route.ts → Rotas de autenticação
│   └── stripe/webhook/route.ts → Webhooks de pagamento
│
├── components/
│   ├── Buscador.tsx         → Widget de busca de vagas
│   ├── LandingPage.tsx      → Página inicial
│   ├── LoginButton.tsx      → Botão de login
│   └── shared/
│       └── Navigation.tsx    → Navbar responsiva
│
├── lib/
│   ├── ai-utils.ts          → Funções de chamada à IA (Gemini/Claude)
│   └── auth.ts              → Configuração NextAuth
│
├── types/
│   └── next-auth.d.ts       → Tipagem de autenticação
│
└── middleware.ts            → Middleware para i18n e autenticação</code></pre>

<h3>Stack Tecnológico do MVP</h3>
<table>
    <thead>
        <tr>
            <th>Camada</th>
            <th>Tecnologia</th>
            <th>Versão</th>
            <th>Uso</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Frontend</strong></td>
            <td>Next.js + React</td>
            <td>15.x / 19.x</td>
            <td>App Router, SSR, componentes reativos</td>
        </tr>
        <tr>
            <td><strong>Estilo</strong></td>
            <td>Tailwind CSS + SCSS</td>
            <td>Último</td>
            <td>Design system, variáveis de tokens</td>
        </tr>
        <tr>
            <td><strong>I18n</strong></td>
            <td>next-intl</td>
            <td>3.26.x</td>
            <td>Internacionalização (EN + PT)</td>
        </tr>
        <tr>
            <td><strong>Auth</strong></td>
            <td>NextAuth + Google OAuth</td>
            <td>4.24.x</td>
            <td>Autenticação segura, SSO</td>
        </tr>
        <tr>
            <td><strong>Database</strong></td>
            <td>PostgreSQL (Supabase)</td>
            <td>-</td>
            <td>Dados de usuários, CVs, histórico</td>
        </tr>
        <tr>
            <td><strong>IA</strong></td>
            <td>Google Gemini + Claude</td>
            <td>Latest</td>
            <td>Match analysis, CV adaptation</td>
        </tr>
        <tr>
            <td><strong>Pagamentos</strong></td>
            <td>Stripe</td>
            <td>15.8.0</td>
            <td>Checkout, webhooks, subscriptions</td>
        </tr>
        <tr>
            <td><strong>Deploy</strong></td>
            <td>Vercel</td>
            <td>-</td>
            <td>Serverless, CI/CD automático</td>
        </tr>
    </tbody>
</table>

<h3>Banco de Dados — Tabelas Principais</h3>
<ul>
    <li><strong>profiles:</strong> Dados do usuário, preferências, locale, timezone</li>
    <li><strong>resumes:</strong> Currículos do usuário (versionamento de CVs)</li>
    <li><strong>job_applications:</strong> Histórico de candidaturas (vaga, data, status)</li>
    <li><strong>job_matches:</strong> Cache de análises de match (currículo vs vaga)</li>
    <li><strong>subscriptions:</strong> Dados de assinatura Stripe, status Pro/Free</li>
    <li><strong>pricing_plans:</strong> SKUs (Free, Pro) — facilita alteração de preços</li>
    <li><strong>gamification_progress:</strong> Streaks, barras de progresso, badges</li>
</ul>

<h3>Infraestrutura e Custos Mensais</h3>
<table>
    <thead>
        <tr>
            <th>Serviço</th>
            <th>Custo</th>
            <th>Escala</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Supabase (PostgreSQL + Auth)</td>
            <td>$25/mês</td>
            <td>Até 500k registros</td>
        </tr>
        <tr>
            <td>Vercel (Serverless)</td>
            <td>$20/mês</td>
            <td>Unlimited requests</td>
        </tr>
        <tr>
            <td>Google Gemini API</td>
            <td>~$20/mês (Free tier inicial)</td>
            <td>Por 100 users</td>
        </tr>
        <tr>
            <td>Claude API (Pro)</td>
            <td>~$30/mês</td>
            <td>Análise profunda para 100+ users</td>
        </tr>
        <tr>
            <td>Stripe (2.9% + $0.30)</td>
            <td>~$73/mês</td>
            <td>100 Pro users @ $14.90/mês</td>
        </tr>
        <tr>
            <td><strong>Total MVP</strong></td>
            <td><strong>~$168/mês</strong></td>
            <td><strong>100 Pro users</strong></td>
        </tr>
    </tbody>
</table>

<p><strong>Viabilidade:</strong> Breakeven com apenas 12 usuários Pro. Margem com 100 users: 88%. Com 500 users: 92%.</p>
```

---

## 3. PERSONAS (DIA 1) - ADICIONAR ILUSTRAÇÃO VISUAL

### ANTES (Tela 3 - Personas):
```html
<h3>Persona 1: Lucas — Desenvolvedor em Transição</h3>
<div class="highlight-box">
    <strong>Perfil:</strong> Desenvolvedor front-end, 27 anos, São Paulo. 3 anos de experiência. ...
</div>
```

### DEPOIS:
```html
<h3>Persona 1: Lucas — Desenvolvedor em Transição</h3>

<div class="card-grid">
    <div class="card-item" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none;">
        <div style="color: white; text-align: center;">
            <div style="font-size: 3rem; margin-bottom: 0.5rem;">👨‍💻</div>
            <h4 style="margin: 0; color: white;">Lucas</h4>
            <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem;">Frontend Developer</p>
            <p style="margin: 0.25rem 0; font-size: 0.85rem; opacity: 0.9;">📍 São Paulo</p>
            <p style="margin: 0.25rem 0; font-size: 0.85rem; opacity: 0.9;">27 anos • 3 anos exp.</p>
        </div>
    </div>
    <div class="card-item">
        <h4>Perfil Completo</h4>
        <p><strong>Salário Atual:</strong> R$ 6.000</p>
        <p><strong>Busca:</strong> Remote/Internacional (primeira oportunidade)</p>
        <p><strong>Budget:</strong> R$ 50-100/mês em ferramentas</p>
        <p style="margin-top: 1rem; font-size: 0.9rem;"><strong>Comportamento:</strong> Pesquisa 3x/semana em LinkedIn/Indeed. Gasta ~2h por candidatura manualmente. Abandona após 3 semanas sem retorno.</p>
    </div>
    <div class="card-item">
        <h4>🔴 Dores Centrais</h4>
        <ul style="margin: 0; padding-left: 1.5rem;">
            <li>Envia mesmo CV para todas as vagas → sem resposta</li>
            <li>Não sabe palavras-chave do ATS</li>
            <li>Perde horas em múltiplas plataformas</li>
            <li>Desmotivação após semanas sem retorno</li>
        </ul>
    </div>
    <div class="card-item" style="border-left-color: #4CAF50;">
        <h4>💡 Gatilho de Conversão</h4>
        <p>Ver resultado tangível na primeira adaptação de currículo. <strong>Momento "aha"</strong> quando visualiza CV transformado com palavras-chave certas.</p>
        <p style="margin-top: 1rem; font-size: 0.9rem;"><strong>Objeção de preço:</strong> Renda é limitada, mas pagaria $14.90/mês se economizar 2h/semana.</p>
    </div>
</div>
```

### APLICAR MESMO PADRÃO PARA SOFIA

---

## 4. BUSINESS MODEL CANVAS (DIA 1) - VISUALIZAÇÃO ASCII/BOX

### Já implementado no guia anterior — garantir que a versão renderizada no HTML exiba corretamente

---

## 5. DIAS 2-5: MELHORAR ILUSTRAÇÕES

### Adicionar boxes visuais para seções críticas:
- Lightning Demos → Cards com cores (cada referência diferente)
- Crazy 8s → Grupo de ideias em grid
- Fluxo de Storyboard → Timeline visual
- Framework HEART → Cards coloridos por métrica

---

## RESUMO DAS MUDANÇAS

| Seção | Mudança | Impacto |
|-------|---------|--------|
| User Stories | Dado/Quando/Então em PT | ✅ Semântica correta |
| Estrutura Projeto | Next.js real + tabelas de stack | ✅ Alinhado com código real |
| Personas | Ilustração visual com cards | ✅ Mais impactante |
| Business Model | Canvas ASCII visual | ✅ Melhor compreensão |
| Geral | Mais cards/grids vs tabelas | ✅ Menos árido |

---

**NOTA:** Essas mudanças mantêm o HTML como está (semântica/acessibilidade intacta), focando apenas no conteúdo textual das seções para maior precisão e impacto visual.
