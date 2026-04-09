# language: pt

Funcionalidade: Validação de Infraestrutura
  Como DevOps
  Quero garantir que todas as variáveis de ambiente e conexões estejam configuradas
  Para que a aplicação possa funcionar corretamente

  Contexto:
    Dado que o sistema está sendo preparado para execução

  Cenário: Validar variáveis de ambiente obrigatórias do Supabase
    Dado que o arquivo .env.local existe
    Quando verifico as variáveis de ambiente do Supabase
    Então a variável "NEXT_PUBLIC_SUPABASE_URL" deve estar definida
    E a variável "NEXT_PUBLIC_SUPABASE_ANON_KEY" deve estar definida
    E a variável "SUPABASE_SERVICE_ROLE_KEY" deve estar definida

  Cenário: Validar variáveis de ambiente obrigatórias do Stripe
    Dado que o arquivo .env.local existe
    Quando verifico as variáveis de ambiente do Stripe
    Então a variável "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY" deve estar definida
    E a variável "STRIPE_SECRET_KEY" deve estar definida
    E a variável "STRIPE_WEBHOOK_SECRET" deve estar definida

  Cenário: Validar variáveis de ambiente obrigatórias do NextAuth
    Dado que o arquivo .env.local existe
    Quando verifico as variáveis de ambiente do NextAuth
    Então a variável "NEXTAUTH_URL" deve estar definida
    E a variável "NEXTAUTH_SECRET" deve estar definida

  Cenário: Validar conexão com banco de dados Supabase
    Dado que as credenciais do Supabase estão configuradas
    Quando realizo uma query de teste no banco de dados
    Então a conexão deve ser estabelecida com sucesso
    E a resposta deve conter dados válidos

  Cenário: Validar disponibilidade da API do Supabase
    Dado que a URL do Supabase está configurada
    Quando faço um ping na API do Supabase
    Então o status code deve ser 200
    E o tempo de resposta deve ser menor que 5 segundos
