# Vamos criar uma simples API em memória!

O que iremos construir?

Um servidor HTTP de produtos. Teremos 3 rotas iniciais, são elas:

- Autenticação (`POST /auth`)
- Criação de produto (`POST /products`)
- Listagem de produtos (`GET /products`)

Como assim em memória?

Quando o servidor for desligado, todos os dados serão perdidos.

Mas por que fazer assim?

Simplesmente por simplicidade. Lembre-se que tudo que salvarmos na memória, poderia simplesmente estar em um banco de dados.

Bora!
