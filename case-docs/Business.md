# JobAgent: Business Model Canvas & Value Proposition Canvas

**Data:** Junho 2026  
**Objetivo:** Mapear modelo de negócio + encaixe produto-mercado  
**Metodologia:** BMC (Alex Osterwalder) + VPC

---

## 📊 PARTE 1: Business Model Canvas (BMC)

O Business Model Canvas é um mapa visual de 9 blocos que descreve como JobAgent cria, entrega e captura valor.

### 📌 Blocos do BMC

```
┌─────────────────┬──────────────────────┬──────────────────┬──────────────────┬──────────────────┐
│ Parcerias Chave │ Atividades Chave     │ Proposta de Valor│ Relacionamento   │ Segmentos        │
│                 │                      │                  │ com Clientes     │ de Clientes      │
│ • APIs Aggreg   │ • Job Aggregation    │ • Smart Matching │ • Community      │ • Mid-career     │
│ • Stripe        │ • CV Analysis        │ • CV Adaptation  │   (Twitter)      │   (5-10 yrs)     │
│ • Claude/Gemini │ • Match Scoring      │ • SSI Gaming     │ • Email Alerts   │ • Career         │
│ • Supabase      │ • Subscription Mgmt  │ • Premium UX     │ • Support        │   Changers       │
│ • LinkedIn OAuth│                      │                  │ • SSI Leaderboard│ • Remote-first   │
├─────────────────┼──────────────────────┴──────────────────┼──────────────────┼──────────────────┤
│ Recursos Chave  │    Canais            │    Canais        │   Canais         │
│                 │                      │                  │                  │
│ • Next.js stack │ • Web app (vercel)   │ • LinkedIn       │ • Landing page   │
│ • PostgreSQL    │ • Mobile (future)    │ • Twitter        │ • Product Hunt   │
│ • Claude API    │ • Email newsletter   │ • Referrals      │ • Word-of-mouth  │
│ • Design tokens │ • Community          │ • Partnerships   │ • Bootcamps      │
├─────────────────┴──────────────────────┴──────────────────┴──────────────────┴──────────────────┤
│ Estrutura de Custos                    │ Fontes de Receita                                      │
│                                        │                                                       │
│ • Claude API (~$1-5/mth)              │ • PRO subscription: $14.90/mth (400 users = R$6k)   │
│ • Vercel hosting (free)               │ • Future: Affiliate (Indeed sponsorship)             │
│ • Stripe fees (2.9% + $0.30)          │ • Future: Recruiter access (B2B)                     │
│ • Domain (~$1/mth)                    │ • Future: Interview prep (add-on)                     │
│ • Total: ~$10-15/mth                  │ • Total: R$ 6,000/mth (goal in 6 months)           │
└────────────────────────────────────────┴────────────────────────────────────────────────────────┘
```

---

### 👥 QUEM (O Mercado)

#### Segmentos de Clientes
1. **Primary:** Mid-career professionals (5-10 years exp) relocating roles/cities
   - Pain: 100 applications, 0 interviews
   - Willingness to pay: High (relocating is expensive)
   - Volume: ~50k+ in Brazil alone

2. **Secondary:** Career changers (bootcamp grads, skill switchers)
   - Pain: Resume mismatch with new industry
   - Willingness to pay: Medium (lower budget)
   - Volume: ~10k+/year in Brazil

3. **Tertiary:** Remote-first job seekers (global opportunities)
   - Pain: Time zone barriers, visa complications
   - Willingness to pay: Medium-high
   - Volume: Growing segment

#### Canais (Como chegar aos clientes)
- **Awareness:** Twitter, LinkedIn, ProductHunt, HackerNews
- **Acquisition:** Organic (word-of-mouth from early users)
- **Engagement:** In-app SSI tracker, email newsletters
- **Retention:** Community (leaderboard), support, feature updates
- **Expansion:** Referral program, partnerships with bootcamps

#### Relacionamento com Clientes
- **Freemium Model:** Low-friction signup; see product before paying
- **Email Alerts:** "New matching jobs in your area" (engaged users)
- **Community:** SSI leaderboard (gamification keeps users returning)
- **Support:** In-app chat + email (responsive to early users)
- **Listening:** Gather feedback → inform roadmap

