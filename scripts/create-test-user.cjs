const { createClient } = require('@supabase/supabase-js');
const { v4: uuidv4 } = require('uuid');
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

async function createTestUser() {
  try {
    // Verificar se o usuário já existe
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id, email')
      .eq('email', 'teste@exemplo.com')
      .single();
    
    if (existingUser) {
      console.log('Usuário de teste já existe:', existingUser);
      process.exit(0);
    }
    
    const userId = uuidv4();
    const { data, error } = await supabaseAdmin
      .from('users')
      .insert({
        id: userId,
        email: 'teste@exemplo.com',
        name: 'Test User',
        password: 'senha123',
        plan_type: 'free',
        resumes_count: 0,
        ssi_score: 0,
        ats_score: 0,
      })
      .select()
      .single();
    
    if (error) {
      console.error('Erro ao criar usuário:', error);
      process.exit(1);
    }
    
    console.log('Usuário de teste criado com sucesso:', data);
  } catch (error) {
    console.error('Erro:', error);
    process.exit(1);
  }
}

createTestUser();
