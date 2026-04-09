/** Generated from: tests\features\auth.feature */
import { test } from "playwright-bdd";

test.describe("Autenticação OAuth (Google/LinkedIn)", () => {

  test.beforeEach(async ({ Given }) => {
    await Given("que o sistema está sendo preparado para execução");
  });

  test("OAuth com sucesso redireciona para dashboard", async ({ Given, page, When, Then }) => {
    await Given("que sou um visitante na raiz \"/\"", null, { page });
    await When("o OAuth retorna com sucesso", null, { page });
    await Then("sou redirecionado para \"/inicio\"", null, { page });
  });

  test("Erro no callback OAuth exibe alerta", async ({ Given, When, page, Then }) => {
    await Given("que ocorreu um erro no backend");
    await When("a URL contém o parâmetro \"?error=OAuthCallback\"", null, { page });
    await Then("a UI deve exibir o alerta \"#toast-auth-error\"", null, { page });
  });

  test("Cancelamento pelo utilizador exibe alerta", async ({ Given, When, page, Then }) => {
    await Given("que o utilizador cancelou o OAuth");
    await When("a URL contém o parâmetro \"?error=AccessDenied\"", null, { page });
    await Then("o alerta \"#toast-auth-error\" é exibido informando o cancelamento", null, { page });
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
  "OAuth com sucesso redireciona para dashboard": {"pickleLocation":"11:3"},
  "Erro no callback OAuth exibe alerta": {"pickleLocation":"18:3"},
  "Cancelamento pelo utilizador exibe alerta": {"pickleLocation":"23:3"},
};