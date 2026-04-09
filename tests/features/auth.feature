# language: pt

Funcionalidade: Autenticação OAuth (Google/LinkedIn)
  Como Visitante
  Quero fazer login via OAuth (Google/LinkedIn)
  Para aceder às funcionalidades da aplicação

  Contexto:
    Dado que o sistema está sendo preparado para execução

  Cenário: OAuth com sucesso redireciona para dashboard
    Dado que sou um visitante na raiz "/"
    Quando o OAuth retorna com sucesso
    Então sou redirecionado para "/inicio"
    # TODO: Implementar login real para verificar avatar
    # E o elemento "#user-avatar" fica visível

  Cenário: Erro no callback OAuth exibe alerta
    Dado que ocorreu um erro no backend
    Quando a URL contém o parâmetro "?error=OAuthCallback"
    Então a UI deve exibir o alerta "#toast-auth-error"

  Cenário: Cancelamento pelo utilizador exibe alerta
    Dado que o utilizador cancelou o OAuth
    Quando a URL contém o parâmetro "?error=AccessDenied"
    Então o alerta "#toast-auth-error" é exibido informando o cancelamento
