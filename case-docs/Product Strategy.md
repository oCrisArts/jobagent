# JobAgent: Product Strategy & Competitive Analysis

**Project:** JobAgent — AI-powered job matching platform  
**Methodology:** Google Design Sprint (Days 1-5)  
**Problem Focus:** PROBLEMA B (Alignment) vs PROBLEMA A (Volume)  
**Date:** Junho 2026  
**Status:** Pre-MVP Architecture & Strategy Phase

---

## Executive Summary

JobAgent solves **PROBLEMA B**: candidatos aplicam em 100 vagas e recebem 0 entrevistas porque estão gastando energia errada (alinhamento fraco).

Diferentemente dos competidores que otimizam **aplicações automáticas em massa** (MatchPro, LazyApply, LoopCV), JobAgent foca em **matching inteligente e adaptação de CV para cada vaga**, garantindo qualidade sobre quantidade.

**Core differentiation:** Premium product (no megacorporate infrastructure) que ajuda candidates a se realocar profissionalmente com inteligência, não volume.

---

## 🏆 Success Metrics (Não Personas)

1. **Premium Product Delivery**  
   - Colocar produto com qualidade premium no ar sem infraestrutura de empresa gigante
   - KPI: Deploy em Vercel, zero critical bugs, UX intuitiva no primeiro acesso

2. **Self-Relocation + Community Impact**  
   - Usar a plataforma para se realocar profissionalmente
   - Ajudar quem usa a plataforma no mesmo objetivo
   - KPI: 10+ historical cases de relocations bem-sucedidas (próprias e usuários)

3. **Revenue Generation**  
   - R$ 6.000/mês em 6 meses
   - Freemium model: Free tier limitado, Pro ($14.90/mês)
   - KPI: 400+ PRO subscriptions com 85%+ retention

---

## 📊 Competitive Landscape

### Competitor Matrix

| Aspecto | MatchPro | LazyApply | LoopCV | JobAgent |
|---------|----------|-----------|--------|----------|
| **Modelo** | AI Resume Optimizer | Auto-Apply Bot | CV Variations | Intelligent Matching |
| **Foco Principal** | Resume quality | Aplicação em massa | A/B testing CVs | Alignment + Adaptation |
| **Preço** | $39/mês | $20/mês | Free/Premium | $14.90/mês |
| **Auto-Apply** | Não | Sim (1000s) | Não | Sim (com filtros) |
| **ATS Analyzer** | ✓ | ✗ | ✓ | ✓ (core feature) |
| **CV Adaptation** | ✓ (static) | ✓ (autofill) | ✓ (variations) | ✓ (AI per-job) |
| **Match Score** | ✓ | ✗ | ✗ | ✓ (0-100) |
| **Social Selling Index** | ✗ | ✗ | ✗ | ✓ (gamification) |
| **AI Model** | OpenAI | ChatGPT | N/A | Claude + Gemini |
| **Target Market** | Job seekers | Bulk appliers | CV testers | Professionals relocating |
| **Key Strength** | Resume polish | Speed/volume | Easy CV variants | Quality matching |

### Competitive Overviews

#### **MatchPro**
- **Positioning:** "AI-powered platform that optimizes resumes for success"
- **Features:** Resume optimization, culture insights, mock interviews, match scores
- **Pricing:** $39/month
- **Momentum:** Growing adoption among career changers
- **Weakness:** No automation, manual process, generic advice
- **Opportunity:** MatchPro doesn't predict whether CV is suitable for role before applying

#### **LazyApply**
- **Positioning:** "Apply to 1000s of jobs in one click"
- **Features:** Auto-apply, analytics dashboard, GPT autofill, referral emails, 20+ countries
- **Pricing:** $20/month
- **Momentum:** High volume adoption, startup funded
- **Weakness:** Quantity over quality, high rejection rates from bad matches
- **Opportunity:** Candidates applying to wrong roles wastes time and reduces response rate

