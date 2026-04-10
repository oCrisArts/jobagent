# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\features\auth.feature.spec.js >> Autenticação OAuth (Google/LinkedIn) >> Navegação para página de Termos
- Location: .features-gen\tests\features\auth.feature.spec.js:40:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: expect.toHaveURL: Target page, context or browser has been closed
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - navigation "Main navigation" [ref=e2]:
    - link " Sync.IA" [ref=e4] [cursor=pointer]:
      - /url: /
      - generic [ref=e6]: 
      - generic [ref=e7]: Sync.IA
    - generic [ref=e9]:
      - link "Product" [ref=e10] [cursor=pointer]:
        - /url: "#produto"
      - link "Pricing" [ref=e11] [cursor=pointer]:
        - /url: "#pricing"
      - button "Sign In" [ref=e14] [cursor=pointer]
  - dialog "Sign in or create your account" [ref=e15]:
    - generic [ref=e18]:
      - button "Close modal" [ref=e19] [cursor=pointer]
      - generic [ref=e20]:
        - heading "Sign in or create your account" [level=1] [ref=e21]
        - paragraph [ref=e22]: Find your job with AI in minutes
      - generic [ref=e23]:
        - button " Continue with Google" [ref=e24] [cursor=pointer]:
          - generic [ref=e26]: 
          - generic [ref=e27]: Continue with Google
        - button " Continue with LinkedIn" [ref=e28] [cursor=pointer]:
          - generic [ref=e30]: 
          - generic [ref=e31]: Continue with LinkedIn
      - generic [ref=e34]: or
      - generic [ref=e36]:
        - generic [ref=e37]:
          - generic [ref=e38]: Email
          - textbox "Email Email" [ref=e40]:
            - /placeholder: you@email.com
        - generic [ref=e41]:
          - generic [ref=e42]: Password
          - generic [ref=e43]:
            - textbox "Password Password" [ref=e44]:
              - /placeholder: ••••••••
            - button "Mostrar senha" [ref=e45] [cursor=pointer]:
              - generic [ref=e46]: 
          - button "Forgot password?" [ref=e48] [cursor=pointer]
        - button "Sign in" [ref=e49] [cursor=pointer]:
          - generic [ref=e50]: Sign in
      - paragraph [ref=e51]:
        - text: By signing in, you agree to our
        - link "Terms of Service" [ref=e52] [cursor=pointer]:
          - /url: /terms
  - main [ref=e53]:
    - main [ref=e54]:
      - generic [ref=e57]:
        - heading "Your AI-Powered Career Assistant" [level=1] [ref=e58]
        - paragraph [ref=e59]: Tailor your resume for every job application with Claude AI
        - generic [ref=e60]:
          - button "Get Started Free" [ref=e61] [cursor=pointer]
          - button "Sign In" [ref=e62] [cursor=pointer]
      - generic [ref=e64]:
        - heading "Pro" [level=2] [ref=e65]
        - generic [ref=e66]:
          - generic [ref=e68]:
            - heading "Free" [level=3] [ref=e69]
            - paragraph [ref=e70]: Free
            - list [ref=e72]:
              - listitem [ref=e73]: 5 searches per month
              - listitem [ref=e74]: 1 resume optimization
              - listitem [ref=e75]: Basic support
            - button "Get Started Free" [ref=e76] [cursor=pointer]
          - generic [ref=e78]:
            - generic [ref=e79]: Popular
            - heading "Pro" [level=3] [ref=e80]
            - paragraph [ref=e81]: $14.90/month
            - list [ref=e83]:
              - listitem [ref=e84]: ✓ Unlimited searches
              - listitem [ref=e85]: ✓ Unlimited optimizations
              - listitem [ref=e86]: ✓ AI analysis (Claude)
              - listitem [ref=e87]: ✓ Priority support
            - button "Subscribe now" [ref=e88] [cursor=pointer]
          - generic [ref=e90]:
            - heading "Enterprise" [level=3] [ref=e91]
            - paragraph [ref=e92]: Custom
            - list [ref=e94]:
              - listitem [ref=e95]: Everything in Pro
              - listitem [ref=e96]: Dedicated API
              - listitem [ref=e97]: Custom integrations
              - listitem [ref=e98]: Account manager
            - button "Talk to sales" [ref=e99] [cursor=pointer]
      - generic [ref=e101]:
        - heading "Features" [level=2] [ref=e102]
        - generic [ref=e103]:
          - generic [ref=e105]:
            - paragraph [ref=e106]: Global
            - paragraph [ref=e107]: Support for 180+ countries and 50+ languages
          - generic [ref=e109]:
            - paragraph [ref=e110]: Smart AI
            - paragraph [ref=e111]: Optimization with Claude 3.5 + Google Gemini
          - generic [ref=e113]:
            - paragraph [ref=e114]: Mobile first
            - paragraph [ref=e115]: Responsive web app for any device
      - generic [ref=e117]:
        - heading "Ready to transform your career?" [level=2] [ref=e118]
        - paragraph [ref=e119]: Join thousands of professionals already using Sync.IA
        - button "Get Started Free" [ref=e120] [cursor=pointer]
      - dialog "Sign in or create your account" [ref=e121]:
        - generic [ref=e124]:
          - button "Close modal" [ref=e125] [cursor=pointer]
          - generic [ref=e126]:
            - heading "Sign in or create your account" [level=1] [ref=e127]
            - paragraph [ref=e128]: Find your job with AI in minutes
          - generic [ref=e129]:
            - button " Continue with Google" [ref=e130] [cursor=pointer]:
              - generic [ref=e132]: 
              - generic [ref=e133]: Continue with Google
            - button " Continue with LinkedIn" [ref=e134] [cursor=pointer]:
              - generic [ref=e136]: 
              - generic [ref=e137]: Continue with LinkedIn
          - generic [ref=e140]: or
          - generic [ref=e142]:
            - generic [ref=e143]:
              - generic [ref=e144]: Email
              - textbox "you@email.com" [ref=e146]
            - generic [ref=e147]:
              - generic [ref=e148]: Password
              - generic [ref=e149]:
                - textbox "••••••••" [ref=e150]
                - button "Mostrar senha" [ref=e151] [cursor=pointer]:
                  - generic [ref=e152]: 
              - button "Forgot password?" [ref=e154] [cursor=pointer]
            - button "Sign in" [ref=e155] [cursor=pointer]:
              - generic [ref=e156]: Sign in
          - paragraph [ref=e157]:
            - text: By signing in, you agree to our
            - link "Terms of Service" [ref=e158] [cursor=pointer]:
              - /url: /terms
  - generic [ref=e163] [cursor=pointer]:
    - button "Open Next.js Dev Tools" [ref=e164]:
      - img [ref=e165]
    - generic [ref=e170]:
      - button "Open issues overlay" [ref=e171]:
        - generic [ref=e172]:
          - generic [ref=e173]: "0"
          - generic [ref=e174]: "1"
        - generic [ref=e175]: Issue
      - button "Collapse issues badge" [ref=e176]:
        - img [ref=e177]
  - alert [ref=e179]
