# Quais são os dados trafegados no protocólo HTTP?

## URL

Exemplo: `www.google.com/images?size=500&free_use=false`.
- Nessa URL temos o domínio: `www.google.com`.
- A rota: `/images`.
- Dados `query string` (depois da interrogação): `size` valendo `500` e `free_use` valendo `false`.

## Status code

É um número de três dígitos que representa o que aconteceu com a requisição HTTP, veja lista [aqui](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status). Os mais comuns são:
- `2xx`: deu tudo certo
- `3xx`: redirecionamento
- `4xx`: respostas de erro (algum campo faltando por exemplo)
- `5xx`: servidor deu problema (pode estar fora do ar, ou "explodiu" no meio da requisição)

## Body

O corpo da requisição. É basicamente o dado principal da requisição e resposta HTTP. Ele pode possuir diferentes formatos. Vamos supor que quero fazer login em uma página, o servidor precisa saber qual o meu `e-mail` e qual a minha `senha`. Geralmente esse tipo de dado é enviado pelo corpo, e na resposta nesse caso iremos receber um `status code` informando se os dados estão corretos (`200`, deu certo, e `400` deu errado). Exemplo utilizando o formato `JSON`:
> Requisição

`body`:
```json
{
  "email": "email.bacana@provedor.com",
  "senha": "1234"
}
```

> Resposta

`status code`: `200` (ou seja, deu certo)

`body`:
```json
{
  "login_token": "j19fn19fhq9f0jr0adsyf08aefhf0"
}
```


## Headers

São um conjunto de chaves e valores que podem ser enviados pelo cliente na requisição, e que também são respondidos pelo servidor. Neles costumam ser enviados dados como token de autenticação, qual o cliente fazendo a requisição (um browser/navegador, uma biblioteca, etc), tipo de conteúdo/formato (`JSON`, `form-data`, etc). Exemplo:
> Requisição

`headers`:

| Chave | Valor |
| :---: | :---: |
| Content-Type | application/json |
| User-Agent | Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36 |

> Resposta

`headers`:

| Chave | Valor |
| :---: | :---: |
| X-Powered-By | Express |
| Date | Sun, 14 Apr 2019 17:30:07 GMT |

## Método

Indica o que será feito na requisição. Os principais são:

- `GET`: cliente busca dados (listagem de dados, ou algo específico)
- `POST`: cliente quer criar algo (criar uma sessão, um item, um produto, etc)
- `PUT`: cliente quer alterar algo (um produto, item, etc)
- `DELETE`: cliente quer deletar algo (um produto, item, etc)

### Observações

Todos os dados trafegados no HTTP seguem convenções, porém nada impede de quem implementa o servidor, de entregar algo diferente do esperado em uma requisição. Por exemplo, um cliente pode criar um produto enviando os dados no `corpo` da requisição, o servidor retornar o `status code` 200, e mesmo assim nenhum produto ter de fato sido criado.
