# Deleção de produto

Esse capítulo toma como base o código do capítulo de edição de produto.

## Fluxo da informação

<p align="center">
  <img src="https://user-images.githubusercontent.com/15306309/56464883-e3533180-63c8-11e9-8f3c-8372c1e9a32c.png" alt="sequence-diagram-information-flow" width="500" />
</p>

### Caso de sucesso
> Requisição

`URL`: `/products/cjuq20sms0001j35j9mbf246v`

`método`: `DELETE`

`headers`:
- `Authorization`: `Bearer j19fn19fhq9f0jr0adsyf08aefhf0`

> Resposta

`status code`: `200`

`body`:
```json
{
  "id": "cjuq20sms0001j35j9mbf246v",
  "name": "bolinha de ping pong",
  "price": 5.34
}
```

### Caso de erro, produto não encontrado
> Requisição

`URL`: `/products/id_nao_existente`

`método`: `DELETE`

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

`método`: `DELETE`

`headers`:
- `Authorization`: `Bearer TOKEN_INEXISTENTE`

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

app.get('/products', authorizationMiddleware, function (req, res) {
// ...
})

app.get('/products/:id', authorizationMiddleware, function (req, res) {
// ...
})

app.patch('/products/:id', authorizationMiddleware, function (req, res) {
// ...
})

app.delete('/products/:id', authorizationMiddleware, function (req, res) {
  const productFound = products.find(function (product) {
    return req.params.id == product.id
  })

  if (!productFound) {
    res.status(404).send({
      message: 'No product exists with this id'
    })
    return
  }

  const itemToBeDeletedIndex = products.indexOf(productFound)

  products.splice(itemToBeDeletedIndex, 1)

  res.status(200).send(productFound)
})

// app.listen...
```

Assim como no último capítulo, o `:id` acaba por virar uma variável graças ao `express`.

<p align="center">
  <img src="https://user-images.githubusercontent.com/15306309/56464870-b141cf80-63c8-11e9-9f94-feb1ce355d9c.png" alt="sample-request-delete" />
</p>

Parabéns!!!! Você fez seu primeiro CRUD (Create, Read, Update, Delete) com Node.js!!!!!!

<p align="center">
  <a href="https://github.com/otaviopace/livro-desenvolvimento-web-basico/blob/master/api/delecao_produto.js">Link para a versão final do código</a>
</p>
