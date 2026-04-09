# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\features\navigation.feature.spec.js >> Navegação do Usuário >> Visitante deslogado é bloqueado ao acessar área restrita
- Location: .features-gen\tests\features\navigation.feature.spec.js:16:3

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected: "http://localhost:3000/"
Received: "http://localhost:3000/inicio"
Timeout:  5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    9 × unexpected value "http://localhost:3000/inicio"

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
      - generic [ref=e9]:
        - heading "Dashboard" [level=1] [ref=e10]
        - paragraph [ref=e11]: Main HUD with SSI Score, applied jobs and last viewed job.
        - generic [ref=e12]:
          - generic [ref=e14]:
            - paragraph [ref=e15]: SSI Score
            - paragraph [ref=e16]: "--"
          - generic [ref=e18]:
            - paragraph [ref=e19]: Applied jobs
            - paragraph [ref=e20]: "--"
          - generic [ref=e22]:
            - paragraph [ref=e23]: Last viewed job
            - paragraph [ref=e24]: "--"
  - alert [ref=e25]
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
> 31 |   await expect(page).toHaveURL('/');
     |                      ^ Error: expect(page).toHaveURL(expected) failed
  32 | });
  33 | 
  34 | Then('não consigo acessar a área restrita', async ({ page }) => {
  35 |   // Verifica se está na página inicial (redirecionado)
  36 |   const currentUrl = page.url();
  37 |   expect(currentUrl).toContain('/');
  38 | });
  39 | 
```