```

# Test source

```ts
  1   | import { createBdd } from 'playwright-bdd';
  2   | import { expect } from '@playwright/test';
  3   | 
  4   | const { Given, When, Then, Before } = createBdd();
  5   | 
  6   | const authContext: {
  7   |   shouldSkip?: boolean;
  8   |   skipReason?: string;
  9   |   mockSession?: any;
  10  | } = {};
  11  | 
  12  | // Resetar contexto antes de cada cenário
  13  | Before(({}) => {
  14  |   authContext.shouldSkip = false;
  15  |   authContext.skipReason = undefined;
  16  | });
  17  | 
  18  | Given('que o sistema está sendo preparado para execução', async ({}) => {
  19  |   // Step de contexto - não requer ação específica
  20  | });
  21  | 
  22  | When('o OAuth retorna com sucesso simulado para Google', async ({ page, context }) => {
  23  |   // Mockar a sessão para simular sucesso OAuth do Google com valores default do schema users
  24  |   const mockSession = await page.evaluate(() => {
  25  |     const session = {
  26  |       user: {
  27  |         id: 'mock-google-user-id',
  28  |         name: 'Google User',
  29  |         email: 'google@example.com',
  30  |         plan_type: 'free',
  31  |         resumes_count: 0,
  32  |         ssi_score: 0,
  33  |         ats_score: 0,
  34  |         is_pro: false
  35  |       },
  36  |       expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  37  |     };
  38  | 
  39  |     localStorage.setItem('next-auth.session-token', JSON.stringify(session));
  40  |     return session;
  41  |   });
  42  | 
  43  |   authContext.mockSession = mockSession;
  44  | });
  45  | 
  46  | When('o OAuth retorna com sucesso simulado para LinkedIn', async ({ page, context }) => {
  47  |   // Mockar a sessão para simular sucesso OAuth do LinkedIn com valores default do schema users
  48  |   const mockSession = await page.evaluate(() => {
  49  |     const session = {
  50  |       user: {
  51  |         id: 'mock-linkedin-user-id',
  52  |         name: 'LinkedIn User',
  53  |         email: 'linkedin@example.com',
  54  |         plan_type: 'free',
  55  |         resumes_count: 0,
  56  |         ssi_score: 0,
  57  |         ats_score: 0,
  58  |         is_pro: false
  59  |       },
  60  |       expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  61  |     };
  62  | 
  63  |     localStorage.setItem('next-auth.session-token', JSON.stringify(session));
  64  |     return session;
  65  |   });
  66  | 
  67  |   authContext.mockSession = mockSession;
  68  | });
  69  | 
  70  | Then('sou redirecionado para {string}', async ({ page }, expectedPath: string) => {
> 71  |   await expect(page).toHaveURL(expectedPath);
      |                      ^ Error: expect.toHaveURL: Target page, context or browser has been closed
  72  | });
  73  | 
  74  | Then('a sessão contém os valores default do schema users', async ({ page }) => {
  75  |   // Validar que a sessão mockada contém os valores default
  76  |   const sessionData = authContext.mockSession;
  77  | 
  78  |   expect(sessionData).toBeDefined();
  79  |   expect(sessionData.user).toBeDefined();
  80  | });
  81  | 
  82  | Then('plan_type é {string}', async ({ page }, expectedPlan: string) => {
  83  |   const sessionData = authContext.mockSession;
  84  |   expect(sessionData.user.plan_type).toBe(expectedPlan);
  85  | });
  86  | 
  87  | Then('ats_score é {int}', async ({ page }, expectedScore: number) => {
  88  |   const sessionData = authContext.mockSession;
  89  |   expect(sessionData.user.ats_score).toBe(expectedScore);
  90  | });
  91  | 
  92  | Then('ssi_score é {int}', async ({ page }, expectedScore: number) => {
  93  |   const sessionData = authContext.mockSession;
  94  |   expect(sessionData.user.ssi_score).toBe(expectedScore);
  95  | });
  96  | 
  97  | Then('resumes_count é {int}', async ({ page }, expectedCount: number) => {
  98  |   const sessionData = authContext.mockSession;
  99  |   expect(sessionData.user.resumes_count).toBe(expectedCount);
  100 | });
  101 | 
  102 | When('a URL contém o parâmetro {string}', async ({ page }, param: string) => {
  103 |   await page.goto(`/${param}`);
  104 | });
  105 | 
  106 | Then('a UI deve exibir o alerta {string}', async ({ page }, selector: string) => {
  107 |   const element = page.locator(selector).first();
  108 |   await expect(element).toBeVisible({ timeout: 5000 });
  109 | });
  110 | 
  111 | Then('o alerta {string} é exibido informando o cancelamento', async ({ page }, selector: string) => {
  112 |   const element = page.locator(selector).first();
  113 |   await expect(element).toBeVisible({ timeout: 5000 });
  114 |   const text = await element.textContent();
  115 |   expect(text?.toLowerCase()).toContain('cancel');
  116 | });
  117 | 
  118 | // ──────── Steps para novos cenários ────────
  119 | 
  120 | Given('o modal de autenticação está aberto', async ({ page }) => {
  121 |   // Clicar no botão de login da navegação para abrir o modal
  122 |   const loginButton = page.locator('#nav-login-btn').first();
  123 |   await loginButton.click();
  124 | 
  125 |   // Esperar o modal estar visível
  126 |   await page.waitForSelector('#auth-modal', { state: 'visible' });
  127 | });
  128 | 
  129 | When('clico no botão {string}', async ({ page }, selector: string) => {
  130 |   const button = page.locator(selector).first();
  131 |   // Para o toggle password, clicar no ícone dentro do botão
  132 |   if (selector === '#toggle-password-visibility') {
  133 |     const icon = button.locator('i').first();
  134 |     await icon.click({ force: true });
  135 |   } else {
  136 |     await button.click({ force: true });
  137 |   }
  138 |   await page.waitForTimeout(200);
  139 | });
  140 | 
  141 | When('clico novamente no botão {string}', async ({ page }, selector: string) => {
  142 |   const button = page.locator(selector).first();
  143 |   // Para o toggle password, clicar no ícone dentro do botão
  144 |   if (selector === '#toggle-password-visibility') {
  145 |     const icon = button.locator('i').first();
  146 |     await icon.click({ force: true });
  147 |   } else {
  148 |     await button.click({ force: true });
  149 |   }
  150 |   await page.waitForTimeout(200);
  151 | });
  152 | 
  153 | Then('o input {string} deve ter type {string}', async ({ page }, selector: string, expectedType: string) => {
  154 |   const input = page.locator(selector).first();
  155 |   const inputType = await input.getAttribute('type');
  156 |   expect(inputType).toBe(expectedType);
  157 | });
  158 | 
  159 | When('clico no link para termos', async ({ page }) => {
  160 |   const termsLink = page.locator('a[href="/terms"]').first();
  161 |   await termsLink.click({ force: true });
  162 | });
  163 | 
  164 | Then('o botão {string} deve estar visível', async ({ page }, selector: string) => {
  165 |   const button = page.locator(selector).first();
  166 |   await expect(button).toBeVisible({ timeout: 5000 });
  167 | });
  168 | 
  169 | Then('o formulário de login deve estar visível', async ({ page }) => {
  170 |   const emailInput = page.locator('#input-email').first();
  171 |   const passwordInput = page.locator('#input-password').first();
```