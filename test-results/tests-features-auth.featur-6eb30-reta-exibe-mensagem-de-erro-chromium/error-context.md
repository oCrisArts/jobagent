# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\features\auth.feature.spec.js >> Autenticação (OAuth, Credenciais e Recuperação de Senha) >> Senha incorreta exibe mensagem de erro
- Location: .features-gen\tests\features\auth.feature.spec.js:51:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('#notification-error').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('#notification-error').first()

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
  - dialog "Sign in or create your account" [ref=e15]:
    - generic [ref=e18]:
      - button "Close modal" [ref=e19] [cursor=pointer]
      - generic [ref=e20]:
        - heading "Sign in or create your account" [level=1] [ref=e21]
        - paragraph [ref=e22]: Find your job with AI in minutes
      - generic [ref=e23]:
        - generic [ref=e24]:
          - generic [ref=e25]: Email
          - textbox "Email" [disabled] [ref=e27]:
            - /placeholder: you@email.com
            - text: teste@exemplo.com
        - generic [ref=e28]:
          - generic [ref=e29]: Password
          - generic [ref=e30]:
            - textbox "Password" [disabled] [ref=e31]:
              - /placeholder: ••••••••
              - text: senha_errada
            - button "Mostrar senha" [ref=e32] [cursor=pointer]:
              - generic [ref=e33]: 
          - button "Forgot password?" [ref=e35] [cursor=pointer]
        - button "Sign in" [disabled]:
          - generic: Sign in
      - generic [ref=e38]: or
      - generic [ref=e40]:
        - button " Continue with Google" [disabled] [ref=e42]:
          - generic [ref=e44]: 
          - generic [ref=e45]: Continue with Google
        - button " Continue with LinkedIn" [disabled] [ref=e47]:
          - generic [ref=e49]: 
          - generic [ref=e50]: Continue with LinkedIn
      - paragraph [ref=e51]:
        - text: By signing in, you agree to our
        - link "Terms of Service" [ref=e52] [cursor=pointer]:
          - /url: /terms
  - main [ref=e53]:
    - main [ref=e54]:
      - generic [ref=e57]:
        - heading "Your AI-Powered Career Assistant" [level=1] [ref=e58]
        - paragraph [ref=e59]: Tailor your resume for every job application with Claude AI
        - button "Get Started Free" [ref=e61] [cursor=pointer]
      - generic [ref=e63]:
        - heading "Pro" [level=2] [ref=e64]
        - generic [ref=e65]:
          - generic [ref=e67]:
            - heading "Free" [level=3] [ref=e68]
            - paragraph [ref=e69]: Free
            - list [ref=e71]:
              - listitem [ref=e72]: 5 searches per month
              - listitem [ref=e73]: 1 resume optimization
              - listitem [ref=e74]: Basic support
            - button "Get Started Free" [ref=e75] [cursor=pointer]
          - generic [ref=e77]:
            - generic [ref=e78]: Popular
            - heading "Pro" [level=3] [ref=e79]
            - paragraph [ref=e80]: $14.90/month
            - list [ref=e82]:
              - listitem [ref=e83]: ✓ Unlimited searches
              - listitem [ref=e84]: ✓ Unlimited optimizations
              - listitem [ref=e85]: ✓ AI analysis (Claude)
              - listitem [ref=e86]: ✓ Priority support
            - button "Subscribe now" [ref=e87] [cursor=pointer]
          - generic [ref=e89]:
            - heading "Enterprise" [level=3] [ref=e90]
            - paragraph [ref=e91]: Custom
            - list [ref=e93]:
              - listitem [ref=e94]: Everything in Pro
              - listitem [ref=e95]: Dedicated API
              - listitem [ref=e96]: Custom integrations
              - listitem [ref=e97]: Account manager
            - button "Talk to sales" [ref=e98] [cursor=pointer]
      - generic [ref=e100]:
        - heading "Features" [level=2] [ref=e101]
        - generic [ref=e102]:
          - generic [ref=e104]:
            - paragraph [ref=e105]: Global
            - paragraph [ref=e106]: Support for 180+ countries and 50+ languages
          - generic [ref=e108]:
            - paragraph [ref=e109]: Smart AI
            - paragraph [ref=e110]: Optimization with Claude 3.5 + Google Gemini
          - generic [ref=e112]:
            - paragraph [ref=e113]: Mobile first
            - paragraph [ref=e114]: Responsive web app for any device
      - generic [ref=e116]:
        - heading "Ready to transform your career?" [level=2] [ref=e117]
        - paragraph [ref=e118]: Join thousands of professionals already using Sync.IA
        - button "Get Started Free" [ref=e119] [cursor=pointer]
  - button "Open Next.js Dev Tools" [ref=e125] [cursor=pointer]:
    - img [ref=e126]
  - alert [ref=e129]
