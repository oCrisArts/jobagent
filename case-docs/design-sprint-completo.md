# JobAgent — Design Sprint Completo (5 Dias)
## Case de Produto: Plataforma SaaS com IA para Recolocação Profissional

> **Resumo executivo:** Este documento apresenta um Google Design Sprint de 5 dias aplicado ao JobAgent, uma plataforma SaaS que utiliza inteligência artificial para transformar a experiência de busca de emprego. O produto resolve um problema concreto: candidatos gastam em média 11 horas por semana em tarefas repetitivas de candidatura, com taxa de retorno inferior a 3%. O JobAgent automatiza a análise de compatibilidade, adapta currículos com IA e utiliza gamificação leve para manter o engajamento ao longo da jornada.

---

# 🟢 DIA 1 — MAPEAR (Understand)

## 1. Pesquisa de Mercado e Análise de Negócio

### Contexto

O JobAgent nasce de uma observação direta: profissionais em transição de carreira gastam em média 11 horas por semana em tarefas repetitivas de candidatura — buscar vagas, adaptar currículos, enviar aplicações — com uma taxa de retorno inferior a 3%. Existe uma desconexão entre o esforço investido e o resultado obtido.

### Benchmark Competitivo

**Concorrentes Diretos:**

| Plataforma | Pontos Fortes | Lacunas Identificadas |
|---|---|---|
| LinkedIn Jobs | Base massiva, networking integrado | Experiência genérica, sem adaptação de currículo, match superficial |
| Indeed | Volume de vagas, simplicidade | Sem inteligência de compatibilidade, candidatura mecânica |
| Glassdoor | Dados de cultura e salário | Foco em avaliações, candidato é passivo |
| Gupy (BR) | Forte no mercado brasileiro, ATS integrado | Voltado para recrutadores, candidato não tem controle |

**Referências Indiretas (Inspiração de UX):**

| Produto | Inspiração Extraída |
|---|---|
| Duolingo | Gamificação leve que sustenta hábitos diários — streaks e progresso visível |
| Notion AI | IA como assistente contextual dentro do fluxo de trabalho, não como feature isolada |
| Tinder | Match binário como modelo mental — decisão rápida com feedback imediato |
| Spotify Wrapped | Dados pessoais transformados em narrativa visual que gera engajamento |

### Oportunidades Identificadas

1. **Gap de inteligência:** Nenhuma plataforma mainstream oferece análise real de compatibilidade currículo-vaga com feedback acionável.
2. **Gap de ação:** O candidato descobre a vaga mas não recebe suporte para agir — adaptar currículo, identificar lacunas, priorizar.
3. **Gap de engajamento:** A busca de emprego é solitária e desmotivante. Não existe mecanismo de progresso visível.
4. **Gap de dados:** O candidato não sabe onde está errando. Zero feedback sobre por que foi rejeitado.

### Business Model Canvas

| Bloco | Definição |
|---|---|
| **Proposta de Valor** | Reduzir o tempo e aumentar a eficácia da candidatura com IA que analisa compatibilidade e adapta currículos automaticamente |
| **Segmento** | Profissionais em transição (25–45 anos), tech e áreas corporativas, mercado global com foco inicial em EN + PT |
| **Canais** | Web app (PWA), integração com LinkedIn, marketing de conteúdo, Product Hunt |
| **Receita** | Freemium — gratuito com limite de análises → Pro a $14.90/mês com IA ilimitada |
| **Recursos-Chave** | Motor de IA (NLP para análise semântica), base de vagas agregada, UX gamificada |
| **Atividades-Chave** | Agregação de vagas, processamento de match por IA, geração de currículo adaptado |
| **Parceiros** | Job boards (APIs), provedores de IA (Gemini + Claude), Stripe, Supabase |
| **Custos** | Infraestrutura cloud ($45/mês base), APIs de IA (~$50/mês por 100 users), Stripe (2.9% + $0.30) |

**Viabilidade Financeira:** O modelo serverless permite breakeven com apenas 12 usuários Pro ($14.90 × 12 = $178.80 vs custo fixo ~$168). A margem cresce logaritmicamente: com 100 Pro users atinge 88%, com 500 chega a 92%. Projeção conservadora indica profitabilidade a partir do mês 4.

---

## 2. Entrevistas com Especialistas

### Objetivo
Validar hipóteses sobre dores reais do processo de candidatura e entender onde a tecnologia pode gerar impacto mensurável na jornada do candidato.

### Hipóteses

| # | Hipótese |
|---|---|
| H1 | Candidatos gastam mais tempo adaptando currículos do que buscando vagas |
| H2 | A falta de feedback sobre compatibilidade gera candidaturas indiscriminadas |
| H3 | O abandono do processo acontece por desmotivação, não por falta de vagas |
| H4 | Recrutadores descartam currículos nos primeiros 6 segundos por falta de palavras-chave |

### Perfil dos Entrevistados

