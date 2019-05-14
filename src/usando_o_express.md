# Usando o pacote express

Bom, dessa vez iremos usar um pacote que facilita a criação de servidores HTTP, o nome dele é `express`.

> Obs: um pacote nada mais é do que um conjunto de código publicado

Para instalá-lo rode `npm install --save express`.

```shell
npm install --save express
```

Crie um arquivo `JavaScript` que será o ponto de entrada da nossa aplicação/servidor Express.

```shell
# cria o arquivo principal
touch pacote_express.js
```

Abaixo está uma aplicação que se comporta de forma extremamente similar a última que codificamos.

- pacote_express.js
```javascript
const express = require('express')
const PORT = 8000

const application = express()

application.get('/', function (request, response) {
  console.log('URL:', request.url)
  console.log('Método:', request.method)
  response.status(200).send('Olá!')
})

application.listen(PORT)
```

O `application.get('/', handler)`, funciona similar ao que fizemos da última vez. Porém nesse caso, toda requisição que o servidor receber na rota base (root), irá chamar a função passada como segundo parâmetro.

Para iniciar o servidor, é da mesma forma que antes, apenas troque o nome do arquivo e execute:

```shell
node pacote_express.js
```

Algumas coisas que podemos brincar com esse servidor são, ler dados da requisição do cliente, e retornar dados.

## Lendo dados do servidor

Exemplo de requisição ao servidor `express`:
<p align="center">
  <img src="https://user-images.githubusercontent.com/15306309/56098023-37927900-5ed2-11e9-893b-22a9668ba6ec.png" alt="postman-request-reading-data"/>
</p>

Podemos observar por exemplo que por padrão é enviado um `header` ao cliente chamado `X-Powered-By`, devido ao `express`.

<p align="center">
  <img src="https://user-images.githubusercontent.com/15306309/56098026-3c572d00-5ed2-11e9-9f6b-93fb81b49d9b.png" alt="postman-request-reading-headers" width="400"/>
</p>

## Alterando os headers

Vamos supor que por motivos de segurança, você não quer que o mundo a fora saiba que seu servidor é feito em `express`.

Para remover tal `header`, é necessário colocar a chamada para `application.disable('x-powered-by')` no código, ficando assim:

```javascript
const express = require('express')
const PORT = 8000

const application = express()

application.get('/', function (request, response) {
  console.log('URL:', request.url)
  console.log('Método:', request.method)
  response.status(200).send('Olá!')
})

application.disable('x-powered-by')

application.listen(PORT)
```

Dessa forma, ao fazer uma requisição pelo `Postman`, não veremos mais o `header`.

<p align="center">
  <img src="https://user-images.githubusercontent.com/15306309/56098097-3ada3480-5ed3-11e9-85f1-12bb49ba970c.png" alt="postman-request-missing-express-header" width="400"/>
</p>

Parabéns! Você acaba de modificar os `headers`, do seu servidor HTTP!

## Lendo os headers do cliente no servidor

Exemplo de requisição de um cliente com um `dado-legal` como `header` adicional:

<p align="center">
  <img src="https://user-images.githubusercontent.com/15306309/56098153-e4b9c100-5ed3-11e9-93f2-f97bb33c70d3.png" alt="postman-request-passing-headers"/>
</p>

Para ler o `header` no servidor:

```javascript
const express = require('express')
const PORT = 8000

const application = express()

application.get('/', function (request, response) {
  console.log('URL:', request.url)
  console.log('Método:', request.method)
  console.log('Headers:', request.headers)
  response.status(200).send('Olá!')
})

application.listen(PORT)
```

Ao fazer a requisição, no terminal ficará da seguinte forma:

<p align="center">
  <img src="https://user-images.githubusercontent.com/15306309/56098169-116dd880-5ed4-11e9-9358-4a9439fc9ad6.png" alt="terminal-headers-server"/>
</p>

Como pôde ver, o `header`, `dado-legal` foi lido no servidor!

Da mesmo forma do anterior, para fechar o servidor simplesmente clique no teclado `Ctrl` + `C`, ou feche o `terminal`/`Prompt de comando`.

<p align="center">
  <a href="https://github.com/otaviopace/livro-desenvolvimento-web-basico/blob/master/servidor/pacote_express.js">Link para a versão final do código</a>
</p>
