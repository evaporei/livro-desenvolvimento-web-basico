# Autenticação

Antes de implementar a autenticação, observe abaixo o fluxo da informação:

## Fluxo da informação

<p align="center">
  <img src="https://user-images.githubusercontent.com/15306309/56459043-d13fa780-6364-11e9-9796-5a80bab302d3.png" alt="sequence-diagram-information-flow" width="400" />
</p>

Olhando mais de uma perspectiva HTTP, ficaria algo assim:

### Caso de sucesso

> Requisição

`URL`: `/auth`

`método`: `POST`

`body`:
```json
{
  "username": "admin",
  "password": "1234"
}
```

> Resposta

`status code`: `201`

`body`:
```json
{
  "token": "j19fn19fhq9f0jr0adsyf08aefhf0"
}
```

### Caso de erro

> Requisição

`URL`: `/auth`

`método`: `POST`

`body`:
```json
{
  "username": "admin",
  "password": "SENHA ERRADA"
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

Como é possível ver abaixo, temos dois caminhos, um que o cliente passou o usuário e senha corretos, e outro que não.

```javascript
const express = require('express')
const bodyParser = require('body-parser')
const PORT = 8000

const app = express()

app.use(bodyParser.json())

app.post('/auth', function (req, res) {
  if (req.body.username == 'admin' && req.body.password == '1234') {
    res.status(201).send({
      token: 'AQUI TEREMOS O TOKEN FUTURAMENTE'
    })
  } else {
    res.status(401).send({
      message: 'Unauthorized'
    })
  }
})

app.listen(PORT)
```

### Testando via Postman:

#### Caso de sucesso

<p align="center">
  <img src="https://user-images.githubusercontent.com/15306309/56459270-83786e80-6367-11e9-806a-9b1e638989a2.png" alt="success-case"/>
</p>

#### Caso de erro

<p align="center">
  <img src="https://user-images.githubusercontent.com/15306309/56459297-e964f600-6367-11e9-9f01-d0220b08b7a2.png" alt="error-case"/>
</p>

### Ajustando o token!

Para gerar o token, iremos utilizar de uma biblioteca que gera um texto aleatório grande que tem baixas chances de colisão: `cuid`.

Portanto é necessário instalá-la utilizando `npm install --save cuid` em seu terminal.

Vai ficar assim o código após a adição da biblioteca:

```javascript
const express = require('express')
const bodyParser = require('body-parser')
const cuid = require('cuid')
const PORT = 8000

const app = express()

app.use(bodyParser.json())

app.post('/auth', function (req, res) {
  if (req.body.username == 'admin' && req.body.password == '1234') {
    res.status(201).send({
      token: cuid()
    })
  } else {
    res.status(401).send({
      message: 'Unauthorized'
    })
  }
})

app.listen(PORT)
```

<p align="center">
  <img src="https://user-images.githubusercontent.com/15306309/56459404-5f1d9180-6369-11e9-98c3-0f123e8d3ec4.png" alt="cuid"/>
</p>

Além disso, precisamos também guardar esses tokens, para que quando alguém fizer uma requisição para criar ou listar um produto, por exemplo, possamos validar se o token enviado está correto.

```javascript
// ...

const tokens = []

app.post('/auth', function (req, res) {
  if (req.body.username == 'admin' && req.body.password == '1234') {
    const token = cuid()

    tokens.push(token)

    res.status(201).send({
      token: token
    })
  } else {
    res.status(401).send({
      message: 'Unauthorized'
    })
  }
})

// ...
```

Pronto, terminamos! :)

<p align="center">
  <a href="https://github.com/otaviopace/livro-desenvolvimento-web-basico/blob/master/api/auth.js">Link para a versão final do código</a>
</p>
