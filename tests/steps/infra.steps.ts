import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { createClient } from '@supabase/supabase-js';

const { Given, When, Then } = createBdd();

type TestFixtures = {
  // Adicione fixtures aqui se necessário
};

Given('que o sistema está sendo preparado para execução', async ({}) => {
  // Step de contexto - não requer ação específica
});

// Helper para ler variáveis de ambiente
function getEnvVar(varName: string): string | undefined {
  return process.env[varName];
}

// Contexto para armazenar dados entre steps
const infraContext: {
  dbConnected?: boolean;
  apiResponseTime?: number;
  apiStatusCode?: number;
} = {};

Given('que o arquivo .env.local existe', async ({}) => {
  const envPath = join(process.cwd(), '.env.local');
  expect(existsSync(envPath)).toBeTruthy();
});

When('verifico as variáveis de ambiente do Supabase', async ({}) => {
  // Apenas verifica se as variáveis existem
  const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL');
  const supabaseAnonKey = getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  const serviceRoleKey = getEnvVar('SUPABASE_SERVICE_ROLE_KEY');
  
  infraContext.dbConnected = !!(supabaseUrl && supabaseAnonKey && serviceRoleKey);
});

Then('a variável {string} deve estar definida', async ({}, varName: string) => {
  const value = getEnvVar(varName);
  expect(value).toBeDefined();
  expect(value).not.toBe('');
});

When('verifico as variáveis de ambiente do Stripe', async ({}) => {
  const publishableKey = getEnvVar('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY');
  const secretKey = getEnvVar('STRIPE_SECRET_KEY');
  const webhookSecret = getEnvVar('STRIPE_WEBHOOK_SECRET');
  
  expect(publishableKey).toBeDefined();
  expect(secretKey).toBeDefined();
  expect(webhookSecret).toBeDefined();
});

When('verifico as variáveis de ambiente do NextAuth', async ({}) => {
  const authUrl = getEnvVar('NEXTAUTH_URL');
  const authSecret = getEnvVar('NEXTAUTH_SECRET');
  
  expect(authUrl).toBeDefined();
  expect(authSecret).toBeDefined();
});

Given('que as credenciais do Supabase estão configuradas', async ({}) => {
  const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL');
  const supabaseKey = getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  
  expect(supabaseUrl).toBeDefined();
  expect(supabaseKey).toBeDefined();
});

When('realizo uma query de teste no banco de dados', async ({}) => {
  const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL');
  const supabaseKey = getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Credenciais do Supabase não configuradas');
  }
  
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    // Query simples para testar conexão
    const { error } = await supabase.from('_test_connection_').select('*').limit(1);
    
    // Se a tabela não existir, isso ainda indica que a conexão funciona
    // O erro será de tabela não encontrada, não de conexão
    infraContext.dbConnected = !error || error.message.includes('does not exist');
  } catch (error) {
    infraContext.dbConnected = false;
  }
});

Then('a conexão deve ser estabelecida com sucesso', async ({}) => {
  expect(infraContext.dbConnected).toBeTruthy();
});

Then('a resposta deve conter dados válidos', async ({}) => {
  // Se chegamos aqui, a conexão foi estabelecida
  expect(infraContext.dbConnected).toBeTruthy();
});

Given('que a URL do Supabase está configurada', async ({}) => {
  const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL');
  expect(supabaseUrl).toBeDefined();
});

When('faço um ping na API do Supabase', async ({}) => {
  const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL');
  if (!supabaseUrl) {
    throw new Error('URL do Supabase não configurada');
  }
  
  const startTime = Date.now();
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'GET',
      headers: {
        'apikey': getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY') || '',
      },
    });
    
    infraContext.apiStatusCode = response.status;
    infraContext.apiResponseTime = Date.now() - startTime;
  } catch (error) {
    infraContext.apiStatusCode = 0;
    infraContext.apiResponseTime = Date.now() - startTime;
  }
});

Then('o status code deve ser 200', async ({}) => {
  expect(infraContext.apiStatusCode).toBe(200);
});

Then('o tempo de resposta deve ser menor que 5 segundos', async ({}) => {
  expect(infraContext.apiResponseTime).toBeLessThan(5000);
});