---

### 📦 O QUÊ (A Solução)

#### Proposta de Valor
```
For: Mid-career professionals relocating
Who: Want to find aligned jobs faster
Unlike: MatchPro (manual), LazyApply (mass apply), LoopCV (passive ATS)
We: Intelligently match + adapt CV per job, so you get interviews
Result: Quality > quantity; relocation in 6 months, not 18
Price: $14.90/mth (10x cheaper than MatchPro, 25% cheaper than LazyApply)
```

#### Produtos & Serviços
1. **Smart Job Search**
   - Aggregate Indeed, LinkedIn, Glassdoor, AngelList
   - Filter by salary, location, remote, company size, industry
   - Show match score immediately

2. **ATS Analyzer**
   - Parse candidate's CV
   - Extract skills, keywords, experience
   - Score CV compatibility (0-100)
   - Show missing keywords

3. **Match Score**
   - Technical fit (ATS)
   - Salary alignment
   - Growth potential
   - Culture match (Glassdoor data)
   - Remote/location fit
   - **Result:** 0-100 visual + brief reasoning

4. **AI CV Adapter**
   - Real-time adaptation per job
   - Claude/Gemini rewrite CV bullets
   - Highlight relevant experience
   - Side-by-side: original vs adapted
   - User can refine, reject, or accept

5. **SSI Gamification**
   - Points for complete profile, quality apps, interview → offer
   - Leaderboard (cohort comparison)
   - Badges ("Aligned Applicant," "Culture Fit Master")
   - Career progression tracking

6. **Dashboard**
   - Application history (status tracking)
   - SSI score + progression
   - Insights: success rate, match distribution
   - Export CV variants

---

### 🛠️ COMO (A Operação)

#### Atividades Chave
1. **Job Aggregation:** Ingest from Indeed, LinkedIn, Glassdoor APIs; deduplicate
2. **CV Analysis:** Parse + keyword extraction; ATS scoring algorithm
3. **Matching:** Compare CV vs job description; calculate multi-factor match score
4. **AI Adaptation:** Claude/Gemini integration; generate optimized CV variants
5. **Subscription Mgmt:** Stripe integration; freemium tier enforcement
6. **Community:** Leaderboard tracking; SSI calculation; badge awarding

#### Recursos Chave
- **Technology:** Next.js 15.5, React 19, TypeScript, Supabase PostgreSQL, Vercel
- **AI:** Claude API + Google Gemini (per-request cost)
- **Data:** Job data (Indeed, LinkedIn), CV parsing (pdf-parse), ATS algorithms
- **Infrastructure:** Vercel serverless (no ops overhead)
- **Team:** 1 engineer (you) + design system (existing)

#### Parcerias Chave
- **Job Data:** Indeed, LinkedIn, Glassdoor (API partnerships)
- **Payments:** Stripe (subscription processing)
- **AI:** Anthropic (Claude), Google (Gemini)
- **Infrastructure:** Vercel (hosting), Supabase (database)
- **Auth:** LinkedIn OAuth (single sign-on)

---

### QUANTO (As Finanças)

#### Estrutura de Custos
| Item | Cost | Notes |
|------|------|-------|
| Claude API | ~$1-5/mth | 100k tokens @ $0.5/1M |
| Gemini API | Free | Free tier for MVP |
| Vercel | Free | Vercel Pro $20/mth later |
| Supabase | Free | 500MB free; $25/mth later |
| Stripe | 2.9% + $0.30 | Per transaction fee |
| Domain | $12/year | One-time |
| **Total** | **~$15/mth** | Scales with revenue |

**Variable costs = % of revenue** (Stripe fees grow with subscribers)

#### Fontes de Receita
| Stream | Price | Volume (M6) | Revenue |
|--------|-------|-------------|---------|
| **PRO Subscription** | $14.90/mth | 400 users | R$ 5,960 |
| **Free Tier** | $0 | 3000 users | $0 (ad revenue future) |
| **Affiliate (future)** | ~2-5% | Indeed sponsorships | TBD |
| **B2B (future)** | TBD | Recruiter access | TBD |
| **Total** | | | **R$ 6,000/mth** |