| Perfil | Qtd | Justificativa |
|---|---|---|
| Profissionais em transição (devs, PMs, designers) | 5 | Público-alvo direto — vivem a dor |
| Recrutadores / Talent Acquisition | 3 | Visão do outro lado — o que funciona e o que não funciona |
| Career coaches | 2 | Visão sistêmica do mercado e padrões de fracasso |

### Roteiro de Entrevista (10 perguntas)

1. Descreva sua última experiência procurando emprego. Como foi o processo?
2. Quanto tempo por semana você dedica a candidaturas? Como divide esse tempo?
3. Você costuma adaptar seu currículo para cada vaga? Se sim, como?
4. Como você decide se uma vaga vale a pena se candidatar?
5. Já usou alguma ferramenta de IA para currículo ou busca de emprego? O que achou?
6. O que mais te frustra no processo de busca de emprego?
7. Se pudesse mudar uma coisa no processo, o que seria?
8. Você já desistiu de uma candidatura por achar que não tinha chance? O que te fez pensar isso?
9. Como você organiza seus contatos com recrutadores e headhunters?
10. Se uma ferramenta te mostrasse sua porcentagem de compatibilidade com uma vaga e adaptasse seu currículo automaticamente, pagaria por isso?

### Método de Coleta
Entrevistas semi-estruturadas de 30 minutos via videochamada (Zoom/Google Meet), gravadas com consentimento. Anotações em tempo real com transcrição assistida por IA.

### Forma de Análise
Análise temática com codificação aberta: agrupar respostas por padrões recorrentes, validar/invalidar hipóteses e mapear insights em oportunidades de produto.

---

## 3. Personas + Jobs to be Done

### Persona 1: Lucas — Desenvolvedor em Transição

**Perfil:** Desenvolvedor front-end, 27 anos, São Paulo. 3 anos de experiência. Busca primeira oportunidade internacional ou remote-first. Salário atual: R$6.000. Budget mensal para ferramentas: R$50-100.

**Dores centrais:**
- Envia o mesmo currículo para todas as vagas e nunca recebe retorno
- Não sabe quais palavras-chave os ATS filtram
- Perde horas pesquisando vagas em múltiplas plataformas
- Se sente desmotivado após semanas sem resposta

**Comportamento:** Pesquisa vagas no LinkedIn e Indeed 3x por semana. Gasta ~2h por candidatura quando adapta currículo manualmente. Abandona o processo após 3 semanas sem retorno.

**Gatilho de conversão:** Ver resultado tangível na primeira adaptação de currículo (momento "aha").

### Persona 2: Sofia — Product Manager Sênior

**Perfil:** PM com 8 anos de experiência, 32 anos, Berlim. Busca posições de liderança (Staff/Director) em startups Series A-C. Salário: €90k. Budget: $30-50/mês — investe em ferramentas que economizam tempo.

**Dores centrais:**
- Experiência como PM não se traduz bem em bullet points de currículo
- Precisa posicionar impacto em métricas (ARR, NPS, retention) para cada vaga específica
- Gasta tempo pesquisando cultura e fit antes de se candidatar
- Rede de recrutadores espalhada entre LinkedIn, email e WhatsApp

**Comportamento:** Analítica. Quer dados antes de agir. Se uma ferramenta mostrar % de match com argumentos, converte para Pro imediatamente. Valoriza tempo economizado sobre preço.

**Gatilho de conversão:** Ver análise de match com breakdown de skills faltantes — dado acionável.

### Jobs to be Done (JTBD)

**Lucas (Desenvolvedor):**
- **Quando** estou buscando uma vaga de front-end, **quero** saber rapidamente se meu perfil é compatível com a vaga, **para que** eu não perca tempo me candidatando a vagas onde não tenho chance.
- **Quando** encontro uma vaga com boa compatibilidade, **quero** que meu currículo seja adaptado automaticamente com as palavras-chave certas, **para que** eu passe pelo filtro ATS e chegue até o recrutador.

**Sofia (Product Manager):**
- **Quando** estou avaliando uma oportunidade de liderança, **quero** entender meu nível de fit com dados concretos (skills, experiência, cultura), **para que** eu tome decisões rápidas sobre onde investir meu tempo de candidatura.
- **Quando** decido me candidatar, **quero** que meu currículo destaque as métricas de impacto relevantes para aquela vaga específica, **para que** o recrutador veja imediatamente meu valor diferenciado.

---

## 4. User Stories (BDD)

### Busca de Vagas
**Dado** que Lucas está logado e tem um currículo cadastrado,
**Quando** ele busca vagas para "Frontend Developer" em "Remote",
**Então** o sistema exibe uma lista de vagas ordenadas por % de compatibilidade com seu perfil.

### Análise de Match (IA)
**Dado** que Lucas visualiza uma vaga com 78% de match,
**Quando** ele clica em "Ver Análise",
**Então** o sistema exibe um breakdown das skills que batem, as que faltam, e sugestões para melhorar o fit.

### Adaptação de Currículo (IA)
**Dado** que Sofia decidiu se candidatar a uma vaga de Staff PM,
**Quando** ela clica em "Adaptar Currículo",
**Então** a IA reescreve os bullet points do currículo incorporando as palavras-chave da vaga e destacando métricas de impacto relevantes.

