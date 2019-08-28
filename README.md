# livro-desenvolvimento-web-basico

## Qual a ideia do livro?

Mostrar com termos pouco técnicos e simples:

- O que é um servidor Web HTTP
- Quais são os principais dados trafegados nesse tipo de conexão
- Como é o modelo de comunicação servidor e cliente do HTTP
- Como construir um servidor simples em Node.js que lê os dados recebidos pelo cliente
- Como construir uma API em Node.js em memória
- Como consumir essa API HTTP via Node.js
- O que é uma SDK

## Como contribuir

Esse livro foi escrito usando uma ferramenta chamada `mdbook` que transforma texto de `Markdown` para `HTML`. Link para baixá-la: https://github.com/rust-lang-nursery/mdBook/releases.

### Estrutura do projeto

```
livro-desenvolvimento-web-basico
│   README.md
│   .gitignore
│
└───api
│   └─── Código do projeto em que uma API é feita
│
└───book
│   └─── Livro em HTML
│
└───request
│   └─── Código do projeto em que requisições são feitas
│
└───servidor
│   └─── Código do projeto em que um servidor HTTP é feito
│
└───src
    └─── Livro em Markdown
```

Para contribuir no texto do livro, deve-se escrever `Markdown` dentro da pasta `src`, para então usar o `mdbook`, o qual irá converter isso em `HTML`, que é a versão final do livro.

Caso não queira ou não possa por quaisquer motivos instalar o `mdbook` em seu computador, não tem problema, você pode criar um `Pull Request` que muda apenas a pasta `src`, para que então eu aplique as mudanças usando a ferramenta, a qual irá popular a pasta `book`.

### Gerando o HTML através do `mdbook`

Depois que tiver o `mdbook` instalado na sua máquina e tiver modificado o `Markdown` na pasta `src`, pode ir no seu `Terminal` de preferência, entrar na pasta do projeto (`cd livro-desenvolvimento-web-basico`), e executar `mdbook build`.

Voila! Agora os arquivos da pasta `book` já estarão com o `HTML` modificado :wink: Só falta fazer o commit com eles!

## Observações

Esse é um livro que fiz para um amigo meu entender mais sobre o protocólo HTTP e Node.js. Esse projeto não tem fins lucrativos, apenas educacionais. Pode ser e é bem provável que eu tenha cometido vários erros de português durante o livro, se quiser corrigir, por favor se sinta a vontade para contribuir, seja criando uma `Issue` ou `Pull Request` no projeto do [Github](https://github.com/otaviopace/livro-desenvolvimento-web-basico).
