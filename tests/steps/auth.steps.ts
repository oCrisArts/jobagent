import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { Given, When, Then, Before } = createBdd();

const authContext: {
  shouldSkip?: boolean;
  skipReason?: string;
} = {};

// Resetar contexto antes de cada cenário
Before(({}) => {
  authContext.shouldSkip = false;
  authContext.skipReason = undefined;
});

When('o OAuth retorna com sucesso', async ({ page }) => {
  // Simula o sucesso do OAuth navegando diretamente para a página de dashboard
  // Em um cenário real, isso seria após o callback OAuth
  await page.goto('/inicio');
});

Then('sou redirecionado para {string}', async ({ page }, expectedPath: string) => {
  await expect(page).toHaveURL(expectedPath);
});

Then('o elemento {string} fica visível', async ({ page }, selector: string) => {
  const element = page.locator(selector).first();
  await expect(element).toBeVisible();
});

Given('que ocorreu um erro no backend', async ({}) => {
  // Step de contexto - prepara o cenário de erro
});

When('a URL contém o parâmetro {string}', async ({ page }, param: string) => {
  await page.goto(`/${param}`);
});

Then('a UI deve exibir o alerta {string}', async ({ page }, selector: string) => {
  const element = page.locator(selector).first();
  await expect(element).toBeVisible();
});

Given('que o utilizador cancelou o OAuth', async ({}) => {
  // Step de contexto - prepara o cenário de cancelamento
});

Then('o alerta {string} é exibido informando o cancelamento', async ({ page }, selector: string) => {
  const element = page.locator(selector).first();
  await expect(element).toBeVisible();
  const text = await element.textContent();
  expect(text?.toLowerCase()).toContain('cancel');
});