**Goal:** R$ 6,000/month recurring revenue (400 PRO @ R$14.90 = R$ 5,960)

---

## 🎯 PARTE 2: Value Proposition Canvas (VPC)

The VPC is a "zoom" into TWO blocks of the BMC: **Proposta de Valor** vs **Segmento de Clientes**.

### 👤 Perfil do Cliente (Círculo)

#### Tarefas do Cliente (Customer Jobs)
**Profissional:** "Preciso me relocar profissionalmente em 6 meses (mudar de role/cidade)"
- Find aligned roles (not shotgun apply)
- Get interviews quickly (not wait for rejections)
- Know if CV matches the job (before wasting time)
- Adapt my presentation per role (not send generic CV)

**Pessoal:** "Preciso de confiança que vou conseguir"
- See progress (SSI tracking)
- Compare com peers (leaderboard)
- Feel supported (community)

#### Dores (Pains)
| Pain | Severity | When | Impact |
|------|----------|------|--------|
| **Rejection Anxiety** | High | After applying | Burnout, low confidence |
| **Time Waste** | High | Finding relevant roles | Days lost on wrong jobs |
| **CV Mismatch** | High | Job applications | Rejected by ATS without review |
| **Invisible Feedback** | High | After rejection | Don't know why rejected |
| **Generic Applications** | High | Bulk applying | Low interview rate |
| **No Progress Visibility** | Medium | Throughout job search | Feels stuck |
| **Expensive Relocation** | High | Moving cities | Financial pressure |
| **Competition** | Medium | Job market | Competing against 100+ applicants |

#### Ganhos (Gains)
| Gain | Value | Why |
|------|-------|-----|
| **Quality Interviews** | 🔥🔥🔥 | Get callbacks instead of rejections |
| **Confidence** | 🔥🔥🔥 | Know why I match or don't match |
| **Speed** | 🔥🔥 | Find relocation job in 6 months, not 18 |
| **Less Rejections** | 🔥🔥 | Only apply to good-fit roles |
| **See My Progress** | 🔥🔥 | SSI score shows improvement |
| **Community** | 🔥 | Meet peers relocating too |
| **Personalization** | 🔥🔥 | CV adapted for each role |
| **Competitive Edge** | 🔥🔥🔥 | Better match = more interviews |

---

### 📦 Mapa de Valor (Quadrado)

#### Produtos & Serviços
1. Smart job search (relevance > volume)
2. ATS analyzer (CV compatibility score)
3. Match score (0-100 visual)
4. CV adapter (AI per-job)
5. SSI tracker (progress visibility)
6. Dashboard (history + metrics)

#### Aliviadores de Dores (Pain Relievers)
| Job/Pain | How JobAgent Solves | Result |
|----------|-------------------|--------|
| **"Find roles"** → Time waste | Smart filtering by skills + salary | Only see relevant roles |
| **"Apply"** → Rejection anxiety | Match score 0-100 before applying | Know fit upfront; confidence |
| **"CV mismatch"** → Invisible feedback | ATS analyzer shows missing keywords | Fix CV; understand gaps |
| **"Generic app"** → Low interview rate | AI adapts CV per job | Tailored application; better signal |
| **"Progress?"** → Invisible feedback | SSI tracker + leaderboard | See improvement over time |
| **"Too many apps"** → Wasted effort | Guided to high-match roles only | Fewer apps, more interviews |
| **"Am I competitive?"** → Self-doubt | Compare against peers (leaderboard) | Benchmark progress |

#### Criadores de Ganhos (Gain Creators)
| Gain | How JobAgent Creates | Impact |
|------|----------------------|--------|
| **Quality Interviews** | Match score ensures good fit | Interviews up from 0 to 5-10 |
| **Confidence** | See exactly why match score is X | Know what to fix; actionable |
| **Speed** | Find relocation job in 6 months | Faster outcome; less cost |
| **Less Rejections** | Only apply to aligned roles | Reduce rejections by 90% |
| **See Progress** | SSI tracker shows momentum | Motivation to continue applying |
| **Community** | Leaderboard + peer comparison | Accountability + support |
| **Personalized CV** | Adapted bullets per job | Stand out in ATS + recruiter review |
| **Competitive Edge** | Better matching than competitors | Win more interview spots |

