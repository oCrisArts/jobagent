/** Generated from: tests\features\auth.feature */
import { test } from "playwright-bdd";

test.describe("Autenticação OAuth (Google/LinkedIn)", () => {

  test.beforeEach(async ({ Given }) => {
    await Given("que o sistema está sendo preparado para execução");
  });

  test("Cadastro/Login via Google com validação de persistência", async ({ Given, page, When, context, Then, And }) => {
    await Given("que sou um visitante na raiz \"/\"", null, { page });
    await When("o OAuth retorna com sucesso simulado para Google", null, { page, context });
    await Then("a sessão contém os valores default do schema users", null, { page });
    await And("plan_type é \"free\"", null, { page });
    await And("ats_score é 0", null, { page });
    await And("ssi_score é 0", null, { page });
    await And("resumes_count é 0", null, { page });
  });

  test("Cadastro/Login via LinkedIn com validação de persistência", async ({ Given, page, When, context, Then, And }) => {
    await Given("que sou um visitante na raiz \"/\"", null, { page });
    await When("o OAuth retorna com sucesso simulado para LinkedIn", null, { page, context });
    await Then("a sessão contém os valores default do schema users", null, { page });
    await And("plan_type é \"free\"", null, { page });
    await And("ats_score é 0", null, { page });
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

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use("tests\\features\\auth.feature"),
  $bddFileMeta: ({}, use) => use(bddFileMeta),
  $lang: ({}, use) => use("pt"),
});

const bddFileMeta = {
  "Cadastro/Login via Google com validação de persistência": {"pickleLocation":"11:3"},
  "Cadastro/Login via LinkedIn com validação de persistência": {"pickleLocation":"20:3"},
  "Erro no callback OAuth exibe alerta": {"pickleLocation":"29:3"},
  "Cancelamento pelo utilizador exibe alerta": {"pickleLocation":"34:3"},
  "Navegação para página de Termos": {"pickleLocation":"47:3"},
  "Navegação Fluida - Recuperação de Senha": {"pickleLocation":"53:3"},
};