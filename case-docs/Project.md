# JobAgent: Project Model Canvas

**Metodologia:** Project Model Canvas (PMC) — Gerenciamento ágil e visual do projeto  
**Data:** Junho 2026  
**Objetivo:** Planejar execução do MVP em 1 folha visual

---

## 📋 O Project Model Canvas (PMC)

O Project Model Canvas é uma metodologia ágil e visual desenvolvida por José Finocchio Júnior. Em vez de planos de texto tradicionais, usa uma única folha dividida em 13 blocos integrados que permitem planejamento colaborativo rápido com post-its.

A estrutura responde a **6 perguntas fundamentais** sobre o projeto:

---

## 🎯 1. POR QUÊ? (Justificativa)

### Justificativas
- **Problema Principal:** Candidatos aplicam em 100 vagas e recebem 0 entrevistas (PROBLEMA B)
- **Gap de Mercado:** Competidores focam em volume (LazyApply, LoopCV); ninguém foca em alignment
- **Oportunidade Pessoal:** Relocação profissional com inteligência, não força bruta
- **Diferencial:** AI-powered CV adaptation + smart matching (não apenas auto-apply)

### Objetivo SMART
- **Específico:** Plataforma que adapta CV em tempo real para cada vaga e calcula match score (0-100)
- **Mensurável:** 400+ PRO subscribers com 85%+ retention em 6 meses
- **Alcançável:** MVP com tecnologia existente (Claude API + Next.js); sem infraestrutura complexa
- **Relevante:** Resolve pain point real de candidates; diferencia de competitors
- **Tempo-Determinado:** MVP live em 8 semanas; R$ 6k/mês em 6 meses

### Benefícios
- **Para Candidate:** Menos rejeições, mais entrevistas, relocation mais rápida
- **Para JobAgent:** Premium positioning, recurring revenue, brand diferenciado
- **Para Mercado:** Abordagem alignment-first que ninguém oferece

---

## 📦 2. O QUÊ? (Produto)

### Produto (MVP Scope)
```
JobAgent: Plataforma de matching inteligente com CV adaptation
├── Job Search (aggregation)
├── ATS Analyzer (CV compatibility)
├── Match Score (0-100 visual)
├── CV Adapter (AI per-job)
├── SSI Gamification (career tracking)
└── Dashboard (history + metrics)
```

### Requisitos Essenciais
- [ ] Integração com Indeed, LinkedIn, Glassdoor APIs
- [ ] Parser de CV (PDF/DOCX) com keyword extraction
- [ ] Claude + Gemini API integração para adaptation
- [ ] Stripe para pagamento ($14.90/mth PRO)
- [ ] PostgreSQL com RLS (Supabase)
- [ ] Autenticação OAuth (LinkedIn)
- [ ] UX intuitiva (sem onboarding complexo)
- [ ] Performance: <1s match score, <3s CV adaptation

### Requisitos Não-Funcionais
- [ ] Zero critical bugs no MVP
- [ ] Deployed em Vercel (serverless)
- [ ] 99.9% uptime SLA
- [ ] GDPR compliant (CV data handling)
- [ ] Scalable architecture (prepare para 10k+ users)

---

## 👥 3. QUEM? (Pessoas)

### Stakeholders Externos
- **Job Aggregators:** Indeed, LinkedIn, Glassdoor (data permissions)
- **Payment Processor:** Stripe (subscription handling)
- **AI Providers:** OpenAI/Anthropic/Google (API access, rate limits)
- **Users:** Mid-career professionals relocating (5-10 years exp)
- **Market:** Competitors monitoring (MatchPro, LazyApply, LoopCV)

### Equipe Interna
- **Product Owner:** Cristiano (yourself)
  - Roadmap, user research, strategy decisions
  - Freemium model + pricing refinement
  - Go-to-market + community building

- **Engineer:** (You + potential contractor)
  - Full-stack development (Next.js + Node)
  - API integrations (Indeed, LinkedIn, Claude, Gemini, Stripe, Supabase)
  - Performance optimization, testing, deployment

