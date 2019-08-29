# Vamos criar uma simples API em memória!

O que iremos construir?

Um servidor HTTP de produtos. Teremos 6 rotas, são elas:

- Autenticação (`POST /auth`)
- Criação de produto (`POST /products`)
- Listagem de produtos (`GET /products`)
- Busca de um produto por id (`GET /products/:id`)
- Edição de um produto (`PATCH /products/:id`)
- Deleção de um produto (`DELETE /products/:id`)

Como assim em memória?

Quando o servidor for desligado, todos os dados serão perdidos.

Mas por que fazer assim?

Simplesmente por simplicidade. Lembre-se que tudo que salvarmos na memória, poderia simplesmente estar em um banco de dados.

Bora!

## Observações importantes

### JSON

Eu não explico no livro o que é `JSON`, recomendo pesquisar sobre, aqui está um artigo que talvez possa ajudar: [artigo Medium JSON](https://medium.com/clebertech/o-que-%C3%A9-json-daaa9311e929).

Em poucas palavras é um formato de dados semelhante ao `XML`, que está ganhando mais popularidade.

### Persistência

Uma coisa que não estou fazendo nesse tutorial é a comunicação com o banco de dados, como disse anteriormente, será tudo na memória.

Isso **não** é a forma que as pessoas fazem para persistir dados em produção! Geralmente quando se quer armazenar dados, se utiliza de algo que não irá se perder ao terminar o programa.
