# Edição de produto

Esse capítulo toma como base o código do capítulo de busca de um produto.

## Fluxo da informação

<p align="center">
  <img src="https://user-images.githubusercontent.com/15306309/56464573-198db280-63c3-11e9-82aa-5e80e779f4eb.png" alt="sequence-diagram-information-flow" width="500" />
</p>

### Caso de sucesso
> Requisição

`URL`: `/products/cjuq20sms0001j35j9mbf246v`

`método`: `PATCH`

`headers`:
- `Authorization`: `Bearer j19fn19fhq9f0jr0adsyf08aefhf0`

`body`:
```json
{
  "name": "bolinha de ping pong"
}
```

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

`método`: `PATCH`

`headers`:
- `Authorization`: `Bearer j19fn19fhq9f0jr0adsyf08aefhf0`

`body`:
```json
{
  "name": "bolinha de ping pong"
}
```

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

`método`: `PATCH`

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

app.get('/products', authorizationMiddleware, function (req, res) {
// ...
})

app.get('/products/:id', authorizationMiddleware, function (req, res) {
// ...
})

app.patch('/products/:id', authorizationMiddleware, function (req, res) {
  const productFound = products.find(function (product) {
    return req.params.id == product.id
  })

  if (!productFound) {
    res.status(404).send({
      message: 'No product exists with this id'
    })
    return
  }

  if (req.body.name != null) {
    productFound.name = req.body.name
  }

  if (req.body.price != null) {
    productFound.price = req.body.price
  }

  res.status(200).send(productFound)
})

// app.listen...
```

Assim como no último capítulo, o `:id` acaba por virar uma variável graças ao `express`.

<p align="center">
  <img src="https://user-images.githubusercontent.com/15306309/56464574-198db280-63c3-11e9-9dbc-98a1e21c7a37.png" alt="sample-request-edit" />
</p>
