/** Generated from: tests\features\infra.feature */
import { test } from "playwright-bdd";

test.describe("Validação de Infraestrutura", () => {

  test.beforeEach(async ({ Given }) => {
    await Given("que o sistema está sendo preparado para execução");
  });

  test("Validar variáveis de ambiente obrigatórias do Supabase", async ({ Given, When, Then, And }) => {
    await Given("que o arquivo .env.local existe");
    await When("verifico as variáveis de ambiente do Supabase");
    await Then("a variável \"NEXT_PUBLIC_SUPABASE_URL\" deve estar definida");
    await And("a variável \"NEXT_PUBLIC_SUPABASE_ANON_KEY\" deve estar definida");
    await And("a variável \"SUPABASE_SERVICE_ROLE_KEY\" deve estar definida");
  });

  test("Validar variáveis de ambiente obrigatórias do Stripe", async ({ Given, When, Then, And }) => {
    await Given("que o arquivo .env.local existe");
    await When("verifico as variáveis de ambiente do Stripe");
    await Then("a variável \"NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY\" deve estar definida");
    await And("a variável \"STRIPE_SECRET_KEY\" deve estar definida");
    await And("a variável \"STRIPE_WEBHOOK_SECRET\" deve estar definida");
  });

  test("Validar variáveis de ambiente obrigatórias do NextAuth", async ({ Given, When, Then, And }) => {
    await Given("que o arquivo .env.local existe");
    await When("verifico as variáveis de ambiente do NextAuth");
    await Then("a variável \"NEXTAUTH_URL\" deve estar definida");
    await And("a variável \"NEXTAUTH_SECRET\" deve estar definida");
  });

  test("Validar conexão com banco de dados Supabase", async ({ Given, When, Then, And }) => {
    await Given("que as credenciais do Supabase estão configuradas");
    await When("realizo uma query de teste no banco de dados");
    await Then("a conexão deve ser estabelecida com sucesso");
    await And("a resposta deve conter dados válidos");
  });

  test("Verificar integridade do provedor de e-mail", async ({ Given, When, page, request, Then }) => {
    await Given("que o serviço de e-mail está configurado");
    await When("eu disparo um e-mail de teste para \"cristiano.acosta.m@gmail.com\"", null, { page, request });
    await Then("a API do Resend deve retornar um status de sucesso 200");
  });

  test("Validar disponibilidade da API do Supabase", async ({ Given, When, Then, And }) => {
    await Given("que a URL do Supabase está configurada");
    await When("faço um ping na API do Supabase");
    await Then("o status code deve ser 200");
    await And("o tempo de resposta deve ser menor que 5 segundos");
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use("tests\\features\\infra.feature"),
  $bddFileMeta: ({}, use) => use(bddFileMeta),
  $lang: ({}, use) => use("pt"),
});

const bddFileMeta = {
  "Validar variáveis de ambiente obrigatórias do Supabase": {"pickleLocation":"11:3"},
  "Validar variáveis de ambiente obrigatórias do Stripe": {"pickleLocation":"18:3"},
  "Validar variáveis de ambiente obrigatórias do NextAuth": {"pickleLocation":"25:3"},
  "Validar conexão com banco de dados Supabase": {"pickleLocation":"31:3"},
  "Verificar integridade do provedor de e-mail": {"pickleLocation":"37:3"},
  "Validar disponibilidade da API do Supabase": {"pickleLocation":"42:3"},
};