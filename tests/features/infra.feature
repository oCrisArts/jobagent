# language: pt

Funcionalidade: Validação de Infraestrutura e Integrações (Health Check)
  Como Arquiteto de Software e DevOps
  Quero garantir que todos os serviços externos estejam configurados e comunicáveis
  Para que a aplicação funcione em todos os seus ciclos (Variáveis -> Acesso -> Leitura/Escrita)

  Contexto:
    Dado que o sistema está carregando as variáveis de ambiente

  # ==========================================
  # 1. SUPABASE (Banco de Dados e Auth)
  # ==========================================
  Cenário: 1.1 Validar variáveis e conexão da API do Supabase
    Quando eu verifico a existência das variáveis "NEXT_PUBLIC_SUPABASE_URL" e "SUPABASE_SERVICE_ROLE_KEY"
    E faço um ping na API REST do Supabase
    Então o status code do Supabase deve ser 200 e o tempo de resposta aceitável

  Cenário: 1.2 Validar comunicação de Leitura e Escrita no Supabase
    Quando realizo uma operação de escrita e leitura na tabela "users" do Supabase
    Então a operação deve retornar os dados corretamente
    E os dados de teste devem ser limpos no final da operação

  # ==========================================
  # 2. RESEND (Envio de E-mails)
  # ==========================================
  Cenário: 2.1 Validar variáveis e comunicação com a API do Resend
    Quando eu verifico a existência da variável "RESEND_API_KEY"
    E disparo um e-mail de teste de infraestrutura para "cristiano.acosta.m@gmail.com"
    Então a API do Resend deve retornar um status de sucesso validando o envio

  # ==========================================
  # 3. GOOGLE OAUTH
  # ==========================================
  Cenário: 3.1 Validar variáveis e endpoint de descoberta do Google
    Quando eu verifico a existência das variáveis "GOOGLE_CLIENT_ID" e "GOOGLE_CLIENT_SECRET"
    E faço um ping no endpoint de configuração do Google OAuth
    Então o Google deve retornar as configurações válidas com status 200

  # ==========================================
  # 4. LINKEDIN OAUTH
  # ==========================================
  Cenário: 4.1 Validar variáveis e endpoint de descoberta do LinkedIn
    Quando eu verifico a existência das variáveis "LINKEDIN_CLIENT_ID" e "LINKEDIN_CLIENT_SECRET"
    E faço um ping no endpoint de autorização do LinkedIn
    Então o LinkedIn deve estar acessível e retornar status 200

  # ==========================================
  # 5. STRIPE (Pagamentos)
  # ==========================================
  Cenário: 5.1 Validar variáveis e comunicação com a API do Stripe
    Quando eu verifico a existência das variáveis "NEXT_PUBLIC_STRIPE_PUBLIC_KEY", "STRIPE_SECRET_KEY" e "STRIPE_WEBHOOK_SECRET"
    E faço uma requisição para a API do Stripe para listar produtos
    Então o Stripe deve retornar um status de sucesso 200