---

### 🔗 O Encaixe (Product-Market Fit)

**ENCAIXE = Quando Pain Relievers + Gain Creators atendem às Dores + Ganhos do Cliente**

```
Cliente Pain:        "100 apps, 0 interviews"
JobAgent Solve:      "Smart match (0-100) + CV adapter → only apply to 20 aligned jobs"
Result:              "20 apps, 5-10 interviews" ✓ ENCAIXE!

Cliente Pain:        "Rejection anxiety / invisible feedback"
JobAgent Solve:      "ATS analyzer shows missing keywords + match score reasoning"
Result:              "Know why rejected; can fix CV" ✓ ENCAIXE!

Cliente Pain:        "Generic CV doesn't stand out"
JobAgent Solve:      "AI adapts CV per job; highlights relevant experience"
Result:              "Tailored application signals; recruiter sees fit" ✓ ENCAIXE!

Cliente Gain:        "See progress over time"
JobAgent Solve:      "SSI score + leaderboard + interview tracking"
Result:              "Visible momentum; community support" ✓ ENCAIXE!
```

---

## 🎯 Positioning vs Competitors

### Positioning Statements

| Aspect | MatchPro | LazyApply | LoopCV | JobAgent |
|--------|----------|-----------|--------|----------|
| **Category** | Resume Optimizer | Auto-Apply Bot | ATS Checker | Smart Matcher |
| **Target** | Job seekers | Volume appliers | CV testers | Relocating pros |
| **Positioning** | Polish your resume | Apply to 1000s fast | Test CV variants | Match before you apply |
| **Value** | Better resume = more interviews | More apps = more interviews | Better CV format = more interviews | **Right jobs = more interviews** |
| **Our Angle** | **Quality > Quantity** | | | |

**JobAgent's Unique Claim:** Only platform that combines intelligent matching (quality filter) + real-time CV adaptation (personalized signal).

---

## 💰 Business Model Validation

### Freemium Conversion Goals (Month 6)
- **Free Users:** 3,000
- **PRO Users:** 400
- **Conversion Rate:** 13%
- **Churn:** <5% (annual)
- **LTV:** $14.90 × 12 × (1 - 0.05) = ~R$ 170 per user
- **CAC:** <R$ 50 (organic growth)
- **Payback Period:** 3 months

### Unit Economics
```
Monthly Revenue (400 PRO):        R$ 5,960
Stripe fees (2.9% + $0.30):       -R$ 173
Claude API costs:                 -R$ 50
Hosting (Vercel):                 Free
Database (Supabase):              Free
Domain:                           -R$ 1
──────────────────────────────────────
Gross Profit (M1):                R$ 5,736 (96% margin)
```

**Insight:** Low variable costs = highly profitable at low scale. Scale to 1000 PRO users and you're at R$ 14.4k/mth.

---

## 🚀 Path to Product-Market Fit

### How We Validate ENCAIXE
1. **Week 5 (Design Sprint):** Show prototype to 10 users; ask "Would you pay $14.90/mth?"
   - Target: >70% say yes
   
2. **Week 8 (MVP Launch):** 50 beta users; track:
   - Match score satisfaction (>80% say helpful)
   - CV adapter adoption (>50% use)
   - SSI engagement (>3 apps/week)
   
3. **Month 3:** First 100 PRO subscribers; measure:
   - Churn (<5%)
   - Interview rate improvement (compare free vs PRO)
   - NPS (target >40)

4. **Month 6:** 400 PRO subscribers = R$ 6k/mth = PMF achieved ✓

---

## 📋 BMC + VPC Summary

| Layer | Focus | Outcome |
|-------|-------|---------|
| **BMC** | How JobAgent creates/captures value | Business viability (profitable model) |
| **VPC** | How JobAgent solves client pain | Product viability (encaixe validation) |
| **Together** | Full business + product strategy | Market viability (can reach scale) |

---

**Last Updated:** Junho 2026  
**Status:** Ready for MVP Execution