# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\features\auth.feature.spec.js >> Autenticação OAuth (Google/LinkedIn) >> Erro no callback OAuth exibe alerta
- Location: .features-gen\tests\features\auth.feature.spec.js:28:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "http://localhost:3000/?error=OAuthCallback", waiting until "load"

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
  - main [ref=e15]:
    - main [ref=e16]:
      - generic [ref=e19]:
        - heading "Your AI-Powered Career Assistant" [level=1] [ref=e20]
        - paragraph [ref=e21]: Tailor your resume for every job application with Claude AI
        - generic [ref=e22]:
          - button "Get Started Free" [ref=e23] [cursor=pointer]
          - button "Sign In" [ref=e24] [cursor=pointer]
      - generic [ref=e26]:
        - heading "Pro" [level=2] [ref=e27]
        - generic [ref=e28]:
          - generic [ref=e30]:
            - heading "Free" [level=3] [ref=e31]
            - paragraph [ref=e32]: Free
            - list [ref=e34]:
              - listitem [ref=e35]: 5 searches per month
              - listitem [ref=e36]: 1 resume optimization
              - listitem [ref=e37]: Basic support
            - button "Get Started Free" [ref=e38] [cursor=pointer]
          - generic [ref=e40]:
            - generic [ref=e41]: Popular
            - heading "Pro" [level=3] [ref=e42]
            - paragraph [ref=e43]: $14.90/month
            - list [ref=e45]:
              - listitem [ref=e46]: ✓ Unlimited searches
              - listitem [ref=e47]: ✓ Unlimited optimizations
              - listitem [ref=e48]: ✓ AI analysis (Claude)
              - listitem [ref=e49]: ✓ Priority support
            - button "Subscribe now" [ref=e50] [cursor=pointer]
          - generic [ref=e52]:
            - heading "Enterprise" [level=3] [ref=e53]
            - paragraph [ref=e54]: Custom
            - list [ref=e56]:
              - listitem [ref=e57]: Everything in Pro
              - listitem [ref=e58]: Dedicated API
              - listitem [ref=e59]: Custom integrations
              - listitem [ref=e60]: Account manager
            - button "Talk to sales" [ref=e61] [cursor=pointer]
      - generic [ref=e63]:
        - heading "Features" [level=2] [ref=e64]
        - generic [ref=e65]:
          - generic [ref=e67]:
            - paragraph [ref=e68]: Global
            - paragraph [ref=e69]: Support for 180+ countries and 50+ languages
          - generic [ref=e71]:
            - paragraph [ref=e72]: Smart AI
            - paragraph [ref=e73]: Optimization with Claude 3.5 + Google Gemini
          - generic [ref=e75]:
            - paragraph [ref=e76]: Mobile first
            - paragraph [ref=e77]: Responsive web app for any device
      - generic [ref=e79]:
        - heading "Ready to transform your career?" [level=2] [ref=e80]
        - paragraph [ref=e81]: Join thousands of professionals already using Sync.IA
        - button "Get Started Free" [ref=e82] [cursor=pointer]
  - generic [ref=e87] [cursor=pointer]:
    - button "Open Next.js Dev Tools" [ref=e88]:
      - img [ref=e89]
    - generic [ref=e94]:
      - button "Open issues overlay" [ref=e95]:
        - generic [ref=e96]:
          - generic [ref=e97]: "1"
          - generic [ref=e98]: "2"
        - generic [ref=e99]:
          - text: Issue
          - generic [ref=e100]: s
      - button "Collapse issues badge" [ref=e101]:
        - img [ref=e102]
  - alert [ref=e104]
```

# Test source

```ts
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
  71  |   await expect(page).toHaveURL(expectedPath);
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
> 103 |   await page.goto(`/${param}`);
      |              ^ Error: page.goto: Test timeout of 30000ms exceeded.
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
  172 |   await expect(emailInput).toBeVisible({ timeout: 5000 });
  173 |   await expect(passwordInput).toBeVisible({ timeout: 5000 });
  174 | });
  175 | 
```