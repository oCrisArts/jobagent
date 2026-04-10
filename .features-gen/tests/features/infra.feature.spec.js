/** Generated from: tests\features\infra.feature */
import { test } from "playwright-bdd";

test.describe("Validação de Infraestrutura e Integrações (Health Check)", () => {

  test.beforeEach(async ({ Given }) => {
    await Given("que o sistema está carregando as variáveis de ambiente");
  });

  test("1.1 Validar variáveis e conexão da API do Supabase", async ({ When, And, Then }) => {
    await When("eu verifico a existência das variáveis \"NEXT_PUBLIC_SUPABASE_URL\" e \"SUPABASE_SERVICE_ROLE_KEY\"");
    await And("faço um ping na API REST do Supabase");
    await Then("o status code do Supabase deve ser 200 e o tempo de resposta aceitável");
  });

  test("1.2 Validar comunicação de Leitura e Escrita no Supabase", async ({ When, Then, And }) => {
    await When("realizo uma operação de escrita e leitura na tabela \"users\" do Supabase");
    await Then("a operação deve retornar os dados corretamente");
    await And("os dados de teste devem ser limpos no final da operação");
  });

  test("2.1 Validar variáveis e comunicação com a API do Resend", async ({ When, And, Then }) => {
    await When("eu verifico a existência da variável \"RESEND_API_KEY\"");
    await And("disparo um e-mail de teste de infraestrutura para \"cristiano.acosta.m@gmail.com\"");
    await Then("a API do Resend deve retornar um status de sucesso validando o envio");
  });

  test("3.1 Validar variáveis e endpoint de descoberta do Google", async ({ When, And, Then }) => {
    await When("eu verifico a existência das variáveis \"GOOGLE_CLIENT_ID\" e \"GOOGLE_CLIENT_SECRET\"");
    await And("faço um ping no endpoint de configuração do Google OAuth");
    await Then("o Google deve retornar as configurações válidas com status 200");
  });

  test("4.1 Validar variáveis e endpoint de descoberta do LinkedIn", async ({ When, And, Then }) => {
    await When("eu verifico a existência das variáveis \"LINKEDIN_CLIENT_ID\" e \"LINKEDIN_CLIENT_SECRET\"");
    await And("faço um ping no endpoint de autorização do LinkedIn");
    await Then("o LinkedIn deve estar acessível e retornar status 200");
  });

  test("5.1 Validar variáveis e comunicação com a API do Stripe", async ({ When, And, Then }) => {
    await When("eu verifico a existência das variáveis \"NEXT_PUBLIC_STRIPE_PUBLIC_KEY\", \"STRIPE_SECRET_KEY\" e \"STRIPE_WEBHOOK_SECRET\"");
    await And("faço uma requisição para a API do Stripe para listar produtos");
    await Then("o Stripe deve retornar um status de sucesso 200");
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
  "1.1 Validar variáveis e conexão da API do Supabase": {"pickleLocation":"14:3"},
  "1.2 Validar comunicação de Leitura e Escrita no Supabase": {"pickleLocation":"19:3"},
  "2.1 Validar variáveis e comunicação com a API do Resend": {"pickleLocation":"27:3"},
  "3.1 Validar variáveis e endpoint de descoberta do Google": {"pickleLocation":"35:3"},
  "4.1 Validar variáveis e endpoint de descoberta do LinkedIn": {"pickleLocation":"43:3"},
  "5.1 Validar variáveis e comunicação com a API do Stripe": {"pickleLocation":"51:3"},
};