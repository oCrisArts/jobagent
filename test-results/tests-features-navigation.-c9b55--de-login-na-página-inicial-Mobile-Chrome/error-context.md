# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\features\navigation.feature.spec.js >> Navegação do Usuário >> Visitante clica no botão de login na página inicial
- Location: .features-gen\tests\features\navigation.feature.spec.js:10:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('#nav-login-btn')
    - locator resolved to <button id="nav-login-btn" aria-label="Sign In" class="button is-primary">Sign In</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
      - waiting 100ms
    54 × waiting for element to be visible, enabled and stable
       - element is not visible
     - retrying click action
       - waiting 500ms

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - navigation "Main navigation" [ref=e2]:
    - link "Sync.IA" [ref=e4] [cursor=pointer]:
      - /url: /
      - generic [ref=e6]: Sync.IA
  - main [ref=e7]:
    - main [ref=e8]:
      - generic [ref=e11]:
        - heading "Your AI-Powered Career Assistant" [level=1] [ref=e12]
        - paragraph [ref=e13]: Tailor your resume for every job application with Claude AI
        - generic [ref=e14]:
          - button "Get Started Free" [ref=e15] [cursor=pointer]
          - button "Sign In" [ref=e16] [cursor=pointer]
      - generic [ref=e18]:
        - heading "Pro" [level=2] [ref=e19]
        - generic [ref=e20]:
          - generic [ref=e22]:
            - heading "Free" [level=3] [ref=e23]
            - paragraph [ref=e24]: Free
            - list [ref=e26]:
              - listitem [ref=e27]: 5 searches per month
              - listitem [ref=e28]: 1 resume optimization
              - listitem [ref=e29]: Basic support
            - button "Get Started Free" [ref=e30] [cursor=pointer]
          - generic [ref=e32]:
            - generic [ref=e33]: Popular
            - heading "Pro" [level=3] [ref=e34]
            - paragraph [ref=e35]: $14.90/month
            - list [ref=e37]:
              - listitem [ref=e38]: ✓ Unlimited searches
              - listitem [ref=e39]: ✓ Unlimited optimizations
              - listitem [ref=e40]: ✓ AI analysis (Claude)
              - listitem [ref=e41]: ✓ Priority support
            - button "Subscribe now" [ref=e42] [cursor=pointer]
          - generic [ref=e44]:
            - heading "Enterprise" [level=3] [ref=e45]
            - paragraph [ref=e46]: Custom
            - list [ref=e48]:
              - listitem [ref=e49]: Everything in Pro
              - listitem [ref=e50]: Dedicated API
              - listitem [ref=e51]: Custom integrations
              - listitem [ref=e52]: Account manager
            - button "Talk to sales" [ref=e53] [cursor=pointer]
      - generic [ref=e55]:
        - heading "Features" [level=2] [ref=e56]
        - generic [ref=e57]:
          - generic [ref=e59]:
            - paragraph [ref=e60]: Global
            - paragraph [ref=e61]: Support for 180+ countries and 50+ languages
          - generic [ref=e63]:
            - paragraph [ref=e64]: Smart AI
            - paragraph [ref=e65]: Optimization with Claude 3.5 + Google Gemini
          - generic [ref=e67]:
            - paragraph [ref=e68]: Mobile first
            - paragraph [ref=e69]: Responsive web app for any device
      - generic [ref=e71]:
        - heading "Ready to transform your career?" [level=2] [ref=e72]
        - paragraph [ref=e73]: Join thousands of professionals already using Sync.IA
        - button "Get Started Free" [ref=e74] [cursor=pointer]
  - alert [ref=e75]
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
> 12 |   await element.click();
     |                 ^ Error: locator.click: Test timeout of 30000ms exceeded.
  13 | });
  14 | 
  15 | Then('o elemento {string} deve estar visível', async ({ page }, selector: string) => {
  16 |   const element = page.locator(selector);
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
  34 | Then('não consigo acessar a área restrita', async ({ page }) => {
  35 |   // Verifica se está na página inicial (redirecionado)
  36 |   const currentUrl = page.url();
  37 |   expect(currentUrl).toContain('/');
  38 | });
  39 | 
```