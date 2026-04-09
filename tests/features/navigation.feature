# language: pt

Funcionalidade: Navegação do Usuário
  Como Visitante ou Usuário Logado
  Quero navegar pela aplicação de forma intuitiva
  Para que possa acessar as funcionalidades disponíveis

  Contexto:
    Dado que o sistema está sendo preparado para execução

  Cenário: Visitante clica no botão de login na página inicial
    Dado que sou um visitante na raiz "/"
    Quando clico no elemento "#nav-login-btn"
    Então o elemento "#auth-modal" deve estar visível

  Cenário: Visitante deslogado é bloqueado ao acessar área restrita
    Dado que sou um visitante deslogado
    Quando acesso o caminho "/inicio"
    Então sou redirecionado para a página inicial
    E não consigo acessar a área restrita