### Decisão e Aplicação
**Dado** que Lucas tem um currículo adaptado pronto para uma vaga específica,
**Quando** ele revisa a versão gerada e aprova,
**Então** o sistema salva a versão, disponibiliza download e registra a candidatura no histórico com a data e status.

---

## 5. Definição do Problema

### Problem Statement

**Profissionais em transição de carreira perdem oportunidades reais porque o processo de candidatura é manual, genérico e desprovido de inteligência.**

O candidato envia o mesmo currículo para dezenas de vagas sem saber se tem 30% ou 80% de compatibilidade. Sistemas ATS filtram currículos por palavras-chave que o candidato não sabe quais são. O resultado: rejeição silenciosa, frustração acumulada e abandono do processo.

Não é um problema de falta de vagas. É um problema de **eficiência de matching** — conectar a pessoa certa com a vaga certa, com o currículo certo.

### O Problema em Números

- Candidatos gastam em média **11h/semana** em tarefas de candidatura repetitivas
- Taxa de retorno de candidaturas genéricas: **inferior a 3%**
- Recrutadores gastam **6 segundos** na primeira triagem de currículo
- **75% dos currículos** são descartados por ATS antes de chegar a um humano
- Profissionais em busca ativa abandonam o processo em média após **3 semanas** sem retorno

### O que o JobAgent Resolve

O JobAgent ataca os 3 pontos de maior atrito na jornada do candidato:

1. **Busca inteligente:** Agregar vagas de múltiplas fontes e ordenar por compatibilidade real com o perfil do candidato, usando análise semântica por IA.
2. **Raio-X de match:** Mostrar ao candidato exatamente onde seu perfil bate com a vaga, onde há lacunas, e o que fazer para melhorar — feedback acionável em vez de rejeição silenciosa.
3. **Adaptação automática de currículo:** Reescrever bullet points com as palavras-chave e o tom corretos para cada vaga específica, aumentando a chance de passar pelo ATS e impressionar o recrutador nos primeiros 6 segundos.

### Hipótese Central

Se oferecermos ao candidato uma visão clara de compatibilidade (match %) e adaptarmos seu currículo automaticamente com IA para cada vaga específica, reduziremos o tempo de candidatura em 60% e aumentaremos a taxa de retorno de 3% para 15%+.

### Métricas de Sucesso (Baseline vs Meta)

| Métrica | Antes (baseline) | Meta (com JobAgent) |
|---|---|---|
| Tempo por candidatura | 2-3 horas | < 15 minutos |
| Taxa de retorno | < 3% | > 15% |
| Candidaturas por semana | 3-5 (genéricas) | 8-12 (direcionadas) |
| Abandono do processo | 3 semanas | > 8 semanas de engajamento |

---

# 🟡 DIA 2 — ESBOÇAR (Diverge)

## 1. Lightning Demos

Referências de mercado analisadas para inspirar soluções. O objetivo não é copiar, mas extrair padrões de UX que funcionam.

**Referência 1: Duolingo — Gamificação que cria hábito.**
O que funciona: Streaks diários, barra de progresso visível, recompensas por consistência. O usuário volta não pela obrigação, mas porque o progresso é viciante.
Aplicação no JobAgent: Barra de progresso de candidatura + indicador visual de completude do perfil. Sem complexidade de XP/levels — apenas progresso tangível.

**Referência 2: Tinder — Decisão binária com feedback instantâneo.**
O que funciona: Swipe como modelo de decisão rápida. "Sim ou não" com contexto mínimo. Match gera dopamina.
Aplicação no JobAgent: Card de vaga com % de match visível. Decisão rápida: "Adaptar CV" ou "Pular". Feedback imediato sobre compatibilidade.

**Referência 3: Grammarly — IA como copilot invisível.**
O que funciona: A IA trabalha em segundo plano enquanto o usuário escreve. Sugestões contextuais, não intrusivas. O usuário sente que "ficou melhor" sem esforço.
Aplicação no JobAgent: IA Copywriter que adapta currículo automaticamente. O candidato revisa e aprova — não precisa escrever do zero.

**Referência 4: Notion AI — Assistente contextual no fluxo.**
O que funciona: IA integrada ao workspace, não como feature separada. O usuário pede ajuda onde precisa.
Aplicação no JobAgent: Análise de match aparece dentro do card da vaga. Adaptação de CV acontece no mesmo fluxo de busca. Zero fricção entre "ver vaga" e "agir".

**Referência 5: Figma — Dashboard de projeto como HUD.**
O que funciona: Visão geral de progresso, status de entregas, atividade recente. Tudo num só lugar.
Aplicação no JobAgent: Dashboard HUD com candidaturas ativas, próximas ações e score de progresso.

---

## 2. Crazy 8s — 8 Ideias em 8 Minutos

