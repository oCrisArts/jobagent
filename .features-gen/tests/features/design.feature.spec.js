/** Generated from: tests\features\design.feature */
import { test } from "playwright-bdd";

test.describe("Validação de Design Tokens", () => {

  test.beforeEach(async ({ Given }) => {
    await Given("que o sistema está sendo preparado para execução");
  });

  test("Validar existência do arquivo de tokens", async ({ Given, When, Then }) => {
    await Given("que o projeto está configurado");
    await When("verifico o arquivo de tokens de design");
    await Then("o arquivo \"styles/_tokens.scss\" deve existir");
  });

  test("Validar conteúdo dos tokens de cor", async ({ Given, When, Then, And }) => {
    await Given("que o arquivo de tokens existe");
    await When("leio o conteúdo dos tokens");
    await Then("deve conter a variável \"$color-brand-600\"");
    await And("deve conter a variável \"$color-surface-base\"");
    await And("deve conter a variável \"$color-text-primary\"");
  });

  test("Validar conteúdo dos tokens de espaçamento", async ({ Given, When, Then, And }) => {
    await Given("que o arquivo de tokens existe");
    await When("leio o conteúdo dos tokens");
    await Then("deve conter a variável \"$space-space-4\"");
    await And("deve conter a variável \"$space-space-8\"");
    await And("deve conter a variável \"$space-space-16\"");
  });

  test("Validar conteúdo dos tokens de tipografia", async ({ Given, When, Then, And }) => {
    await Given("que o arquivo de tokens existe");
    await When("leio o conteúdo dos tokens");
    await Then("deve conter a variável \"$typography-font-size-base\"");
    await And("deve conter a variável \"$typography-font-family-sans\"");
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use("tests\\features\\design.feature"),
  $bddFileMeta: ({}, use) => use(bddFileMeta),
  $lang: ({}, use) => use("pt"),
});

const bddFileMeta = {
  "Validar existência do arquivo de tokens": {"pickleLocation":"11:3"},
  "Validar conteúdo dos tokens de cor": {"pickleLocation":"16:3"},
  "Validar conteúdo dos tokens de espaçamento": {"pickleLocation":"23:3"},
  "Validar conteúdo dos tokens de tipografia": {"pickleLocation":"30:3"},
};