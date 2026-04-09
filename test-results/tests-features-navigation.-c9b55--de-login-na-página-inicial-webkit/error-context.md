# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\features\navigation.feature.spec.js >> Navegação do Usuário >> Visitante clica no botão de login na página inicial
- Location: .features-gen\tests\features\navigation.feature.spec.js:10:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('#auth-modal')
Expected: visible
Error: strict mode violation: locator('#auth-modal') resolved to 2 elements:
    1) <div role="dialog" id="auth-modal" aria-modal="true" class="modal is-active" aria-labelledby="authModalTitle">…</div> aka getByRole('dialog', { name: 'Sign in or create your account' }).first()
    2) <div role="dialog" id="auth-modal" aria-modal="true" class="modal is-active" aria-labelledby="authModalTitle">…</div> aka getByRole('dialog', { name: 'Sign in or create your account' }).nth(1)

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('#auth-modal')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - navigation "Main navigation" [ref=e2]:
    - link "Sync.IA" [ref=e4] [cursor=pointer]:
      - /url: /
      - generic [ref=e6]: Sync.IA
    - generic [ref=e8]:
      - link "Product" [ref=e9] [cursor=pointer]:
        - /url: "#produto"
      - link "Pricing" [ref=e10] [cursor=pointer]:
        - /url: "#pricing"
      - button "Sign In" [ref=e13] [cursor=pointer]
  - dialog "Sign in or create your account" [ref=e14]:
    - generic [ref=e17]:
      - button "Close modal" [ref=e18] [cursor=pointer]
      - generic [ref=e19]:
        - heading "Sign in or create your account" [level=1] [ref=e20]
        - paragraph [ref=e21]: Find your job with AI in minutes
      - generic [ref=e22]:
        - button "Continue with Google" [ref=e23] [cursor=pointer]:
          - generic [ref=e25]: Continue with Google
        - button "Continue with LinkedIn" [ref=e26] [cursor=pointer]:
          - generic [ref=e28]: Continue with LinkedIn
      - generic [ref=e31]: or
      - generic [ref=e33]:
        - generic [ref=e34]:
          - generic [ref=e35]: Email
          - textbox "you@email.com" [ref=e37]
        - generic [ref=e38]:
          - generic [ref=e39]: Password
          - textbox "••••••••" [ref=e41]
        - button "Sign in" [ref=e42] [cursor=pointer]:
          - generic [ref=e43]: Sign in
      - paragraph [ref=e44]:
        - text: By signing in, you agree to our
        - link "Terms of Service" [ref=e45] [cursor=pointer]:
          - /url: /terms
  - main [ref=e46]:
    - main [ref=e47]:
      - generic [ref=e50]:
        - heading "Your AI-Powered Career Assistant" [level=1] [ref=e51]
        - paragraph [ref=e52]: Tailor your resume for every job application with Claude AI
        - generic [ref=e53]:
          - button "Get Started Free" [ref=e54] [cursor=pointer]
          - button "Sign In" [ref=e55] [cursor=pointer]
      - generic [ref=e57]:
        - heading "Pro" [level=2] [ref=e58]
        - generic [ref=e59]:
          - generic [ref=e61]:
            - heading "Free" [level=3] [ref=e62]
            - paragraph [ref=e63]: Free
            - list [ref=e65]:
              - listitem [ref=e66]: 5 searches per month
              - listitem [ref=e67]: 1 resume optimization
              - listitem [ref=e68]: Basic support
            - button "Get Started Free" [ref=e69] [cursor=pointer]
          - generic [ref=e71]:
            - generic [ref=e72]: Popular
            - heading "Pro" [level=3] [ref=e73]
            - paragraph [ref=e74]: $14.90/month
            - list [ref=e76]:
              - listitem [ref=e77]: ✓ Unlimited searches
              - listitem [ref=e78]: ✓ Unlimited optimizations
              - listitem [ref=e79]: ✓ AI analysis (Claude)
              - listitem [ref=e80]: ✓ Priority support
            - button "Subscribe now" [ref=e81] [cursor=pointer]
          - generic [ref=e83]:
            - heading "Enterprise" [level=3] [ref=e84]
            - paragraph [ref=e85]: Custom
            - list [ref=e87]:
              - listitem [ref=e88]: Everything in Pro
              - listitem [ref=e89]: Dedicated API
              - listitem [ref=e90]: Custom integrations
              - listitem [ref=e91]: Account manager
            - button "Talk to sales" [ref=e92] [cursor=pointer]
      - generic [ref=e94]:
        - heading "Features" [level=2] [ref=e95]
        - generic [ref=e96]:
          - generic [ref=e98]:
            - paragraph [ref=e99]: Global
            - paragraph [ref=e100]: Support for 180+ countries and 50+ languages
          - generic [ref=e102]:
            - paragraph [ref=e103]: Smart AI
            - paragraph [ref=e104]: Optimization with Claude 3.5 + Google Gemini
          - generic [ref=e106]:
            - paragraph [ref=e107]: Mobile first
            - paragraph [ref=e108]: Responsive web app for any device
      - generic [ref=e110]:
        - heading "Ready to transform your career?" [level=2] [ref=e111]
        - paragraph [ref=e112]: Join thousands of professionals already using Sync.IA
        - button "Get Started Free" [ref=e113] [cursor=pointer]
      - dialog "Sign in or create your account" [ref=e114]:
        - generic [ref=e117]:
          - button "Close modal" [ref=e118] [cursor=pointer]
          - generic [ref=e119]:
            - heading "Sign in or create your account" [level=1] [ref=e120]
            - paragraph [ref=e121]: Find your job with AI in minutes
          - generic [ref=e122]:
            - button "Continue with Google" [ref=e123] [cursor=pointer]:
              - generic [ref=e125]: Continue with Google
            - button "Continue with LinkedIn" [ref=e126] [cursor=pointer]:
              - generic [ref=e128]: Continue with LinkedIn
          - generic [ref=e131]: or
          - generic [ref=e133]:
            - generic [ref=e134]:
              - generic [ref=e135]: Email
              - textbox "you@email.com" [ref=e137]
            - generic [ref=e138]:
              - generic [ref=e139]: Password
              - textbox "••••••••" [ref=e141]
            - button "Sign in" [ref=e142] [cursor=pointer]:
              - generic [ref=e143]: Sign in
          - paragraph [ref=e144]:
            - text: By signing in, you agree to our
            - link "Terms of Service" [ref=e145] [cursor=pointer]:
              - /url: /terms
  - alert [ref=e146]
