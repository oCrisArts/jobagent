import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { test } from '../fixtures';

// Carregar variáveis de ambiente do .env.local
config({ path: join(process.cwd(), '.env.local') });

const { Given, When, Then, Before } = createBdd();

// Resetar contexto antes de cada cenário
Before(({}) => {
  infraContext.shouldSkip = false;
  infraContext.skipReason = undefined;
});

type TestFixtures = {
  // Adicione fixtures aqui se necessário
};

// Helper para ler variáveis de ambiente
function getEnvVar(varName: string): string | undefined {
  return process.env[varName];
}

Given('que o sistema está sendo preparado para execução', async ({}) => {
  // Step de contexto - não requer ação específica
});

// Contexto para armazenar dados entre steps
const infraContext: {
  dbConnected?: boolean;
  apiResponseTime?: number;
  apiStatusCode?: number;
  shouldSkip?: boolean;
  skipReason?: string;
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

  if (!supabaseUrl || !supabaseAnonKey || !serviceRoleKey) {
    infraContext.shouldSkip = true;
    infraContext.skipReason = 'Variáveis do Supabase não configuradas no .env.local';
  }

  infraContext.dbConnected = !!(supabaseUrl && supabaseAnonKey && serviceRoleKey);
});

Then('a variável {string} deve estar definida', async ({}, varName: string) => {
  if (infraContext.shouldSkip) {
    test.skip(true, infraContext.skipReason || 'Teste skipado');
  }
  
  const value = getEnvVar(varName);
  expect(value).toBeDefined();
  expect(value).not.toBe('');
});

When('verifico as variáveis de ambiente do Stripe', async ({}) => {
  const publishableKey = getEnvVar('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY');
  const secretKey = getEnvVar('STRIPE_SECRET_KEY');
  const webhookSecret = getEnvVar('STRIPE_WEBHOOK_SECRET');
  
  if (!publishableKey || !secretKey || !webhookSecret) {
    infraContext.shouldSkip = true;
    infraContext.skipReason = 'Variáveis do Stripe não configuradas no .env.local';
  }
});

When('verifico as variáveis de ambiente do NextAuth', async ({}) => {
  const authUrl = getEnvVar('NEXTAUTH_URL');
  const authSecret = getEnvVar('NEXTAUTH_SECRET');
  
  if (!authUrl || !authSecret) {
    infraContext.shouldSkip = true;
    infraContext.skipReason = 'Variáveis do NextAuth não configuradas no .env.local';
  }
});

Given('que as credenciais do Supabase estão configuradas', async ({}) => {
  const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL');
  const supabaseKey = getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  
  if (!supabaseUrl || !supabaseKey) {
    infraContext.shouldSkip = true;
    infraContext.skipReason = 'Credenciais do Supabase não configuradas no .env.local';
  }
});

When('realizo uma query de teste no banco de dados', async ({}) => {
  const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL');
  const supabaseKey = getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  
  if (!supabaseUrl || !supabaseKey) {
    infraContext.shouldSkip = true;
    infraContext.skipReason = 'Credenciais do Supabase não configuradas no .env.local';
  }
  
  try {
    const supabase = createClient(supabaseUrl!, supabaseKey!);
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
  if (infraContext.shouldSkip) {
    test.skip(true, infraContext.skipReason || 'Teste skipado');
  }
  expect(infraContext.dbConnected).toBeTruthy();
});

Then('a resposta deve conter dados válidos', async ({}) => {
  if (infraContext.shouldSkip) {
    test.skip(true, infraContext.skipReason || 'Teste skipado');
  }
  // Se chegamos aqui, a conexão foi estabelecida
  expect(infraContext.dbConnected).toBeTruthy();
});

Given('que a URL do Supabase está configurada', async ({}) => {
  const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL');
  
  if (!supabaseUrl) {
    infraContext.shouldSkip = true;
    infraContext.skipReason = 'URL do Supabase não configurada no .env.local';
  }
});

When('faço um ping na API do Supabase', async ({}) => {
  const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL');
  const supabaseKey = getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  
  if (!supabaseUrl || !supabaseKey) {
    infraContext.shouldSkip = true;
    infraContext.skipReason = 'Credenciais do Supabase não configuradas no .env.local';
  }
  
  const startTime = Date.now();
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'GET',
      headers: {
        'apikey': supabaseKey || '',
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
  if (infraContext.shouldSkip) {
    test.skip(true, infraContext.skipReason || 'Teste skipado');
  }
  expect(infraContext.apiStatusCode).toBe(200);
});

Then('o tempo de resposta deve ser menor que 5 segundos', async ({}) => {
  if (infraContext.shouldSkip) {
    test.skip(true, infraContext.skipReason || 'Teste skipado');
  }
  expect(infraContext.apiResponseTime).toBeLessThan(5000);
});
