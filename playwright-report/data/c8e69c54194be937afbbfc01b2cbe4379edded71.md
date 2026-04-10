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
  - navigating to "http://localhost:3000/", waiting until "load"

```

# Page snapshot

```yaml
- main [ref=e2]:
  - main [ref=e3]:
    - generic [ref=e6]:
      - heading "Your AI-Powered Career Assistant" [level=1] [ref=e7]
      - paragraph [ref=e8]: Tailor your resume for every job application with Claude AI
      - generic [ref=e9]:
        - button "Get Started Free" [ref=e10] [cursor=pointer]
        - button "Sign In" [ref=e11] [cursor=pointer]
    - generic [ref=e13]:
      - heading "Pro" [level=2] [ref=e14]
      - generic [ref=e15]:
        - generic [ref=e17]:
          - heading "Free" [level=3] [ref=e18]
          - paragraph [ref=e19]: Free
          - list [ref=e21]:
            - listitem [ref=e22]: 5 searches per month
            - listitem [ref=e23]: 1 resume optimization
            - listitem [ref=e24]: Basic support
          - button "Get Started Free" [ref=e25] [cursor=pointer]
        - generic [ref=e27]:
          - generic [ref=e28]: Popular
          - heading "Pro" [level=3] [ref=e29]
          - paragraph [ref=e30]: $14.90/month
          - list [ref=e32]:
            - listitem [ref=e33]: ✓ Unlimited searches
            - listitem [ref=e34]: ✓ Unlimited optimizations
            - listitem [ref=e35]: ✓ AI analysis (Claude)
            - listitem [ref=e36]: ✓ Priority support
          - button "Subscribe now" [ref=e37] [cursor=pointer]
        - generic [ref=e39]:
          - heading "Enterprise" [level=3] [ref=e40]
          - paragraph [ref=e41]: Custom
          - list [ref=e43]:
            - listitem [ref=e44]: Everything in Pro
            - listitem [ref=e45]: Dedicated API
            - listitem [ref=e46]: Custom integrations
            - listitem [ref=e47]: Account manager
          - button "Talk to sales" [ref=e48] [cursor=pointer]
    - generic [ref=e50]:
      - heading "Features" [level=2] [ref=e51]
      - generic [ref=e52]:
        - generic [ref=e54]:
          - paragraph [ref=e55]: Global
          - paragraph [ref=e56]: Support for 180+ countries and 50+ languages
        - generic [ref=e58]:
          - paragraph [ref=e59]: Smart AI
          - paragraph [ref=e60]: Optimization with Claude 3.5 + Google Gemini
        - generic [ref=e62]:
          - paragraph [ref=e63]: Mobile first
          - paragraph [ref=e64]: Responsive web app for any device
    - generic [ref=e66]:
      - heading "Ready to transform your career?" [level=2] [ref=e67]
      - paragraph [ref=e68]: Join thousands of professionals already using Sync.IA
      - button "Get Started Free" [ref=e69] [cursor=pointer]
```

# Test source

```ts
  1  | import { createBdd } from 'playwright-bdd';
  2  | import { expect } from '@playwright/test';
  3  | 
  4  | const { Given, When, Then } = createBdd();
  5  | 
  6  | Given('que sou um visitante na raiz {string}', async ({ page }, path: string) => {
> 7  |   await page.goto(path);
     |              ^ Error: page.goto: Test timeout of 30000ms exceeded.
  8  | });
  9  | 
  10 | When('clico no elemento {string}', async ({ page }, selector: string) => {
  11 |   const element = page.locator(selector);
  12 |   await element.click();
  13 | });
  14 | 
  15 | Then('o elemento {string} deve estar visível', async ({ page }, selector: string) => {
  16 |   const element = page.locator(selector).first();
  17 |   await expect(element).toBeVisible();
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
  34 | Then('a página carrega sem redirecionamento', async ({ page }) => {
  35 |   // Verifica que a URL atual é a que foi acessada (não houve redirecionamento)
  36 |   const currentUrl = page.url();
  37 |   expect(currentUrl).toContain('/inicio');
  38 | });
  39 | 
  40 | Then('não consigo acessar a área restrita', async ({ page }) => {
  41 |   // Verifica se está na página inicial (redirecionado)
  42 |   const currentUrl = page.url();
  43 |   expect(currentUrl).toContain('/');
  44 | });
  45 | 
```