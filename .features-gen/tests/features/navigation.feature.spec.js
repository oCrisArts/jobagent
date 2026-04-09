/** Generated from: tests\features\navigation.feature */
import { test } from "playwright-bdd";

test.describe("Navegação do Usuário", () => {

  test.beforeEach(async ({ Given }) => {
    await Given("que o sistema está sendo preparado para execução");
  });

  test("Visitante clica no botão de login na página inicial", async ({ Given, page, When, Then }) => {
    await Given("que sou um visitante na raiz \"/\"", null, { page });
    await When("clico no elemento \"#nav-login-btn\"", null, { page });
    await Then("o elemento \"#auth-modal\" deve estar visível", null, { page });
  });

  test("Visitante deslogado é bloqueado ao acessar área restrita", async ({ Given, page, When, Then, And }) => {
    await Given("que sou um visitante deslogado", null, { page });
    await When("acesso o caminho \"/inicio\"", null, { page });
    await Then("sou redirecionado para a página inicial", null, { page });
    await And("não consigo acessar a área restrita", null, { page });
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use("tests\\features\\navigation.feature"),
  $bddFileMeta: ({}, use) => use(bddFileMeta),
  $lang: ({}, use) => use("pt"),
});

const bddFileMeta = {
  "Visitante clica no botão de login na página inicial": {"pickleLocation":"11:3"},
  "Visitante deslogado é bloqueado ao acessar área restrita": {"pickleLocation":"16:3"},
};