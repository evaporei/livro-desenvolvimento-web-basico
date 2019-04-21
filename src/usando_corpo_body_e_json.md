# Usando o corpo/body e JSON

Agora iremos passar dados pelo corpo (`body`) da requisição, e retornar dados pelo corpo (`body`) da resposta.

O `express` não faz o `parse` (análise e preparo) do corpo da requisição, portanto para fazer isso, iremos usar um `middleware` (uma função que é chamada em cada requisição, antes do nosso código) chamado `body-parser`.

Para instalá-lo, execute:

```shell
npm install --save body-parser
```

Vamos criar um novo arquivo `JavaScript` para isso!

```shell
# cria o arquivo principal
touch usando_body.js
```

Nosso arquivo vai começar com o seguinte:

```javascript
const express = require('express')
const PORT = 8000

const app = express()

app.listen(PORT)
```

Agora vamos adicionar o `body-parser` para poder ler o corpo da requisição no nosso servidor.

```javascript
const express = require('express')
const bodyParser = require('body-parser')
const PORT = 8000

const app = express()

app.use(bodyParser.json())

app.listen(PORT)
```

Pronto! Agora iremos adicionar uma rota que irá receber um conteúdo no formato `JSON` e irá retornar o mesmo no corpo da resposta.

```javascript
const express = require('express')
const bodyParser = require('body-parser')
const PORT = 8000

const app = express()

app.use(bodyParser.json())

app.post('/', function (req, res) {
  res.send(req.body)
})

app.listen(PORT)
```

Temos nosso servidor, que tal testarmos para ver se funciona via `Postman`?

<p align="center">
  <img src="https://user-images.githubusercontent.com/15306309/56458556-c2ee8d00-635e-11e9-99fb-b400871a6723.png" alt="postman-returning-same-body"/>
</p>

Uhulll!!! Funciona :)

<p align="center">
  <a href="https://github.com/otaviopace/livro-desenvolvimento-web-basico/blob/master/servidor/usando_body.js">Link para a versão final do código</a>
</p>