#### **LoopCV**
- **Positioning:** "Auto-apply 1000+ jobs weekly with ATS optimization"
- **Features:** Auto-apply, ATS CV checker, CV builder with A/B testing, analytics
- **Pricing:** Free plan + Premium
- **Momentum:** Strong feature set, good UX
- **Weakness:** ATS checker is passive (shows compatibility), doesn't adapt CV actively
- **Opportunity:** No proactive matching logic; users still apply to misaligned roles

#### **JobAgent (You)**
- **Positioning:** "Intelligent job matching that adapts your CV to every role"
- **Features:** Smart job search, ATS analysis, real-time CV adaptation, SSI gamification, premium experience
- **Pricing:** $14.90/month (competitive)
- **Momentum:** NEW - building from clean architecture, user-centric
- **Strength:** Alignment-first mindset + AI adaptation per job
- **Target:** Professionals relocating who value quality over quantity

---

## 🎯 Core Problem: PROBLEMA A vs PROBLEMA B

### PROBLEMA A (Competitors' Focus)
**"Candidatos aplicam devagar; precisam aplicar mais rápido"**
- Solve by: Auto-apply automation (LazyApply, LoopCV)
- Result: More applications = more interviews (?no, doesn't work)
- Issue: Quantity without quality = rejected by ATS + wasted candidate energy

### PROBLEMA B (JobAgent's Focus) ✅
**"Candidatos aplicam em 100 vagas e recebem 0 entrevistas; estão gastando energia errada"**
- Root cause: Misalignment between CV and role requirements
- Solve by: Smart matching + real-time CV adaptation
- Result: Every application is high-quality fit → better response rate
- Job: "Help candidate relocate by ensuring every application is strategically chosen and optimized"

**Why this matters:**
- Candidate's time is precious (0 rejections > 100 rejections)
- Each application should be intentional, not scatter-shot
- Quality applications = higher interview rate = faster relocation
- Aligns with user goal: "Help people relocate professionally with intelligence, not volume"

---

## 🏗️ Architecture Philosophy

### Design Principles

1. **Alignment First** — Every feature should improve match quality, not just speed
2. **Transparency** — Show candidates why a role is a good/bad fit (ATS score + match reasoning)
3. **Agency** — User controls which roles to apply to; automation assists, not replaces
4. **Gamification** — SSI score builds as they engage smartly (quality profile boost over time)
5. **Premium Feel** — Polish, speed, reliability without bloat

### Core Features

#### 1. **Smart Job Search** (Aggregation)
- Aggregate Indeed, LinkedIn, Glassdoor, AngelList, etc.
- Filter by: salary range, location, remote options, company size, industry
- Sort by: match score, salary, recency

#### 2. **ATS Analyzer** (CV → Role Compatibility)
- Parse candidate's CV (PDF/DOCX)
- Extract keywords, skills, experience
- Compare against job description
- Score: 0-100 (how compatible is CV?)
- Show: missing keywords, skill gaps, formatting issues

#### 3. **Match Score** (Holistic Fit)
- Technical fit (ATS analyzer)
- Salary alignment
- Growth potential
- Company culture alignment (via Glassdoor data)
- Remote/location fit
- **Result:** 0-100 visual score + brief reasoning

#### 4. **CV Adapter** (AI Per-Job)
- When candidate selects a job:
  - Claude/Gemini analyzes job description
  - Rewrite CV (bullets, skills, metrics) to highlight relevant experience
  - Maintain truthfulness; optimize presentation
  - Show side-by-side: original vs adapted
  - User can refine, reject, or accept adaptation

#### 5. **SSI Gamification** (Career Progress)
- Social Selling Index-like scoring
- Points for: complete profile, quality applications, interview → offer
- Leaderboard (optional): compare with cohort
- Badges: "Aligned Applicant," "Culture Fit Master," etc.
- Goal: Encourage smart applications over bulk

#### 6. **Dashboard**
- Application history (accepted, rejected, pending)
- SSI score + progression chart
- Success metrics: offer rate, relocation progress
- Insights: most common match scores, salary range achieved

---

## 💼 Business Model

### Pricing Tier

**FREE:**
- Search jobs (10 jobs/week)
- ATS analysis (1 resume)
- Basic match score
- No CV adaptation
- No SSI tracking

**PRO ($14.90/month):**
- Unlimited job search
- Unlimited ATS analysis
- Advanced match score (with reasoning)
- **AI CV adaptation per job** ← key differentiator
- SSI tracking + gamification
- Application history
- Export CV variants
- Priority support

### Revenue Model
- Freemium subscription
- Optional: affiliate links (Indeed, LinkedIn job sponsorships)
- Optional: premium features (interview prep, salary negotiation coaching)
- Optional: B2B (HR tools, recruiter access)

### Target Customer
- Mid-career professionals (5-10 years exp)
- Career changers relocating roles/cities
- Remote-first job seekers
- High-intent candidates (not job hoppers)

---

## 🗓️ Google Design Sprint: Days 1-5

### **Day 1: Understand**
**Goal:** Align team on PROBLEMA B, validate assumptions, define success

**Activities:**
- ✓ Map customer journey: "I have a CV, I want to relocate professionally in 6 months"
- ✓ Identify obstacles: mismatched applications, slow feedback loops, low response rates
- ✓ Define "success": X interviews in Y weeks, Y% offer rate, user feels confident
- ✓ Agree on metrics: match quality (0-100 distribution), interview rate, relocation velocity

**Inputs:**
- Your own relocation case (primary research)
- Competitive analysis (this document)
- User feedback from early testers
- Existing JobAgent APIs & architecture

**Output:** Problem statement + shared understanding

---

### **Day 2: Diverge**
**Goal:** Generate many possible solutions to PROBLEMA B

**Activities:**
- Ideate: How many ways can we help candidates match better?
  - Real-time keyword matching
  - AI-powered skill gap analysis
  - Company culture matching
  - Salary negotiation prep
  - Interview question prediction
  - LinkedIn profile optimization
  - Networking recommendations
- Create low-fidelity sketches of top 5 ideas
- Vote on: most impactful + most feasible

**Focus:** Reject solutions that compete on speed/volume; embrace alignment-first

**Output:** 3-5 prioritized solution concepts

---

### **Day 3: Decide**
**Goal:** Choose one solution to prototype

**Activities:**
- Critique each solution against:
  - Does it solve PROBLEMA B (alignment)?
  - Feasible in 1 sprint?
  - Differentiates from competitors?
  - Aligns with success metrics?
- Vote/decide on winning concept
- Storyboard the happy-path user flow (5-7 frames)

**Recommend:** "CV Adapter + Match Score"
- User uploads CV → sees match scores for jobs → sees adapted CV for selected role → clicks apply
- Teaches user over time what makes a good match
- Directly addresses alignment problem

**Output:** Storyboard + feature spec

---

### **Day 4: Prototype**
**Goal:** Build a realistic prototype of the winning idea (not full product, just key flow)

**Activities:**
- Use existing JobAgent architecture (API skeleton is there)
- Build core flow:
  1. User uploads CV (existing: /api/resume)
  2. Search jobs (existing: /api/jobs)
  3. Show match score (0-100) for each job
  4. User selects job → see CV adaptation (existing: /api/adapt)
  5. Accept/reject/refine adaptation
  6. Apply button (track in DB)
- Use Figma for UI mockups (design tokens ready)
- Build clickable prototype (Figma → HTML or Next.js page)

**Scope:** Happy path only; no error states, no edge cases

**Output:** Prototype + test script

---

### **Day 5: Validate**
**Goal:** Get user feedback on the core concept (not final product)

**Activities:**
- Recruit 5-10 users (early testers, LinkedIn outreach, or yourself)
- Show them the prototype (not tell, show)
- Task: "Imagine you want to relocate. Use this to find a job."
- Observe: Do they understand the flow? Do they see the value? What confuses them?
- Key questions:
  - Does the match score feel useful?
  - Would you pay $14.90/month for CV adaptation?
  - What's missing?
  - How confident are you that an adapted CV will help you get an interview?

**Success:** >70% say "yes, I'd use this" or "yes, I'd pay for this"

**Output:** User feedback + pivot/proceed decision

---

## 📋 MVP Feature Prioritization

### **Must Have (Sprint 0-1)**
- [ ] Job search with basic filtering
- [ ] CV upload + ATS analysis (keyword extraction, score)
- [ ] Job detail page with match score (0-100)
- [ ] CV adapter (Claude/Gemini integration)
- [ ] Simple dashboard (recent apps, SSI score)
- [ ] Authentication (LinkedIn OAuth)
- [ ] Stripe subscription (Pro tier)

### **Should Have (Sprint 2-3)**
- [ ] Application history tracking
- [ ] Saved jobs feature
- [ ] CV comparison (original vs adapted side-by-side)
- [ ] Match reasoning explanation
- [ ] SSI leaderboard (optional)
- [ ] Email notifications (new matching jobs)

### **Nice to Have (Future)**
- [ ] Interview question generator
- [ ] Salary negotiation coach
- [ ] LinkedIn profile audit
- [ ] Referral program
- [ ] Mobile app

---

## 🎓 Key Learnings from Competitors

| What Works | What Doesn't | JobAgent Opportunity |
|-----------|-------------|----------------------|
| **MatchPro:** Resume optimization is valued | No automation, users want speed | Combine optimization + automation |
| **LazyApply:** Automation is desired | Mass applications = low quality | Automation with quality gates |
| **LoopCV:** ATS analysis is useful | Passive (shows problem, no fix) | Active adaptation (solves problem) |
| **All:** Gamification engages users | No one does SSI/career progression | SSI scoring makes quality stick |
| **All:** Price point $20-39 | Users don't want complexity | Simpler UX + alignment focus |

---

## 🚀 Go-to-Market Strategy

### **Phase 1: Validate (Weeks 1-4)**
- Prototype testing with 10 users
- Refine based on feedback
- Target: Confirm PROBLEMA B matters

### **Phase 2: MVP Launch (Weeks 5-8)**
- Clean architecture (use Relatório de Pastas cleanup)
- Deploy on Vercel
- Freemium signup (LinkedIn OAuth)
- Create landing page focusing on alignment/quality
- Invite 50 beta users (friends, LinkedIn network, Twitter)

### **Phase 3: Early Growth (Months 3-6)**
- Iterate on user feedback
- Publish case studies (your relocations + user wins)
- Content: "5 reasons applying to 100 jobs doesn't work"
- Target: 400 PRO subscribers, R$ 6k/month

### **Phase 4: Scale (Months 6-12)**
- API for recruiters (sell job matches back to companies?)
- Partnerships with bootcamps, career coaching platforms
- Expand to international markets

---

## ⚠️ Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|-----------|
| CV adaptation quality (wrong emphasis) | User distrust | Start conservative; show "suggested" edits, let user refine |
| Job aggregation latency | Poor UX | Cache results; show "updated 2 hours ago" |
| Churn from low match rates | Revenue loss | Add filtering + education (why this job isn't a fit) |
| Competition from LazyApply/LoopCV growth | Market pressure | Double down on quality narrative; publish relocation metrics |
| Integration with ATS systems | Technical debt | Focus on web applications first; ATS parsing is secondary |

---

## ✅ Next Steps

1. **Week 1:** Complete Day 1-2 of Google Design Sprint
   - Validate PROBLEMA B with 5 users
   - Diverge on 3-5 solution concepts
   
2. **Week 2:** Complete Day 3-4 of Google Design Sprint
   - Decide on "CV Adapter + Match Score" concept
   - Build interactive prototype
   
3. **Week 3:** Complete Day 5 of Google Design Sprint
   - Validate with 10 users
   - Go/no-go decision on MVP
   
4. **Week 4+:** Cleanup architecture, build MVP features
   - Use Relatório de Pastas to guide cleanup
   - Deploy MVP by end of month

---

## 📞 Contact & Feedback

**Project Owner:** Cristiano (cristiano.acosta.m@gmail.com)  
**Methodology:** Google Design Sprint  
**Tech Stack:** Next.js 15.5 + React 19 + Claude API + Gemini  
**Deployment:** Vercel  
**Pricing Model:** Freemium ($14.90/mth PRO)  
**Business Goal:** R$ 6k/mth in 6 months while helping 10+ relocate professionally