**Foco: Gamificação**
1. Barra de completude de perfil — "Seu perfil está 65% otimizado" com checklist visual
2. Streak de candidatura — "3 dias consecutivos aplicando" mantém engajamento
3. Score de match acumulado — Média de compatibilidade das candidaturas feitas (motiva buscar vagas melhores)

**Foco: IA**
4. Raio-X de match — Análise visual: skills que batem (verde), lacunas (vermelho), sugestões (amarelo)
5. IA Copywriter de currículo — Botão "Adaptar para esta vaga" que reescreve bullets com palavras-chave certas
6. Recomendação de ações — "Você tem 3 vagas com match acima de 80%. Quer adaptar seu CV?"

**Foco: Eficiência**
7. Busca unificada — Agregar LinkedIn, Indeed, Glassdoor numa interface só, com filtro por match %
8. One-click apply — Currículo adaptado + carta de apresentação gerada → candidatura em 1 clique

---

## 3. Solution Sketch — Solução Principal

### Conceito Central

O JobAgent é um **cockpit de carreira**: o candidato entra, vê seu panorama (dashboard), identifica oportunidades (busca com match), e age com precisão (adaptação por IA). A gamificação é o combustível que mantém o motor funcionando — não o motor em si.

### Estrutura da Interface (HUD Principal)

```
┌─────────────────────────────────────────────────┐
│  DASHBOARD (HUD)                                │
│                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │ Perfil   │  │ Candidat.│  │ Match    │      │
│  │ 72%      │  │ 8 ativas │  │ Médio:85%│      │
│  │ completo │  │ 2 retorno│  │          │      │
│  └──────────┘  └──────────┘  └──────────┘      │
│                                                 │
│  ┌─────────────────────────────────────────┐    │
│  │ AÇÕES RECOMENDADAS                      │    │
│  │ → 3 vagas com match >80%                │    │
│  │ → Currículo desatualizado há 7 dias     │    │
│  │ → 1 retorno pendente de followup        │    │
│  └─────────────────────────────────────────┘    │
│                                                 │
│  [Buscar Vagas]  [Meu Currículo]  [Histórico]  │
└─────────────────────────────────────────────────┘
```

### Fluxo de Busca + Ação

```
┌─────────────────────────────────────────────────┐
│  BUSCAR VAGAS                                   │
│                                                 │
│  [Frontend Developer] [Remote] [Buscar]         │
│                                                 │
│  ┌───────────────────────────────────────┐      │
│  │ ★ Senior Frontend - Empresa X         │      │
│  │   Match: 85% ████████░░              │      │
│  │   Remote · $120k-150k · React, TS     │      │
│  │   [Ver Análise]  [Adaptar CV]         │      │
│  ├───────────────────────────────────────┤      │
│  │   Frontend Dev - Empresa Y            │      │
│  │   Match: 62% ██████░░░░              │      │
│  │   Hybrid · $80k-100k · Vue, Node     │      │
│  │   [Ver Análise]  [Adaptar CV]         │      │
│  └───────────────────────────────────────┘      │
└─────────────────────────────────────────────────┘
```

### Fluxo do Raio-X de Match

```
┌─────────────────────────────────────────────────┐
│  RAIO-X DE MATCH — Senior Frontend, Empresa X   │
│                                                 │
│  Compatibilidade: 85%                           │
│                                                 │
│  ✅ Skills que batem:                           │
│     React (5 anos) · TypeScript · Next.js       │
│                                                 │
│  ⚠️ Lacunas identificadas:                     │
│     GraphQL (mencionado 3x na vaga)             │
│     Experiência com equipe >10 pessoas          │
│                                                 │
│  💡 Sugestão da IA:                             │
│     "Destaque seu projeto X onde usou GraphQL   │
│      e mencione a liderança técnica no time Y"  │
│                                                 │
│  [Adaptar Currículo para esta Vaga]             │
└─────────────────────────────────────────────────┘
```

---

# 🔴 DIA 3 — DECIDIR (Converge)

## 1. Priorização — Matriz Impacto × Esforço

| Feature | Impacto | Esforço | Decisão |
|---|---|---|---|
| Busca integrada de vagas (APIs agregadas) | Alto | Médio | ✅ MVP |
| Raio-X de match com IA (análise de compatibilidade) | Alto | Médio | ✅ MVP |
| IA Copywriter (adaptação automática de currículo) | Alto | Médio | ✅ MVP |
| Dashboard HUD com progresso | Alto | Baixo | ✅ MVP |
| Upload e extração de PDF (currículo) | Alto | Baixo | ✅ MVP |
| Barra de completude de perfil | Médio | Baixo | ✅ MVP |
| Streak de candidatura | Médio | Baixo | ⏳ V1.1 |
| Hub de headhunters/recrutadores | Alto | Alto | ⏳ V2 |
| Daily missions gamificadas | Médio | Médio | ⏳ V2 |
| Sistema de XP/Levels | Baixo | Médio | ❌ Descartado |
| LinkedIn integration nativa | Alto | Alto | ⏳ V2+ |
| Mobile app | Médio | Alto | ⏳ V3 |

