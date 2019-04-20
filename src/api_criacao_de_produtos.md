# Criação de produtos

Esse capítulo terá como base o código feito no capítulo de autenticação.

## Fluxo da informação

<p align="center">
  <img src="https://user-images.githubusercontent.com/15306309/56461196-12e04a80-6385-11e9-8cd3-475e9f948b4c.png" alt="sequence-diagram-information-flow" width="500" />
</p>

### Caso de sucesso
> Requisição

`URL`: `/products`

`método`: `POST`

`headers`:
- `Authorization`: `Bearer j19fn19fhq9f0jr0adsyf08aefhf0`

`body`:
```json
{
  "name": "colher de cozinha",
  "price": 5.34
}
```

> Resposta

`status code`: `201`

`body`:
```json
{
  "id": "cjuppslcp0000t05j1tpf2jxv",
  "name": "colher de cozinha",
  "price": 5.34
}
```

### Caso de erro de autenticação
> Requisição

`URL`: `/products`

`método`: `POST`

`headers`:
- `Authorization`: `Bearer TOKEN_INEXISTENTE`

`body`:
```json
{
  "name": "colher de cozinha",
  "price": 5.34
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

### Caso de erro de produto já cadastrado
> Requisição

`URL`: `/products`

`método`: `POST`

`headers`:
- `Authorization`: `Bearer j19fn19fhq9f0jr0adsyf08aefhf0`

`body`:
```json
{
  "name": "colher de cozinha",
  "price": 5.34
}
```

> Resposta

`status code`: `400`

`body`:
```json
{
  "message": "This product name already exists"
}
```

### Caso de erro de nome ou preço faltando
> Requisição

`URL`: `/products`

`método`: `POST`

`headers`:
- `Authorization`: `Bearer j19fn19fhq9f0jr0adsyf08aefhf0`

`body`:
```json
{
  "price": 5.34
}
```

> Resposta

`status code`: `400`

`body`:
```json
{
  "message": "The product name is missing"
}
```

## Implementação

### Lógica principal

Primeiro iremos implementar a lógica principal, depois iremos cuidar da autenticação.

```javascript
// imports/setup...

// app.post('/auth', function (req, res) {
// ...
// })

const products = []

app.post('/products', function (req, res) {
  const newProduct = {
    id: cuid(),
    name: req.body.name,
    price: req.body.price
  }

  products.push(newProduct)

  res.status(201).send(newProduct)
})

// app.listen ...
```

No caso nosso produto tem apenas nome (`name`) e preço (`price`). O campo `id`, é único e é gerado no backend, o usuário não o informa.

No retorno simplesmente retornamos o produto criado caso tenha dado certo.

<p align="center">
  <img src="https://user-images.githubusercontent.com/15306309/56461180-ddd3f800-6384-11e9-844f-dcd915af4b1e.png" alt="postman-creation-request" />
</p>

Porém esse código não cobre o caso do nome e/ou preço estarem faltando. Segue abaixo como fazer a **validação** do nome, do preço, e se o produto já existe.

```javascript
// ...

const products = []

app.post('/products', function (req, res) {
  if (req.body.name == null) {
    res.status(400).send({
      message: 'The product name is missing'
    })
    return
  }

  if (req.body.price == null) {
    res.status(400).send({
      message: 'The product price is missing'
    })
    return
  }

  const productAlreadyExists = products.find(function (product) {
    return product.name == req.body.name
  })

  if (productAlreadyExists) {
    res.status(400).send({
      message: 'This product name already exists' 
    })
    return
  }

  const newProduct = {
    id: cuid(),
    name: req.body.name,
    price: req.body.price
  }

  products.push(newProduct)

  res.status(201).send(newProduct)
})

// ...
```

Yesss!! Conseguimos fazer nossa primeira rota de criação de algum recurso!!!!

Ainda tem a autenticação, lembre-se que o código acima **não valida** várias coisas, como o **tipo dos campos**, se eles estão **vazios**, se o preço é **negativo**, etc. Isso é somente um exemplo de como validar coisas mais básicas.

### Autenticação

Algo está faltando, precisamos bloquear quem não pode fazer a requisição! Não queremos que pessoas sem acessos consigam realizar ações em nossa API.

A biblioteca `express` permite que sejam passadas diversas funções para tratar uma rota, assim podemos validar se o cliente está autenticado, e caso esteja, a função que criamos que de fato cria o usuário, será chamada.

Exemplo, considere uma rota `/rota_legal` que pode receber requisições `POST`:

```javascript
function parte1 (req, res, next) {
  if (algo_faltando) {
    res.status(401).send({ message: "Algo está faltando!!!" })
    return
  }

  // chama parte2
  next()
}

function parte2 (req, res) {
  // lógica principal da rota
}

app.post('/rota_legal', parte1, parte2)
```

Nesse caso, a função `parte2` só será chamada caso a função `parte1` chame a função `next`. Se não, a requisição irá parar por alí.

Bora criar a autenticação no nosso app! Conforme o que foi colocado nos exemplos do começo do capítulo, iremos aceitar um `header` chamado `Authorization`. Ele terá duas partes, uma é o prefixo `Bearer`, isso é só uma palavra comum que costumam utilizar para esse tipo de coisa, e a segunda parte é o token em sí, gerado pela rota `/auth` do último capítulo.

O código fica assim:

```javascript
// ...

function authorizationMiddleware (req, res, next) {
  const authorizationHeader = req.get('authorization')

  if (!authorizationHeader) {
    res.status(401).send({ message: 'Authorization header missing' })
    return
  }

  const authorizationHeaderParts = authorizationHeader.split(' ')

  const bearer = authorizationHeaderParts[0]
  const token = authorizationHeaderParts[1]

  if (bearer != 'Bearer') {
    res.status(401).send({ message: 'Authorization header needs the Bearer prefix' })
    return
  }

  const isValidToken = tokens.find(function (validToken) {
    return validToken == token
  })

  if (!isValidToken) {
    res.status(401).send({ message: 'Authorization header is not valid' })
    return
  }

  next()
}

app.post('/products', authorizationMiddleware, function (req, res) {
// lógica principal já implementada...
})

// ...
```

E a requisição de sucesso fica assim:

<p align="center">
  <img src="https://user-images.githubusercontent.com/15306309/56461583-a87ed880-638b-11e9-9710-bc9c06fa2d49.png" alt="postman-auth-request" />
</p>

No caso para dar certo, vai precisar gerar um `token` na rota `/auth` com as credenciais corretas.

Uhulll ta tudo feito da criação de produtos!!!! :)
