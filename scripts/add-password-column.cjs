const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Variáveis de ambiente SUPABASE não configuradas');
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function addPasswordColumn() {
  try {
    // Executar SQL usando o endpoint de SQL do Supabase
    const response = await fetch(`${supabaseUrl}/rest/v1/sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': serviceRoleKey,
        'Authorization': `Bearer ${serviceRoleKey}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({
        query: 'ALTER TABLE public.users ADD COLUMN IF NOT EXISTS password text;'
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Erro ao adicionar coluna password:', error);
      console.log('\n⚠️  Execute manualmente no Supabase SQL Editor:');
      console.log('ALTER TABLE public.users ADD COLUMN IF NOT EXISTS password text;');
      process.exit(1);
    }

    console.log('Coluna password adicionada com sucesso');
  } catch (error) {
    console.error('Erro:', error);
    console.log('\n⚠️  Execute manualmente no Supabase SQL Editor:');
    console.log('ALTER TABLE public.users ADD COLUMN IF NOT EXISTS password text;');
    process.exit(1);
  }
}

addPasswordColumn();