- **Designer:** (Existing: Figma tokens ready)
  - UI/UX refinement based on user feedback
  - Design system maintenance (sync-sass-tokens)

- **QA:** (Automated + manual)
  - Playwright tests (BDD specs ready)
  - Manual testing on 10 beta users

### Key Roles During MVP
- **1 Engineer** (80% capacity on MVP)
- **1 PO** (100% capacity)
- **1 Designer** (20% capacity, existing tokens)
- **1 QA** (automated, 10% capacity)

---

## 🛠️ 4. COMO? (Passos)

### Premissas (Assumptions)
1. **Technical:** Next.js 15.5 + React 19 pode escalar para 10k users
2. **Market:** Mid-career professionals pagam $14.90/mth por qualidade
3. **Product:** CV adaptation + match score resolvem alignment problem
4. **Distribution:** LinkedIn + Twitter + word-of-mouth suficientes para 400 subscribers
5. **Timing:** MVP em 8 semanas sem hardware/infrastructure surprises

### Grupo de Entregas (Deliverables by Phase)

#### **Phase 0: Setup & Clean (Week 1) — 1 week**
- [ ] Architecture cleanup (Relatório de Pastas checklist)
- [ ] Design tokens sync (Figma → SASS)
- [ ] CI/CD pipeline (GitHub Actions + Vercel auto-deploy)
- [ ] Database migrations (Supabase RLS policies)
- [ ] Local dev environment ready
- [ ] **Output:** Clean repo, deployment ready

#### **Phase 1: Core Matching (Weeks 2-3) — 2 weeks**
- [ ] Job aggregation API (Indeed, LinkedIn, Glassdoor)
- [ ] CV parser + keyword extraction
- [ ] Match score algorithm (0-100)
- [ ] Job search UI + filtering
- [ ] **Output:** Prototype with working match scoring

#### **Phase 2: AI Adaptation (Weeks 4-5) — 2 weeks**
- [ ] Claude/Gemini integration for CV adaptation
- [ ] Real-time adaptation preview (side-by-side)
- [ ] Acceptance/rejection/refine flow
- [ ] **Output:** Core differentiator working

#### **Phase 3: Auth & Payments (Weeks 6-7) — 2 weeks**
- [ ] LinkedIn OAuth integration
- [ ] Stripe subscription setup ($14.90/mth)
- [ ] Freemium tier logic (API quota limits)
- [ ] Dashboard (history + SSI tracker)
- [ ] **Output:** Revenue ready

#### **Phase 4: Polish & Launch (Week 8) — 1 week**
- [ ] BDD tests (Playwright, Cucumber)
- [ ] Performance optimization
- [ ] Bug fixes from beta testing
- [ ] Landing page + onboarding flow
- [ ] **Output:** MVP live on Vercel

### Restrições (Constraints)
- **Budget:** $0 (no paid tools; use free/open-source)
- **Deadline:** MVP live by end of Week 8
- **Team:** Solo engineer + PO (you)
- **Tech Stack:** Next.js 15.5, React 19, TypeScript, Supabase, Vercel
- **Data:** GDPR compliance required (EU users possible)
- **APIs:** Rate limits on Indeed, LinkedIn, Claude API
- **Database:** Single PostgreSQL instance (Supabase free tier ok for MVP)

---

## ⚠️ 5. RISCOS (Fatores Externos)

### Riscos Técnicos
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| CV parser fails on complex PDFs | Medium | High | Use multiple parsers (pdf-parse + pdfkit); fallback to OCR |
| AI adaptation quality is poor | Medium | High | Conservative edits; show "suggested" only; let user refine |
| Job aggregation API rate limits | High | Medium | Cache results 2-4h; batch requests; use official APIs |
| Latency >3s on CV adaptation | Medium | High | Async processing; queue system; user timeout handling |
| Stripe payment failures | Low | High | Retry logic; manual invoice fallback |

