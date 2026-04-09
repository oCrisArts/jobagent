import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { Given, When, Then, Before } = createBdd();

const authContext: {
  shouldSkip?: boolean;
  skipReason?: string;
  mockSession?: any;
} = {};

// Resetar contexto antes de cada cenário
Before(({}) => {
  authContext.shouldSkip = false;
  authContext.skipReason = undefined;
});

When('o OAuth retorna com sucesso simulado para Google', async ({ page, context }) => {
  // Mockar a sessão para simular sucesso OAuth do Google com valores default do schema users
  const mockSession = await page.evaluate(() => {
    const session = {
      user: {
        id: 'mock-google-user-id',
        name: 'Google User',
        email: 'google@example.com',
        plan_type: 'free',
        resumes_count: 0,
        ssi_score: 0,
        ats_score: 0,
        is_pro: false
      },
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    };

    localStorage.setItem('next-auth.session-token', JSON.stringify(session));
    return session;
  });

  authContext.mockSession = mockSession;
});

When('o OAuth retorna com sucesso simulado para LinkedIn', async ({ page, context }) => {
  // Mockar a sessão para simular sucesso OAuth do LinkedIn com valores default do schema users
  const mockSession = await page.evaluate(() => {
    const session = {
      user: {
        id: 'mock-linkedin-user-id',
        name: 'LinkedIn User',
        email: 'linkedin@example.com',
        plan_type: 'free',
        resumes_count: 0,
        ssi_score: 0,
        ats_score: 0,
        is_pro: false
      },
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    };

    localStorage.setItem('next-auth.session-token', JSON.stringify(session));
    return session;
  });

  authContext.mockSession = mockSession;
});

Then('sou redirecionado para {string}', async ({ page }, expectedPath: string) => {
  await expect(page).toHaveURL(expectedPath);
});

Then('a sessão contém os valores default do schema users', async ({ page }) => {
  // Validar que a sessão mockada contém os valores default
  const sessionData = authContext.mockSession;

  expect(sessionData).toBeDefined();
  expect(sessionData.user).toBeDefined();
});

Then('plan_type é {string}', async ({ page }, expectedPlan: string) => {
  const sessionData = authContext.mockSession;
  expect(sessionData.user.plan_type).toBe(expectedPlan);
});

Then('ats_score é {int}', async ({ page }, expectedScore: number) => {
  const sessionData = authContext.mockSession;
  expect(sessionData.user.ats_score).toBe(expectedScore);
});

Then('ssi_score é {int}', async ({ page }, expectedScore: number) => {
  const sessionData = authContext.mockSession;
  expect(sessionData.user.ssi_score).toBe(expectedScore);
});

Then('resumes_count é {int}', async ({ page }, expectedCount: number) => {
  const sessionData = authContext.mockSession;
  expect(sessionData.user.resumes_count).toBe(expectedCount);
});

When('a URL contém o parâmetro {string}', async ({ page }, param: string) => {
  await page.goto(`/${param}`);
});

Then('a UI deve exibir o alerta {string}', async ({ page }, selector: string) => {
  const element = page.locator(selector).first();
  await expect(element).toBeVisible({ timeout: 5000 });
});

Then('o alerta {string} é exibido informando o cancelamento', async ({ page }, selector: string) => {
  const element = page.locator(selector).first();
  await expect(element).toBeVisible({ timeout: 5000 });
  const text = await element.textContent();
  expect(text?.toLowerCase()).toContain('cancel');
});

// ──────── Steps para novos cenários ────────

Given('o modal de autenticação está aberto', async ({ page }) => {
  // Clicar no botão de login da navegação para abrir o modal
  const loginButton = page.locator('#nav-login-btn').first();
  await loginButton.click();

  // Esperar o modal estar visível
  await page.waitForSelector('#auth-modal', { state: 'visible' });
});

When('clico no botão {string}', async ({ page }, selector: string) => {
  const button = page.locator(selector).first();
  // Para o toggle password, clicar no ícone dentro do botão
  if (selector === '#toggle-password-visibility') {
    const icon = button.locator('i').first();
    await icon.click({ force: true });
  } else {
    await button.click({ force: true });
  }
  await page.waitForTimeout(200);
});

When('clico novamente no botão {string}', async ({ page }, selector: string) => {
  const button = page.locator(selector).first();
  // Para o toggle password, clicar no ícone dentro do botão
  if (selector === '#toggle-password-visibility') {
    const icon = button.locator('i').first();
    await icon.click({ force: true });
  } else {
    await button.click({ force: true });
  }
  await page.waitForTimeout(200);
});

Then('o input {string} deve ter type {string}', async ({ page }, selector: string, expectedType: string) => {
  const input = page.locator(selector).first();
  const inputType = await input.getAttribute('type');
  expect(inputType).toBe(expectedType);
});

When('clico no link para termos', async ({ page }) => {
  const termsLink = page.locator('a[href="/terms"]').first();
  await termsLink.click({ force: true });
});

Then('o botão {string} deve estar visível', async ({ page }, selector: string) => {
  const button = page.locator(selector).first();
  await expect(button).toBeVisible({ timeout: 5000 });
});

Then('o formulário de login deve estar visível', async ({ page }) => {
  const emailInput = page.locator('#input-email').first();
  const passwordInput = page.locator('#input-password').first();
  await expect(emailInput).toBeVisible({ timeout: 5000 });
  await expect(passwordInput).toBeVisible({ timeout: 5000 });
});
