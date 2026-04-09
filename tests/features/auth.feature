# language: pt

Funcionalidade: Autenticação OAuth (Google/LinkedIn)
  Como Visitante
  Quero fazer login via OAuth (Google/LinkedIn)
  Para aceder às funcionalidades da aplicação com persistência correta no schema users

  Contexto:
    Dado que o sistema está sendo preparado para execução

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

  

  Cenário: Erro no callback OAuth exibe alerta
    Dado que sou um visitante na raiz "/"
    Quando a URL contém o parâmetro "?error=OAuthCallback"
    Então a UI deve exibir o alerta "#toast-auth-error"

  Cenário: Cancelamento pelo utilizador exibe alerta
    Dado que sou um visitante na raiz "/"
    Quando a URL contém o parâmetro "?error=AccessDenied"
    Então o alerta "#toast-auth-error" é exibido informando o cancelamento
