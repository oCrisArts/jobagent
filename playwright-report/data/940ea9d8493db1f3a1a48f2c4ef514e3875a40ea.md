# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\features\auth.feature.spec.js >> Autenticação OAuth (Google/LinkedIn) >> Cadastro/Login via Google com validação de persistência
- Location: .features-gen\tests\features\auth.feature.spec.js:10:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "http://localhost:3000/", waiting until "load"

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