```

# Test source

```ts
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
  121 |   // Aguardar o botão de login estar visível (Navigation.tsx usa isMounted)
  122 |   const loginButton = page.locator('#nav-login-btn').first();
  123 |   await expect(loginButton).toBeVisible({ timeout: 10000 });
  124 |   await loginButton.click();
  125 | 
  126 |   // Esperar o modal estar visível
  127 |   await page.waitForSelector('#auth-modal', { state: 'visible', timeout: 10000 });
  128 | });
  129 | 
  130 | When('clico no botão {string}', async ({ page }, selector: string) => {
  131 |   const button = page.locator(selector).first();
  132 |   // Para o toggle password, clicar no ícone dentro do botão
  133 |   if (selector === '#toggle-password-visibility') {
  134 |     const icon = button.locator('i').first();
  135 |     await icon.click({ force: true });
  136 |   } else {
  137 |     await button.click({ force: true });
  138 |   }
  139 |   await page.waitForTimeout(200);
  140 | });
  141 | 
  142 | When('clico novamente no botão {string}', async ({ page }, selector: string) => {
  143 |   const button = page.locator(selector).first();
  144 |   // Para o toggle password, clicar no ícone dentro do botão
  145 |   if (selector === '#toggle-password-visibility') {
  146 |     const icon = button.locator('i').first();
  147 |     await icon.click({ force: true });
  148 |   } else {
  149 |     await button.click({ force: true });
  150 |   }
  151 |   await page.waitForTimeout(200);
  152 | });
  153 | 
  154 | Then('o input {string} deve ter type {string}', async ({ page }, selector: string, expectedType: string) => {
  155 |   const input = page.locator(selector).first();
  156 |   const inputType = await input.getAttribute('type');
  157 |   expect(inputType).toBe(expectedType);
  158 | });
  159 | 
  160 | When('clico no link para termos', async ({ page }) => {
  161 |   const termsLink = page.locator('a[href="/terms"]').first();
  162 |   await termsLink.click({ force: true });
  163 |   await page.waitForURL('**/terms', { waitUntil: 'domcontentloaded' });
  164 | });
  165 | 
  166 | Then('o botão {string} deve estar visível', async ({ page }, selector: string) => {
  167 |   const button = page.locator(selector).first();
  168 |   await expect(button).toBeVisible({ timeout: 5000 });
  169 | });
  170 | 
  171 | Then('o formulário de login deve estar visível', async ({ page }) => {
  172 |   const emailInput = page.locator('#input-email').first();
  173 |   const passwordInput = page.locator('#input-password').first();
  174 |   await expect(emailInput).toBeVisible({ timeout: 5000 });
  175 |   await expect(passwordInput).toBeVisible({ timeout: 5000 });
  176 | });
  177 | 
  178 | // ─────────────────────────────────────────────────────────
  179 | // Steps para Credenciais (Email/Senha)
  180 | // ─────────────────────────────────────────────────────────
  181 | // Nota: 'que sou um visitante na raiz {string}' já está definido em navigation.steps.ts
  182 | 
  183 | When('preencho o campo {string} com {string}', async ({ page }, selector: string, value: string) => {
  184 |   const input = page.locator(selector).first();
  185 |   await input.fill(value);
  186 | });
  187 | 
  188 | When('submeto o formulário de login', async ({ page }) => {
  189 |   // Submeter o formulário clicando no botão de login
  190 |   const loginButton = page.locator('#btn-email-login').first();
  191 |   await loginButton.click();
  192 |   // Aguardar redirecionamento ou resposta
  193 |   await page.waitForTimeout(1000);
  194 | });
  195 | 
  196 | Then('a UI deve exibir mensagem de erro {string}', async ({ page }, message: string) => {
  197 |   // Verificar se há algum alerta de erro visível
  198 |   const errorAlert = page.locator('#notification-error, .notification.is-danger, .auth-error, [role="alert"]').first();
  199 |   await expect(errorAlert).toBeVisible({ timeout: 5000 });
  200 |   const text = await errorAlert.textContent();
  201 |   expect(text?.toLowerCase()).toContain(message.toLowerCase());
  202 | });
  203 | 
  204 | Then('a notificação de erro {string} deve estar visível', async ({ page }, selector: string) => {
  205 |   // Verificar notificação de erro por ID
  206 |   const errorNotification = page.locator(selector).first();
> 207 |   await expect(errorNotification).toBeVisible({ timeout: 5000 });
      |                                   ^ Error: expect(locator).toBeVisible() failed
  208 | });
  209 | 
  210 | // ─────────────────────────────────────────────────────────
  211 | // Steps para Recuperação de Senha
  212 | // ─────────────────────────────────────────────────────────
  213 | 
  214 | Given('que estou na visão de recuperação de senha', async ({ page }) => {
  215 |   // Navegar para a raiz primeiro
  216 |   await page.goto('/', { waitUntil: 'networkidle' });
  217 |   
  218 |   // Aguardar o JavaScript do Navigation.tsx montar o componente
  219 |   await page.waitForTimeout(1000);
  220 |   
  221 |   // Abrir modal e navegar para forgot-password
  222 |   const loginButton = page.locator('#nav-login-btn').first();
  223 |   await expect(loginButton).toBeVisible({ timeout: 10000 });
  224 |   await loginButton.click();
  225 |   await page.waitForSelector('#auth-modal', { state: 'visible', timeout: 10000 });
  226 |   
  227 |   // Clicar no link de forgot password
  228 |   const forgotLink = page.locator('#link-forgot-password').first();
  229 |   await expect(forgotLink).toBeVisible({ timeout: 5000 });
  230 |   await forgotLink.click();
  231 |   
  232 |   // Aguardar a view mudar - o campo de senha deve desaparecer
  233 |   await page.waitForSelector('#input-password', { state: 'hidden', timeout: 5000 }).catch(() => {
  234 |     // Se não desaparecer, tudo bem - pode ser que a view mantenha o campo
  235 |   });
  236 |   
  237 |   // Verificar que o botão de enviar recuperação está visível
  238 |   const sendRecoveryBtn = page.locator('#btn-send-recovery').first();
  239 |   await expect(sendRecoveryBtn).toBeVisible({ timeout: 5000 });
  240 | });
  241 | 
  242 | When('preencho o e-mail com {string}', async ({ page }, email: string) => {
  243 |   const emailInput = page.locator('#input-email').first();
  244 |   await emailInput.fill(email);
  245 | });
  246 | 
  247 | Then('o sistema deve exibir uma notificação de sucesso {string}', async ({ page }, message: string) => {
  248 |   // Verificar toast ou notificação de sucesso
  249 |   const successNotification = page.locator('#notification-success, .notification.is-success, .auth-success, [role="status"]').first();
  250 |   await expect(successNotification).toBeVisible({ timeout: 5000 });
  251 |   const text = await successNotification.textContent();
  252 |   expect(text?.toLowerCase()).toContain(message.toLowerCase());
  253 | });
  254 | 
  255 | Then('a notificação de sucesso {string} deve estar visível', async ({ page }, selector: string) => {
  256 |   // Verificar notificação de sucesso por ID
  257 |   const successNotification = page.locator(selector).first();
  258 |   await expect(successNotification).toBeVisible({ timeout: 5000 });
  259 | });
  260 | 
```