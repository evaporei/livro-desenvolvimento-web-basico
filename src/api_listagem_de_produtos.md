# Listagem de produtos

Novamente, esse capítulo toma como base o código do capítulo de criação de produto.

## Fluxo da informação

<p align="center">
  <img src="https://user-images.githubusercontent.com/15306309/56462917-8c863180-63a1-11e9-8c42-cf6e008c2a0d.png" alt="sequence-diagram-information-flow" width="500" />
</p>

### Caso de sucesso
> Requisição

`URL`: `/products`

`método`: `GET`

`headers`:
- `Authorization`: `Bearer j19fn19fhq9f0jr0adsyf08aefhf0`

> Resposta

`status code`: `200`

`body`:
```json
[
    {
        "id": "cjuq20sms0001j35j9mbf246v",
        "name": "boneco do pikachu",
        "price": 5.34
    },
    {
        "id": "cjuq21svd0002j35j8bdqh72w",
        "name": "garrafa dos simpsons",
        "price": 5.34
    }
]
```

### Caso de sucesso com filtro
> Requisição

`URL`: `/products?name=boneco`

`método`: `GET`

`headers`:
- `Authorization`: `Bearer j19fn19fhq9f0jr0adsyf08aefhf0`

> Resposta

`status code`: `200`

`body`:
```json
[
    {
        "id": "cjuq20sms0001j35j9mbf246v",
        "name": "boneco do pikachu",
        "price": 5.34
    }
]
```

### Caso de erro de autenticação
> Requisição

`URL`: `/products`

`método`: `GET`

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

No caso a única coisa que precisamos fazer é enviar a lista de produtos que já temos na variável `products`.

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
  res.status(200).send(products)
})

// app.listen...
```

É isso, simples assim!

Lembrando que ao fazer a requisição, pode ser que não venha nenhum produto, por nada ter sido cadastrado.

<p align="center">
  <img src="https://user-images.githubusercontent.com/15306309/56462916-8c863180-63a1-11e9-8996-1d4dfef668ed.png" alt="request-empty-products-list" />
</p>

### Adicionando filtros

Agora complica um pouco, pois queremos receber via `query string` filtros, então ao invés de entregar todos os produtos sempre, veremos se o cliente enviou algum filtro, e dependendo iremos entregar listas filtradas.

Código:

```javascript
// ...

app.get('/products', authorizationMiddleware, function (req, res) {
  const filters = []

  if (req.query.name != null) { filters.push('name') }
  if (req.query.price != null) { filters.push('price') }

  let filteredProducts

  if (filters.length == 0) {
    filteredProducts = products
  } else {
    filteredProducts = products.filter(function (product) {
      const validations = []

      if (filters.includes('name')) {
        validations.push(product.name.includes(req.query.name))
      }

      if (filters.includes('price')) {
        validations.push(product.price == req.query.price)
      }

      return validations.some(function (validation) {
        return validation == true
      })
    })
  }

  res.status(200).send(filteredProducts)
})

// ...
```

Pronto! Quem consumir a API pode enviar filtros :)
