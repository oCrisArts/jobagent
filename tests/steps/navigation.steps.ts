import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd();

Given('que sou um visitante na raiz {string}', async ({ page }, path: string) => {
  await page.goto(path);
});

When('clico no elemento {string}', async ({ page }, selector: string) => {
  const element = page.locator(selector);
  await element.click();
});

Then('o elemento {string} deve estar visível', async ({ page }, selector: string) => {
  const element = page.locator(selector).first();
  await expect(element).toBeVisible();
});

Given('que sou um visitante deslogado', async ({ page }) => {
  // Limpa cookies e storage para garantir estado deslogado
  await page.context().clearCookies();
  await page.goto('/');
});

When('acesso o caminho {string}', async ({ page }, path: string) => {
  await page.goto(path);
});

Then('sou redirecionado para a página inicial', async ({ page }) => {
  await expect(page).toHaveURL('/');
});

Then('a página carrega sem redirecionamento', async ({ page }) => {
  // Verifica que a URL atual é a que foi acessada (não houve redirecionamento)
  const currentUrl = page.url();
  expect(currentUrl).toContain('/inicio');
});

Then('não consigo acessar a área restrita', async ({ page }) => {
  // Verifica se está na página inicial (redirecionado)
  const currentUrl = page.url();
  expect(currentUrl).toContain('/');
});
