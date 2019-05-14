# Buscar somente um produto

Esse capítulo toma como base o código do capítulo de listagem de produtos.

## Fluxo da informação

<p align="center">
  <img src="https://user-images.githubusercontent.com/15306309/56464695-74280e00-63c5-11e9-9745-b0d643233f01.png" alt="sequence-diagram-information-flow" width="500" />
</p>

### Caso de sucesso
> Requisição

`URL`: `/products/cjuq20sms0001j35j9mbf246v`

`método`: `GET`

`headers`:
- `Authorization`: `Bearer j19fn19fhq9f0jr0adsyf08aefhf0`

> Resposta

`status code`: `200`

`body`:
```json
{
  "id": "cjuq20sms0001j35j9mbf246v",
  "name": "boneco do pikachu",
  "price": 5.34
}
```

### Caso de erro, produto não encontrado
> Requisição

`URL`: `/products/id_nao_existente`

`método`: `GET`

`headers`:
- `Authorization`: `Bearer j19fn19fhq9f0jr0adsyf08aefhf0`

> Resposta

`status code`: `404`

`body`:
```json
{
  "message": "No product exists with this id"
}
```

### Caso de erro de autenticação
> Requisição

`URL`: `/products/cjuq20sms0001j35j9mbf246v`

`método`: `GET`

`headers`:
- `Authorization`: `Bearer TOKEN_INEXISTENTE`

`body`:
```json
{
  "name": "bolinha de ping pong"
}
```

> Resposta

`status code`: `401`

`body`:
```json
{
  "message": "Unauthorized"
}
```

## Implementação

```javascript
// imports...

// setup...

const tokens = []

app.post('/auth', function (req, res) {
// ...
})

const products = []

function authorizationMiddleware (req, res, next) {
// ...
}

app.post('/products', authorizationMiddleware, function (req, res) {
// ...
})

app.get('/products/:id', authorizationMiddleware, function (req, res) {
  const productFound = products.find(function (product) {
    return req.params.id == product.id
  })

  if (!productFound) {
    return res.status(404).send({
      message: 'No product exists with this id'
    })
  }

  res.status(200).send(productFound)
})

// app.listen...
```

Observe que só de colocar o `:id` no final da URL, o próprio `express` já coloca uma variável dentro do objeto `req.params` com o valor enviado.

<p align="center">
  <img src="https://user-images.githubusercontent.com/15306309/56464716-fa445480-63c5-11e9-91ec-66e41a994e27.png" alt="sample-request-show-one" />
</p>

<p align="center">
  <a href="https://github.com/otaviopace/livro-desenvolvimento-web-basico/blob/master/api/buscar_um_produto.js">Link para a versão final do código</a>
</p>