**Critério de Decisão:** Entram no MVP as features que atacam diretamente os 3 gaps identificados no Dia 1 (inteligência, ação, engajamento) com esforço proporcional ao impacto. Gamificação complexa (XP, levels, missions) é descartada em favor de gamificação leve (progresso visível, streaks).

---

## 2. Definição do MVP — 3 Pilares

**Pilar 1: Busca Integrada.** Agregar vagas de múltiplas fontes (Adzuna, JSearch) numa interface unificada. O candidato busca uma vez e vê tudo, ordenado por compatibilidade com seu perfil.

**Pilar 2: Raio-X de Match (IA).** Para cada vaga, a IA analisa o currículo do candidato contra a descrição da vaga e retorna: % de match, skills que batem, lacunas identificadas e sugestões de posicionamento. Usa análise semântica — não apenas palavras-chave exatas.

**Pilar 3: IA Copywriter (Currículo).** Com um clique, a IA reescreve os bullet points do currículo incorporando palavras-chave da vaga, ajustando o tom e destacando métricas de impacto relevantes. O candidato revisa, aprova e baixa o PDF adaptado.

### Estratégia de IA

| Camada | Modelo | Uso |
|---|---|---|
| Free | Gemini | Extração de texto do PDF, adaptação básica de currículo |
| Pro ($14.90/mês) | Claude | Análise profunda de match, adaptação premium com insights de indústria, recomendação de ações |

### O que NÃO entra no MVP (e por quê)

| Feature | Razão | Quando |
|---|---|---|
| Hub de Headhunters | Requer massa crítica de dados reais | Após 500+ users ativos |
| Daily Missions | Gamificação complexa que pode distrair do core | V2 (após validar retenção) |
| LinkedIn Integration | Dependência de API third-party instável | V2+ |
| Analytics Avançado | GA4 básico é suficiente para MVP | Quando MRR > $1.000 |
| Mobile App | Web responsiva cobre o caso de uso | Quando atingir 1.000+ users |

---

## 3. Storyboard — Jornada de Lucas

### Frame 1: Descoberta
Lucas encontra o JobAgent via post no Reddit/LinkedIn. O headline é direto: "Adapte seu currículo com IA para cada vaga em 2 minutos". Ele clica no link e chega na landing page.

### Frame 2: Landing Page
A landing page mostra o problema de forma clara: "Você envia o mesmo CV para todas as vagas?". Abaixo, demonstração visual do antes/depois de um currículo adaptado. Dois CTAs: "Testar Grátis" e "Ver Planos". Social proof com números reais.

### Frame 3: Cadastro
Lucas clica em "Testar Grátis". Modal de signup com 3 opções: Google OAuth, LinkedIn OAuth, ou email. Ele escolhe Google — cadastro em 1 clique. Redirecionado para o dashboard.

### Frame 4: Onboarding (Upload do Currículo)
Primeira tela após login: "Comece enviando seu currículo". Upload de PDF com drag-and-drop. A IA (Gemini) extrai o conteúdo automaticamente em ~3 segundos. Preview do currículo parseado aparece na tela. Lucas confirma: "Sim, está correto".

### Frame 5: Dashboard (HUD)
Lucas vê seu cockpit de carreira pela primeira vez. Barra de completude do perfil: "45% — Faça sua primeira busca para subir para 60%". Cards de resumo: 0 candidaturas, 0 retornos. Ação recomendada em destaque: "Busque sua primeira vaga".

### Frame 6: Busca de Vagas
Lucas busca "Frontend Developer" + "Remote". O sistema retorna vagas de múltiplas fontes, ordenadas por % de match com seu perfil. Primeira vaga: "Junior Frontend — Empresa X — Match: 78%". Ele clica para ver detalhes.

### Frame 7: Raio-X de Match
Tela de análise detalhada. Skills que batem: React (3 anos), JavaScript, CSS. Lacunas: TypeScript (mencionado 4x na vaga), testes automatizados. Sugestão da IA: "Destaque seu projeto Y onde usou TypeScript e mencione cobertura de testes". Botão em destaque: "Adaptar Currículo para esta Vaga".

### Frame 8: Adaptação por IA (Momento "Aha")
Lucas clica em "Adaptar Currículo". A IA (Gemini, no tier free) reescreve os bullet points em ~5 segundos. Preview lado a lado: original vs adaptado. O currículo adaptado incorpora as palavras-chave da vaga e reformula a experiência com foco em impacto. Lucas pensa: "Ficou muito melhor que o original". Download disponível.

### Frame 9: Gatilho de Upgrade
Após usar sua adaptação gratuita do mês, Lucas tenta adaptar para outra vaga. Modal aparece: "Você usou sua adaptação mensal. Com o Pro ($14.90/mês), adapte ilimitadamente com IA avançada (Claude) e receba análises profundas de match." CTA: "Testar Pro — 7 dias grátis".

### Frame 10: Checkout (Stripe)
Lucas decide testar. Stripe Checkout integrado: cartão de crédito, 7 dias grátis, cancelamento a qualquer momento. Processo em 30 segundos. Confirmação na tela.

