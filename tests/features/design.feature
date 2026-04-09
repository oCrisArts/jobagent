# language: pt

Funcionalidade: Validação de Design Tokens
  Como Desenvolvedor
  Quero garantir que os tokens de design estejam compilados corretamente
  Para que a aplicação mantenha consistência visual com o Figma

  Contexto:
    Dado que o sistema está sendo preparado para execução

  Cenário: Validar existência do arquivo de tokens
    Dado que o projeto está configurado
    Quando verifico o arquivo de tokens de design
    Então o arquivo "styles/_tokens.scss" deve existir

  Cenário: Validar conteúdo dos tokens de cor
    Dado que o arquivo de tokens existe
    Quando leio o conteúdo dos tokens
    Então deve conter a variável "$color-brand-600"
    E deve conter a variável "$color-surface-base"
    E deve conter a variável "$color-text-primary"

  Cenário: Validar conteúdo dos tokens de espaçamento
    Dado que o arquivo de tokens existe
    Quando leio o conteúdo dos tokens
    Então deve conter a variável "$space-space-4"
    E deve conter a variável "$space-space-8"
    E deve conter a variável "$space-space-16"

  Cenário: Validar conteúdo dos tokens de tipografia
    Dado que o arquivo de tokens existe
    Quando leio o conteúdo dos tokens
    Então deve conter a variável "$typography-font-size-base"
    E deve conter a variável "$typography-font-family-sans"
