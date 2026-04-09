# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\features\infra.feature.spec.js >> Validação de Infraestrutura >> Validar variáveis de ambiente obrigatórias do Stripe
- Location: .features-gen\tests\features\infra.feature.spec.js:18:3

# Error details

```
Error: expect(received).toBeDefined()

Received: undefined
```

# Test source

```ts
  1   | import { createBdd } from 'playwright-bdd';
  2   | import { expect } from '@playwright/test';
  3   | import { readFileSync, existsSync } from 'fs';
  4   | import { join } from 'path';
  5   | import { createClient } from '@supabase/supabase-js';
  6   | 
  7   | const { Given, When, Then } = createBdd();
  8   | 
  9   | type TestFixtures = {
  10  |   // Adicione fixtures aqui se necessário
  11  | };
  12  | 
  13  | Given('que o sistema está sendo preparado para execução', async ({}) => {
  14  |   // Step de contexto - não requer ação específica
  15  | });
  16  | 
  17  | // Helper para ler variáveis de ambiente
  18  | function getEnvVar(varName: string): string | undefined {
  19  |   return process.env[varName];
  20  | }
  21  | 
  22  | // Contexto para armazenar dados entre steps
  23  | const infraContext: {
  24  |   dbConnected?: boolean;
  25  |   apiResponseTime?: number;
  26  |   apiStatusCode?: number;
  27  | } = {};
  28  | 
  29  | Given('que o arquivo .env.local existe', async ({}) => {
  30  |   const envPath = join(process.cwd(), '.env.local');
  31  |   expect(existsSync(envPath)).toBeTruthy();
  32  | });
  33  | 
  34  | When('verifico as variáveis de ambiente do Supabase', async ({}) => {
  35  |   // Apenas verifica se as variáveis existem
  36  |   const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL');
  37  |   const supabaseAnonKey = getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  38  |   const serviceRoleKey = getEnvVar('SUPABASE_SERVICE_ROLE_KEY');
  39  |   
  40  |   infraContext.dbConnected = !!(supabaseUrl && supabaseAnonKey && serviceRoleKey);
  41  | });
  42  | 
  43  | Then('a variável {string} deve estar definida', async ({}, varName: string) => {
  44  |   const value = getEnvVar(varName);
  45  |   expect(value).toBeDefined();
  46  |   expect(value).not.toBe('');
  47  | });
  48  | 
  49  | When('verifico as variáveis de ambiente do Stripe', async ({}) => {
  50  |   const publishableKey = getEnvVar('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY');
  51  |   const secretKey = getEnvVar('STRIPE_SECRET_KEY');
  52  |   const webhookSecret = getEnvVar('STRIPE_WEBHOOK_SECRET');
  53  |   
> 54  |   expect(publishableKey).toBeDefined();
      |                          ^ Error: expect(received).toBeDefined()
  55  |   expect(secretKey).toBeDefined();
  56  |   expect(webhookSecret).toBeDefined();
  57  | });
  58  | 
  59  | When('verifico as variáveis de ambiente do NextAuth', async ({}) => {
  60  |   const authUrl = getEnvVar('NEXTAUTH_URL');
  61  |   const authSecret = getEnvVar('NEXTAUTH_SECRET');
  62  |   
  63  |   expect(authUrl).toBeDefined();
  64  |   expect(authSecret).toBeDefined();
  65  | });
  66  | 
  67  | Given('que as credenciais do Supabase estão configuradas', async ({}) => {
  68  |   const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL');
  69  |   const supabaseKey = getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  70  |   
  71  |   expect(supabaseUrl).toBeDefined();
  72  |   expect(supabaseKey).toBeDefined();
  73  | });
  74  | 
  75  | When('realizo uma query de teste no banco de dados', async ({}) => {
  76  |   const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL');
  77  |   const supabaseKey = getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  78  |   
  79  |   if (!supabaseUrl || !supabaseKey) {
  80  |     throw new Error('Credenciais do Supabase não configuradas');
  81  |   }
  82  |   
  83  |   try {
  84  |     const supabase = createClient(supabaseUrl, supabaseKey);
  85  |     // Query simples para testar conexão
  86  |     const { error } = await supabase.from('_test_connection_').select('*').limit(1);
  87  |     
  88  |     // Se a tabela não existir, isso ainda indica que a conexão funciona
  89  |     // O erro será de tabela não encontrada, não de conexão
  90  |     infraContext.dbConnected = !error || error.message.includes('does not exist');
  91  |   } catch (error) {
  92  |     infraContext.dbConnected = false;
  93  |   }
  94  | });
  95  | 
  96  | Then('a conexão deve ser estabelecida com sucesso', async ({}) => {
  97  |   expect(infraContext.dbConnected).toBeTruthy();
  98  | });
  99  | 
  100 | Then('a resposta deve conter dados válidos', async ({}) => {
  101 |   // Se chegamos aqui, a conexão foi estabelecida
  102 |   expect(infraContext.dbConnected).toBeTruthy();
  103 | });
  104 | 
  105 | Given('que a URL do Supabase está configurada', async ({}) => {
  106 |   const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL');
  107 |   expect(supabaseUrl).toBeDefined();
  108 | });
  109 | 
  110 | When('faço um ping na API do Supabase', async ({}) => {
  111 |   const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL');
  112 |   if (!supabaseUrl) {
  113 |     throw new Error('URL do Supabase não configurada');
  114 |   }
  115 |   
  116 |   const startTime = Date.now();
  117 |   try {
  118 |     const response = await fetch(`${supabaseUrl}/rest/v1/`, {
  119 |       method: 'GET',
  120 |       headers: {
  121 |         'apikey': getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY') || '',
  122 |       },
  123 |     });
  124 |     
  125 |     infraContext.apiStatusCode = response.status;
  126 |     infraContext.apiResponseTime = Date.now() - startTime;
  127 |   } catch (error) {
  128 |     infraContext.apiStatusCode = 0;
  129 |     infraContext.apiResponseTime = Date.now() - startTime;
  130 |   }
  131 | });
  132 | 
  133 | Then('o status code deve ser 200', async ({}) => {
  134 |   expect(infraContext.apiStatusCode).toBe(200);
  135 | });
  136 | 
  137 | Then('o tempo de resposta deve ser menor que 5 segundos', async ({}) => {
  138 |   expect(infraContext.apiResponseTime).toBeLessThan(5000);
  139 | });
  140 | 
```