### Riscos de Mercado
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| Competitors (LoopCV) add CV adaptation | Medium | High | Double down on match quality + SSI gamification |
| Low product-market fit | Low | Critical | Validate with 10 users in Design Sprint week 5 |
| Churn from low match quality | Medium | High | Education + filtering; show "why this job isn't a fit" |
| Users don't pay for premium | Low | Critical | Freemium tier with aggressive limits; A/B test pricing |

### Riscos Operacionais
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| Solo engineer burnout | Medium | High | Clear scope (MVP only); delegate QA to automation |
| Design tokens get out of sync | Low | Medium | Automate sync (sync-figma-tokens.js on every build) |
| Data breach (CVs are sensitive) | Low | Critical | Encryption at rest + in transit; GDPR audit; bug bounty |
| Deployment fails on day 1 | Low | Critical | Staging env identical to prod; smoke tests; rollback ready |

---

## 📅 6. QUANDO E QUANTO? (Prazos e Custos)

### Cronograma (Milestones)

```
Week 1:   Architecture cleanup + Design tokens sync
          [MILESTONE: Dev env ready]

Week 2-3: Core matching engine
          [MILESTONE: Match scoring prototype]

Week 4-5: AI CV adaptation
          [MILESTONE: Adaptation feature complete]

Week 6-7: Auth + Payments + Dashboard
          [MILESTONE: Revenue ready]

Week 8:   Polish + Launch
          [MILESTONE: MVP LIVE]

Month 3-6: Growth to 400 PRO subscribers
          [MILESTONE: R$ 6k/month]
```

### Linha do Tempo (Timeline)
- **Week 0:** Design Sprint validation (separate track)
- **Week 1-8:** MVP development (parallel with design sprint week 5 validation)
- **Week 9-24:** Iteration + growth

### Custos (Budget)

#### Free/Included
- Next.js 15.5 hosting (Vercel free tier)
- GitHub private repo
- PostgreSQL 500MB (Supabase free tier)
- Claude API + Gemini API (per-request cost)

#### Costs
| Item | Cost | Monthly |
|------|------|---------|
| Claude API (100k tokens) | Included | ~$1-5 |
| Gemini API (free tier) | Free | $0 |
| Stripe fees (2.9% + $0.30) | Variable | ~2-5% of revenue |
| Job API credits (Indeed) | Free | $0 |
| Domain (.com) | One-time $12 | $1/year |
| **Total MVP** | **~$13/month** | |

#### Revenue (Freemium Model)
| Tier | Price | Users (Month 6) | Revenue |
|------|-------|-----------------|---------|
| Free | $0 | 3000 | $0 |
| PRO | $14.90 | 400 | R$ 5,960 |
| **Total** | | **3400** | **R$ 5,960** |

**Goal:** R$ 6,000/month by end of Month 6 (target: 405 PRO subscribers at 14.90 BRL)

---

## ✅ Canvas Summary (Quick Reference)

| Block | What | Who Decides |
|-------|------|-----------|
| **Por quê?** | PROBLEMA B: alignment > volume | Cristiano (PM) |
| **O quê?** | Smart matching + CV adaptation | Product spec (this doc) |
| **Quem?** | Solo engineer + PO + designer | Team capacity |
| **Como?** | 4 delivery phases, 8 weeks | Dev timeline |
| **Riscos** | Technical + market + operational | Mitigation plans |
| **Quando/Quanto?** | Week 1-8 MVP, R$ 6k by month 6 | Budget + revenue |

---

## 🚀 Next Action

1. **Validate Canvas with team** (if you have one)
2. **Run Design Sprint Week 1-5** (parallel with architecture cleanup)
3. **Week 9 Day 1:** Start Phase 1 development
4. **Weekly:** Update this canvas with learnings

---

**Last Updated:** Junho 2026  
**Owner:** Cristiano  
**Status:** Ready for Development