### Frame 11: Pro Desbloqueado
De volta ao dashboard, agora com features Pro visíveis. Barra de completude: "72%". IA Claude disponível para adaptações premium. Análise profunda de match com insights de indústria. Ação recomendada: "Você tem 3 vagas com match acima de 80%".

### Frame 12: Uso Recorrente e Retenção
Uma semana depois, Lucas volta. O dashboard mostra: 5 candidaturas enviadas, 1 retorno para entrevista (a vaga onde usou currículo adaptado). Barra de progresso atualizada. Streak: "5 dias consecutivos". Lucas renova a assinatura — o produto se pagou.

### Diagrama de Fluxo Resumido

```
Descoberta → Landing → Signup → Upload CV → Dashboard
                                                 ↓
                                          Buscar Vagas
                                                 ↓
                                         Raio-X de Match
                                                 ↓
                                         Adaptar CV (IA)
                                                 ↓
                                     Momento "Aha" (valor tangível)
                                                 ↓
                                    Limite Free → Gatilho de Upgrade
                                                 ↓
                                        Checkout (Stripe)
                                                 ↓
                                        Pro → Uso Recorrente
                                                 ↓
                                     Resultado Real → Retenção
```

---

# 🔵 DIA 4 — PROTOTIPAR

## 1. Design System (Simplificado)

### Direção Estética
Tech-noir com personalidade. Dark mode como default — ambiente profissional, focado, sem distração. Cores neon como acentos funcionais, não decorativos: ciano para ações primárias, verde para sucesso/match alto, vermelho para alertas.

### Paleta de Cores

**Superfícies:** Background primário `#0F0F0F`, secundário `#1A1A1A`, terciário `#2A2A2A`.
**Ações e Feedback:** Primária (CTA) `#00D9FF` (ciano), sucesso `#00FF41`, alerta `#FFB300`, erro `#FF0055`.
**Texto:** Primário `#FFFFFF`, secundário `#B0B0B0`, terciário `#707070`.

### Tipografia

| Uso | Fonte | Peso | Tamanho |
|---|---|---|---|
| Headings (H1) | Space Grotesk | Bold (700) | 32px |
| Headings (H2) | Space Grotesk | SemiBold (600) | 24px |
| Headings (H3) | Space Grotesk | SemiBold (600) | 20px |
| Body | Inter | Regular (400) | 14-16px |
| Dados / Scores | JetBrains Mono | Medium (500) | 16-24px |
| Labels / Captions | Inter | Medium (500) | 12px |

### Componentes Principais

**Botão Primário (CTA):** Background `#00D9FF`, texto `#0F0F0F`, border-radius 8px, padding 12px 24px. Hover: brightness +10%.

**Botão Secundário:** Background transparente, borda 1px `#00D9FF`, texto `#00D9FF`. Hover: background `rgba(0,217,255,0.1)`.

**Card de Vaga:** Background `#1A1A1A`, borda 1px `#2A2A2A`, border-radius 12px, padding 16px. Hover: borda `#00D9FF`, box-shadow com glow sutil. Contém: título, empresa, match %, tags de skills, CTAs.

**Barra de Match:** Gradiente de `#FF0055` (0%) a `#FFB300` (50%) a `#00FF41` (100%). Largura proporcional ao %. Número em JetBrains Mono ao lado.

**Input Field:** Background `#2A2A2A`, borda `#404040`, border-radius 8px. Focus: borda `#00D9FF` com glow.

---

## 2. Protótipo de Alta Fidelidade — Telas Descritas

**Tela 1: Landing Page.** Header fixo com logo + "Login" + "Testar Grátis". Hero section: headline "Adapte seu currículo com IA para cada vaga", subheadline com proposta de valor, demonstração visual antes/depois. Seção de social proof. Pricing table com Free vs Pro. Footer com links.

**Tela 2: Dashboard (HUD).** Sidebar com navegação: Início, Buscar, Currículo, Histórico. Área principal com 3 cards de métrica (completude do perfil, candidaturas ativas, match médio). Abaixo: seção "Ações Recomendadas" com sugestões contextuais da IA. Barra de progresso do perfil no topo.

**Tela 3: Busca de Vagas.** Barra de busca com filtros (cargo, localização, tipo). Lista de cards de vaga com: título, empresa, match %, tags de skills, localização, salário estimado. Ordenação por relevância/match. Cada card com botões "Ver Análise" e "Adaptar CV".

**Tela 4: Raio-X de Match.** Modal ou tela dedicada. No topo: % de match grande em JetBrains Mono com barra colorida. Três seções: Skills compatíveis (badges verdes), Lacunas (badges vermelhos com tooltip de contexto), Sugestões da IA (texto com ações concretas). CTA final: "Adaptar Currículo para esta Vaga".

**Tela 5: Adaptação de Currículo.** Split view: currículo original à esquerda, versão adaptada à direita. Diferenças destacadas com highlight amarelo. Indicador de loading durante processamento da IA. Botões: "Aprovar e Baixar PDF", "Editar Manualmente", "Descartar".

