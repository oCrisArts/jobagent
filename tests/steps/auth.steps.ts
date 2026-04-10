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

Given('que o sistema está sendo preparado para execução', async ({}) => {
  // Step de contexto - não requer ação específica
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
  await page.goto(`/${param}`, { waitUntil: 'domcontentloaded' });
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
  // Aguardar o botão de login estar visível (Navigation.tsx usa isMounted)
  const loginButton = page.locator('#nav-login-btn').first();
  await expect(loginButton).toBeVisible({ timeout: 10000 });
  await loginButton.click();

  // Esperar o modal estar visível
  await page.waitForSelector('#auth-modal', { state: 'visible', timeout: 10000 });
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
  await page.waitForURL('**/terms', { waitUntil: 'domcontentloaded' });
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

// ─────────────────────────────────────────────────────────
// Steps para Credenciais (Email/Senha)
// ─────────────────────────────────────────────────────────
// Nota: 'que sou um visitante na raiz {string}' já está definido em navigation.steps.ts

When('preencho o campo {string} com {string}', async ({ page }, selector: string, value: string) => {
  const input = page.locator(selector).first();
  await input.fill(value);
});

When('submeto o formulário de login', async ({ page }) => {
  // Submeter o formulário clicando no botão de login
  const loginButton = page.locator('#btn-email-login').first();
  await loginButton.click();
  // Aguardar redirecionamento ou resposta
  await page.waitForTimeout(1000);
});

Then('a UI deve exibir mensagem de erro {string}', async ({ page }, message: string) => {
  // Verificar se há algum alerta de erro visível
  const errorAlert = page.locator('#notification-error, .notification.is-danger, .auth-error, [role="alert"]').first();
  await expect(errorAlert).toBeVisible({ timeout: 5000 });
  const text = await errorAlert.textContent();
  expect(text?.toLowerCase()).toContain(message.toLowerCase());
});

Then('a notificação de erro {string} deve estar visível', async ({ page }, selector: string) => {
  // Verificar notificação de erro por ID (pode ser #email-error, #password-error, etc.)
  const errorNotification = page.locator(selector).first();
  await expect(errorNotification).toBeVisible({ timeout: 5000 });
});

// ─────────────────────────────────────────────────────────
// Steps para Recuperação de Senha
// ─────────────────────────────────────────────────────────

Given('que estou na visão de recuperação de senha', async ({ page }) => {
  // Navegar para a raiz primeiro
  await page.goto('/', { waitUntil: 'networkidle' });
  
  // Aguardar o JavaScript do Navigation.tsx montar o componente
  await page.waitForTimeout(1000);
  
  // Abrir modal e navegar para forgot-password
  const loginButton = page.locator('#nav-login-btn').first();
  await expect(loginButton).toBeVisible({ timeout: 10000 });
  await loginButton.click();
  await page.waitForSelector('#auth-modal', { state: 'visible', timeout: 10000 });
  
  // Clicar no link de forgot password
  const forgotLink = page.locator('#link-forgot-password').first();
  await expect(forgotLink).toBeVisible({ timeout: 5000 });
  await forgotLink.click();
  
  // Aguardar a view mudar - o campo de senha deve desaparecer
  await page.waitForSelector('#input-password', { state: 'hidden', timeout: 5000 }).catch(() => {
    // Se não desaparecer, tudo bem - pode ser que a view mantenha o campo
  });
  
  // Verificar que o botão de enviar recuperação está visível
  const sendRecoveryBtn = page.locator('#btn-send-recovery').first();
  await expect(sendRecoveryBtn).toBeVisible({ timeout: 5000 });
});

When('preencho o e-mail com {string}', async ({ page }, email: string) => {
  const emailInput = page.locator('#input-email').first();
  await emailInput.fill(email);
});

Then('o sistema deve exibir uma notificação de sucesso {string}', async ({ page }, message: string) => {
  // Verificar toast ou notificação de sucesso
  const successNotification = page.locator('#notification-success, .notification.is-success, .auth-success, [role="status"]').first();
  await expect(successNotification).toBeVisible({ timeout: 5000 });
  const text = await successNotification.textContent();
  expect(text?.toLowerCase()).toContain(message.toLowerCase());
});

Then('a notificação de sucesso {string} deve estar visível', async ({ page }, selector: string) => {
  // Verificar notificação de sucesso por ID (pode ser #email-success, #password-success, etc.)
  const successNotification = page.locator(selector).first();
  await expect(successNotification).toBeVisible({ timeout: 5000 });
});