```

# Test source

```ts
  1  | import { createBdd } from 'playwright-bdd';
  2  | import { expect } from '@playwright/test';
  3  | 
  4  | const { Given, When, Then } = createBdd();
  5  | 
  6  | Given('que sou um visitante na raiz {string}', async ({ page }, path: string) => {
  7  |   await page.goto(path);
  8  | });
  9  | 
  10 | When('clico no elemento {string}', async ({ page }, selector: string) => {
  11 |   const element = page.locator(selector);
  12 |   await element.click();
  13 | });
  14 | 
  15 | Then('o elemento {string} deve estar visível', async ({ page }, selector: string) => {
  16 |   const element = page.locator(selector);
> 17 |   await expect(element).toBeVisible();
     |                         ^ Error: expect(locator).toBeVisible() failed
  18 | });
  19 | 
  20 | Given('que sou um visitante deslogado', async ({ page }) => {
  21 |   // Limpa cookies e storage para garantir estado deslogado
  22 |   await page.context().clearCookies();
  23 |   await page.goto('/');
  24 | });
  25 | 
  26 | When('acesso o caminho {string}', async ({ page }, path: string) => {
  27 |   await page.goto(path);
  28 | });
  29 | 
  30 | Then('sou redirecionado para a página inicial', async ({ page }) => {
  31 |   await expect(page).toHaveURL('/');
  32 | });
  33 | 
  34 | Then('não consigo acessar a área restrita', async ({ page }) => {
  35 |   // Verifica se está na página inicial (redirecionado)
  36 |   const currentUrl = page.url();
  37 |   expect(currentUrl).toContain('/');
  38 | });
  39 | 
```