**Tela 6: Paywall / Upgrade.** Modal centrado. Comparação clara: Free (1 adaptação/mês, match básico) vs Pro ($14.90/mês — adaptações ilimitadas, IA Claude, análise profunda). Botão "Começar 7 dias grátis" em destaque. Informação de cancelamento fácil.

---

## 3. Protótipo em Código (Conceitual)

**Stack Técnica:** Next.js 14 (App Router) + Tailwind CSS + next-intl (EN + PT) + Supabase + Stripe + Gemini/Claude + Vercel.

### Design Tokens em Tailwind

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        bg: { primary: '#0F0F0F', secondary: '#1A1A1A', tertiary: '#2A2A2A' },
        accent: { cyan: '#00D9FF', green: '#00FF41', orange: '#FFB300', red: '#FF0055' },
        text: { primary: '#FFFFFF', secondary: '#B0B0B0', tertiary: '#707070' },
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
}
```

### Estrutura de Rotas Next.js

O projeto JobAgent segue a arquitetura modular do Next.js 15 App Router com internacionalização (EN + PT), autenticação via NextAuth, e integração com APIs de IA (Gemini + Claude).

```
app/
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
└── middleware.ts            → Middleware para i18n e autenticação
```

### Stack Tecnológico do MVP

| Camada | Tecnologia | Versão | Uso |
|---|---|---|---|
| Frontend | Next.js + React | 15.x / 19.x | App Router, SSR, componentes reativos |
| Estilo | Tailwind CSS + SCSS | Último | Design system, variáveis de tokens |
| I18n | next-intl | 3.26.x | Internacionalização (EN + PT) |
| Auth | NextAuth + Google OAuth | 4.24.x | Autenticação segura, SSO |
| Database | PostgreSQL (Supabase) | - | Dados de usuários, CVs, histórico |
| IA | Google Gemini + Claude | Latest | Match analysis, CV adaptation |
| Pagamentos | Stripe | 15.8.0 | Checkout, webhooks, subscriptions |
| Deploy | Vercel | - | Serverless, CI/CD automático |

### Banco de Dados — Tabelas Principais

- **profiles:** Dados do usuário, preferências, locale, timezone
- **resumes:** Currículos do usuário (versionamento de CVs)
- **job_applications:** Histórico de candidaturas (vaga, data, status)
- **job_matches:** Cache de análises de match (currículo vs vaga)
- **subscriptions:** Dados de assinatura Stripe, status Pro/Free
- **pricing_plans:** SKUs (Free, Pro) — facilita alteração de preços
- **gamification_progress:** Streaks, barras de progresso, badges

### Infraestrutura e Custos Mensais

| Serviço | Custo | Escala |
|---|---|---|
| Supabase (PostgreSQL + Auth) | $25/mês | Até 500k registros |
| Vercel (Serverless) | $20/mês | Unlimited requests |
| Google Gemini API | ~$20/mês (Free tier inicial) | Por 100 users |
| Claude API (Pro) | ~$30/mês | Análise profunda para 100+ users |
| Stripe (2.9% + $0.30) | ~$73/mês | 100 Pro users @ $14.90/mês |
| **Total MVP** | **~$168/mês** | **100 Pro users** |

**Viabilidade:** Breakeven com apenas 12 usuários Pro. Margem com 100 users: 88%. Com 500 users: 92%.

---

# 🟣 DIA 5 — TESTAR (Validar)

## 1. Teste de Usabilidade

### Cenário de Teste
Lucas (persona primária) acessa o JobAgent pela primeira vez. Ele tem um currículo em PDF e está buscando vagas de Frontend Developer remoto. O teste avalia se ele consegue completar a jornada central sem fricção: cadastro → upload → busca → análise de match → adaptação de currículo.

### Participantes
5 profissionais de tecnologia em transição de carreira (perfil similar a Lucas). Recrutados via LinkedIn e comunidades de desenvolvedores. Testes remotos de 20 minutos via Maze + videochamada.

### Tarefas do Usuário

| # | Tarefa | Critério de Sucesso | Tempo Máximo |
|---|---|---|---|
| T1 | Fazer cadastro usando Google OAuth | Chega ao dashboard | 60s |
| T2 | Fazer upload do currículo em PDF | CV parseado com sucesso | 90s |
| T3 | Buscar vagas para "Frontend Developer Remote" | Lista de vagas exibida | 60s |
| T4 | Abrir o Raio-X de Match da primeira vaga | Tela de análise visível | 30s |
| T5 | Adaptar currículo para a vaga selecionada | CV adaptado gerado | 120s |
| T6 | Baixar o currículo adaptado em PDF | Download completo | 30s |

---

## 2. Métricas — Framework HEART

### Happiness (Satisfação)

| Métrica | Como Medir | Target |
|---|---|---|
| NPS | Pergunta in-app: "De 0 a 10, recomendaria o JobAgent?" | ≥ 7 |
| Satisfação com adaptação | "A adaptação de currículo foi útil?" (1-5) | ≥ 4 |
| Percepção de valor | "O JobAgent economizou seu tempo?" (sim/não) | ≥ 70% sim |

### Engagement (Uso)

| Métrica | Como Medir | Target |
|---|---|---|
| DAU / MAU | Usuários únicos ativos por dia/mês | DAU: 20% dos signups |
| Buscas por semana | Média de buscas de vaga por usuário ativo | ≥ 5 |
| Adaptações por usuário | Média de CVs adaptados por mês (Pro) | ≥ 4 |

### Adoption (Adoção)

| Métrica | Como Medir | Target |
|---|---|---|
| Taxa de signup | Visitantes → cadastros | ≥ 15% |
| Onboarding completo | Signup → upload CV → primeira busca | ≥ 70% |
| Primeira adaptação | % que faz primeira adaptação após onboarding | ≥ 60% |

### Retention (Retenção)

| Métrica | Como Medir | Target |
|---|---|---|
| D1 Retention | % que volta no dia seguinte | ≥ 70% |
| D7 Retention | % que volta após 1 semana | ≥ 40% |
| D30 Retention | % ativo após 1 mês | ≥ 20% |
| Churn Pro | % que cancela assinatura Pro / mês | < 5% |

### Task Success (Eficácia)

| Métrica | Como Medir | Target |
|---|---|---|
| Tempo até aplicação | Do login até primeira candidatura enviada | < 15 min |
| Taxa de sucesso da adaptação | Adaptações aprovadas / total gerado | ≥ 90% |
| Conversão Free → Pro | % de users free que fazem upgrade | 5-8% |
| Checkout completion | % que inicia checkout e completa | ≥ 90% |

### Ferramentas de Coleta

| Ferramenta | Função |
|---|---|
| Google Analytics 4 | Funis de conversão, eventos custom, aquisição |
| Hotjar | Heatmaps, gravação de sessão, polls de feedback |
| Microsoft Clarity | Session replay, análise de funil, jornadas |
| Maze | Teste de usabilidade remoto com tarefas |

---

## 3. Coleta de Feedback — Insights Qualitativos

### Perguntas pós-teste (entrevista de 5 minutos)

1. O que você achou da experiência geral? O que chamou mais atenção?
2. Em algum momento você ficou confuso ou não sabia o que fazer?
3. A análise de match (Raio-X) fez sentido para você? Foi útil?
4. O currículo adaptado ficou melhor que o original? Você usaria?
5. Você pagaria $14.90/mês por adaptações ilimitadas? Por quê?
6. O que está faltando no produto para você usar no dia a dia?

**Método de Análise:** Gravar todas as sessões. Transcrever insights-chave. Agrupar por temas: usabilidade, valor percebido, objeções de preço, features desejadas. Priorizar os 3 achados mais impactantes para iteração.

---

## 4. Relatório de Validação

### Comparação Antes vs Depois

| Dimensão | Antes (sem JobAgent) | Depois (com JobAgent) |
|---|---|---|
| Tempo por candidatura | 2-3 horas (busca + adaptação manual) | < 15 minutos (busca + adaptação por IA) |
| Qualidade do currículo | Genérico, sem palavras-chave | Adaptado com keywords e métricas de impacto |
| Decisão de candidatura | Intuição ("parece que combina") | Dados concretos (% de match + análise de gaps) |
| Feedback do processo | Zero — rejeição silenciosa | Raio-X mostra onde melhorar antes de enviar |
| Engajamento | Abandona em ~3 semanas | Progresso visível mantém motivação |
| Taxa de retorno esperada | < 3% | 15%+ (com currículo adaptado) |

### Principais Aprendizados

1. **O momento "aha" é a adaptação.** A funcionalidade que mais gera valor percebido é ver o currículo transformado lado a lado. Este é o ponto de conversão — todo o fluxo deve otimizar para chegar aqui rápido.

2. **Match % é o gancho.** Mostrar compatibilidade numérica cria urgência e curiosidade. Usuários querem entender por que o número é aquele — o Raio-X responde.

3. **Gamificação leve funciona, complexa atrapalha.** Barra de progresso e streak diário mantêm engajamento. Sistemas de XP/levels/achievements distraem do objetivo real (conseguir emprego).

4. **O upgrade precisa ser contextual.** O paywall funciona quando aparece no momento de necessidade (segunda adaptação bloqueada), não como pop-up genérico.

5. **Onboarding tem que ser rápido.** Se o usuário não chega ao primeiro resultado tangível em 5 minutos, o risco de abandono é alto. Upload → busca → match → adaptação precisa ser um fluxo contínuo.

---

## Próximos Passos pós-Sprint

1. Iterar protótipo com base nos achados do teste
2. Desenvolver MVP funcional (Sprint de engenharia)
3. Closed beta com 10-20 usuários reais
4. Instrumentar analytics (GA4 + Hotjar + Clarity)
5. Soft launch em comunidades de tecnologia

---

*Documento consolidado como case de portfólio — Design Sprint completo (5 dias) para o JobAgent.*
