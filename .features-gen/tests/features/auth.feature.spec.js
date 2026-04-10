/** Generated from: tests\features\auth.feature */
import { test } from "playwright-bdd";

test.describe("Autenticação (OAuth, Credenciais e Recuperação de Senha)", () => {

  test.beforeEach(async ({ Given }) => {
    await Given("que o sistema está sendo preparado para execução");
  });

  test("Cadastro/Login via Google com validação de persistência e redirecionamento", async ({ Given, page, When, context, Then, And }) => {
    await Given("que sou um visitante na raiz \"/\"", null, { page });
    await When("o OAuth retorna com sucesso simulado para Google", null, { page, context });
    await Then("a sessão contém os valores default do schema users", null, { page });
    await And("plan_type é \"free\"", null, { page });
    await And("ats_score é 0", null, { page });
    await And("ssi_score é 0", null, { page });
    await And("resumes_count é 0", null, { page });
    await And("sou redirecionado para \"/inicio\"", null, { page });
  });

  test("Cadastro/Login via LinkedIn com validação de persistência e redirecionamento", async ({ Given, page, When, context, Then, And }) => {
    await Given("que sou um visitante na raiz \"/\"", null, { page });
    await When("o OAuth retorna com sucesso simulado para LinkedIn", null, { page, context });
    await Then("a sessão contém os valores default do schema users", null, { page });
    await And("plan_type é \"free\"", null, { page });
    await And("ats_score é 0", null, { page });
    await And("sou redirecionado para \"/inicio\"", null, { page });
  });

  test("Erro no callback OAuth exibe alerta", async ({ Given, page, When, Then }) => {
    await Given("que sou um visitante na raiz \"/\"", null, { page });
    await When("a URL contém o parâmetro \"?error=OAuthCallback\"", null, { page });
    await Then("a UI deve exibir o alerta \"#toast-auth-error\"", null, { page });
  });

  test("Cancelamento pelo utilizador exibe alerta", async ({ Given, page, When, Then }) => {
    await Given("que sou um visitante na raiz \"/\"", null, { page });
    await When("a URL contém o parâmetro \"?error=AccessDenied\"", null, { page });
    await Then("o alerta \"#toast-auth-error\" é exibido informando o cancelamento", null, { page });
  });

  test("Login com credenciais existentes redireciona para /inicio", async ({ Given, page, And, When, Then }) => {
    await Given("que sou um visitante na raiz \"/\"", null, { page });
    await And("o modal de autenticação está aberto", null, { page });
    await When("preencho o campo \"#input-email\" com \"teste@exemplo.com\"", null, { page });
    await And("preencho o campo \"#input-password\" com \"senha123\"", null, { page });
    await And("submeto o formulário de login", null, { page });
    await Then("sou redirecionado para \"/inicio\"", null, { page });
  });

  test("Senha incorreta exibe mensagem de erro", async ({ Given, page, And, When, Then }) => {
    await Given("que sou um visitante na raiz \"/\"", null, { page });
    await And("o modal de autenticação está aberto", null, { page });
    await When("preencho o campo \"#input-email\" com \"teste@exemplo.com\"", null, { page });
    await And("preencho o campo \"#input-password\" com \"senha_errada\"", null, { page });
    await And("submeto o formulário de login", null, { page });
    await Then("a notificação de erro \"#notification-error\" deve estar visível", null, { page });
  });

  test("Navegação para página de Termos", async ({ Given, page, And, When, Then }) => {
    await Given("que sou um visitante na raiz \"/\"", null, { page });
    await And("o modal de autenticação está aberto", null, { page });
    await When("clico no link para termos", null, { page });
    await Then("sou redirecionado para \"/terms\"", null, { page });
  });

  test("Navegação Fluida - Recuperação de Senha", async ({ Given, page, And, When, Then }) => {
    await Given("que sou um visitante na raiz \"/\"", null, { page });
    await And("o modal de autenticação está aberto", null, { page });
    await When("clico no botão \"#link-forgot-password\"", null, { page });
    await Then("o botão \"#btn-send-recovery\" deve estar visível", null, { page });
    await When("clico no botão \"#btn-back-to-login\"", null, { page });
    await Then("o formulário de login deve estar visível", null, { page });
  });

  test("Enviar solicitação de recuperação de senha com email existente", async ({ Given, page, When, And, Then }) => {
    await Given("que estou na visão de recuperação de senha", null, { page });
    await When("preencho o e-mail com \"teste@exemplo.com\"", null, { page });
    await And("clico no botão \"#btn-send-recovery\"", null, { page });
    await Then("a notificação de sucesso \"#notification-success\" deve estar visível", null, { page });
  });

  test("Enviar solicitação de recuperação com email não existente exibe erro", async ({ Given, page, When, And, Then }) => {
    await Given("que estou na visão de recuperação de senha", null, { page });
    await When("preencho o e-mail com \"naoexiste@exemplo.com\"", null, { page });
    await And("clico no botão \"#btn-send-recovery\"", null, { page });
    await Then("a notificação de erro \"#notification-error\" deve estar visível", null, { page });
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use("tests\\features\\auth.feature"),
  $bddFileMeta: ({}, use) => use(bddFileMeta),
  $lang: ({}, use) => use("pt"),
});

const bddFileMeta = {
  "Cadastro/Login via Google com validação de persistência e redirecionamento": {"pickleLocation":"15:3"},
  "Cadastro/Login via LinkedIn com validação de persistência e redirecionamento": {"pickleLocation":"25:3"},
  "Erro no callback OAuth exibe alerta": {"pickleLocation":"33:3"},
  "Cancelamento pelo utilizador exibe alerta": {"pickleLocation":"38:3"},
  "Login com credenciais existentes redireciona para /inicio": {"pickleLocation":"55:3"},
  "Senha incorreta exibe mensagem de erro": {"pickleLocation":"63:3"},
  "Navegação para página de Termos": {"pickleLocation":"75:3"},
  "Navegação Fluida - Recuperação de Senha": {"pickleLocation":"85:3"},
  "Enviar solicitação de recuperação de senha com email existente": {"pickleLocation":"93:1"},
  "Enviar solicitação de recuperação com email não existente exibe erro": {"pickleLocation":"99:1"},
};