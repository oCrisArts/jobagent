# language: pt

Funcionalidade: Autenticação (OAuth, Credenciais e Recuperação de Senha)
  Como Visitante
  Quero fazer login via OAuth (Google/LinkedIn) ou Credenciais (Email/Senha)
  Para aceder às funcionalidades da aplicação com persistência correta no schema users

  Contexto:
    Dado que o sistema está sendo preparado para execução

  # ─────────────────────────────────────────────────────────
  # OAuth (Google e LinkedIn)
  # ─────────────────────────────────────────────────────────

  Cenário: Cadastro/Login via Google com validação de persistência
    Dado que sou um visitante na raiz "/"
    Quando o OAuth retorna com sucesso simulado para Google
    Então a sessão contém os valores default do schema users
    E plan_type é "free"
    E ats_score é 0
    E ssi_score é 0
    E resumes_count é 0

  Cenário: Cadastro/Login via LinkedIn com validação de persistência
    Dado que sou um visitante na raiz "/"
    Quando o OAuth retorna com sucesso simulado para LinkedIn
    Então a sessão contém os valores default do schema users
    E plan_type é "free"
    E ats_score é 0
    E ssi_score é 0
    E resumes_count é 0

  Cenário: Erro no callback OAuth exibe alerta
    Dado que sou um visitante na raiz "/"
    Quando a URL contém o parâmetro "?error=OAuthCallback"
    Então a UI deve exibir o alerta "#toast-auth-error"

  Cenário: Cancelamento pelo utilizador exibe alerta
    Dado que sou um visitante na raiz "/"
    Quando a URL contém o parâmetro "?error=AccessDenied"
    Então o alerta "#toast-auth-error" é exibido informando o cancelamento

  # Cenário: Interação UI - Toggle Password Visibility
  #   Dado que sou um visitante na raiz "/"
  #   E o modal de autenticação está aberto
  #   Quando clico no botão "#toggle-password-visibility"
  #   Então o input "#input-password" deve ter type "text"
  #   Quando clico novamente no botão "#toggle-password-visibility"
  #   Então o input "#input-password" deve ter type "password"

  # ─────────────────────────────────────────────────────────
  # Credenciais (Email/Senha)
  # ─────────────────────────────────────────────────────────

  Cenário: Login com credenciais existentes redireciona para /inicio
    Dado que sou um visitante na raiz "/"
    E o modal de autenticação está aberto
    Quando preencho o campo "#input-email" com "teste@exemplo.com"
    E preencho o campo "#input-password" com "senha123"
    E submeto o formulário de login
    Então sou redirecionado para "/inicio"

  Cenário: Senha incorreta exibe mensagem de erro
    Dado que sou um visitante na raiz "/"
    E o modal de autenticação está aberto
    Quando preencho o campo "#input-email" com "teste@exemplo.com"
    E preencho o campo "#input-password" com "senha_errada"
    E submeto o formulário de login
    Então o elemento "#password-error" deve estar visível

  # ─────────────────────────────────────────────────────────
  # Navegação e Termos
  # ─────────────────────────────────────────────────────────

  Cenário: Navegação para página de Termos
    Dado que sou um visitante na raiz "/"
    E o modal de autenticação está aberto
    Quando clico no link para termos
    Então sou redirecionado para "/terms"

  # ─────────────────────────────────────────────────────────
  # Recuperação de Senha
  # ─────────────────────────────────────────────────────────

  Cenário: Navegação Fluida - Recuperação de Senha
    Dado que sou um visitante na raiz "/"
    E o modal de autenticação está aberto
    Quando clico no botão "#link-forgot-password"
    Então o botão "#btn-send-recovery" deve estar visível
    Quando clico no botão "#btn-back-to-login"
    Então o formulário de login deve estar visível

Cenário: Enviar solicitação de recuperação de senha com email existente
    Dado que estou na visão de recuperação de senha
    Quando preencho o e-mail com "teste@exemplo.com"
    E clico no botão "#btn-send-recovery"
    Então o elemento "#email-success" deve estar visível

Cenário: Enviar solicitação de recuperação com email não existente exibe erro
    Dado que estou na visão de recuperação de senha
    Quando preencho o e-mail com "naoexiste@exemplo.com"
    E clico no botão "#btn-send-recovery"
    Então o elemento "#email-error" deve estar visível