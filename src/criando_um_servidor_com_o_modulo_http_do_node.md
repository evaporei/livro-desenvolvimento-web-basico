# Criando um servidor com o módulo HTTP do Node.js

Crie um arquivo `JavaScript` que será o ponto de entrada da nossa aplicação/servidor HTTP.

```shell
# cria o arquivo principal
touch modulo_http.js
```

> Obs: `#` significa um comentário no terminal, ou seja, que a linha não será executada :)

Abra seu editor favorito e vamos codificar o tal servidor!

Primeiro vamos importar o módulo `http` da biblioteca padrão do `Node.js`.

Caso esteja curioso, não é necessário acessá-la, mas aqui está a [documentação do módulo](https://nodejs.org/api/http.html).

```javascript
const http = require('http')
```

Bom, agora que já importamos o módulo, iremos criar um servidor, usando a função `createServer`. Ela recebe uma função, que será chamada para cada vez que o servidor receber uma requisição.

```javascript
const http = require('http')

function requestHandler (request, response) {
  response.write('Hello World Node.js HTTP server!')
  response.end()
}

const server = http.createServer(requestHandler)
```

Os dados das variáveis `request`, e `response`, correspondem a dados do que conseguimos ler da requisição e o que podemos colocar na resposta.

A chamada a `response.write` e `response.end`, servem para retornar ao cliente um texto escrito `Hello World Node.js HTTP server!`.

Como vimos antes, para o servidor ficar acessível ao mundo externo, precisamos escolher uma porta do computador que esteja disponível. No caso iremos usar a `8000`, por nenhum motivo específico.

```javascript
const http = require('http')
const PORT = 8000

function requestHandler (request, response) {
  response.write('Hello World Node.js HTTP server!')
  response.end()
}

const server = http.createServer(requestHandler)

server.listen(PORT, function (err) {
  if (err) {
    return console.log('Algo de ruim aconteceu, erro:', err)
  }

  console.log(`Servidor escutando na porta: ${PORT}`)
})
```

A `function (err) { ... }` que estamos passando como segundo parâmetro a função `server.listen`, é chamada assim que a tentativa de subir o servidor finalizou. Ela pode ter dado certo ou errado, para isso serve o `if` aqui.

> Obs: `console.log` é a função que coloca texto no terminal, um `print`

O `return` dentro do `if` serve para que terminemos a execução da função alí mesmo. Não queremos que apareça no terminal `Servidor escutando na porta:` quando na verdade o servidor não está realmente fazendo isso, pois ocorreu um erro.

Aqui está! Temos o servidor, a porta e a função que cuida de cada requisição! Uhullll!!!!

Bora colocar esse servidor para funcionar?!

Execute em seu terminal:

```shell
node modulo_http.js
```

Caso nosso servidor esteja de pé irá aparecer a seguinte frase no terminal: `Servidor escutando na porta: 8000`.

Se der errado por algum motivo, aparecerá: `Algo de ruim aconteceu, erro: `, com o erro em sequência.

Se cair no caso de erro, talvez seja porque já subiu o servidor anteriormente ou já existe algum outro programa que usa a porta `8000`. Sendo esse o caso, mude a porta do nosso servidor, ou feche os programas que estão usando tal porta.

### Ta, e agora?

De que adianta um servidor HTTP se ele não for receber requisições não é mesmo? :O

É agora que o Postman entra na jogada!

<p align="center">
  <img src="https://www.getpostman.com/img/v2/media-kit/Logo/PNG/pm-logo-vert.png" alt="postman-logo" width="200"/>
</p>

Ao entrar ele irá pedir para fazer login, porém pode pular esse passo clicando no último texto que aparece na tela (`Take me straight to the app. I'll create an account another time.`):

<p align="center">
  <img src="https://s3.amazonaws.com/postman-static-getpostman-com/postman-docs/signUp.png" alt="postman-start-screen"/>
</p>

Na tela que o app começar, já poderá perceber que poderá criar uma requisição HTTP.
- A esquerda está o `método`, no caso o padrão é `GET`.
- Mais ao centro é possível colocar a `URL`, aqui coloque `localhost:8000`.
- Abaixo da `URL`, existem vários campos que podem ser preenchidos, como `Headers`, `Body`, etc.
- A direita tem o botão `Send` que serve para enviar a requisição.
- Abaixo do botão `Send` é informado qual o `status code` da resposta e quanto tempo levou.

Pressione o botão `Send`, e deverá ver a resposta do nosso servidor Node.js!

<p align="center">
  <img src="https://user-images.githubusercontent.com/15306309/56097868-306a6b80-5ed0-11e9-9688-664518cf2bba.png" alt="postman-example-request"/>
</p>

Parabéns!!!! Você conseguiu criar seu primeiro servidor e enviar requisições a ele!!!!!! :)

Só para ficar mais claro o que acabou de acontecer, aqui está um desenho:

<p align="center">
  <img src="https://user-images.githubusercontent.com/15306309/57666785-98979480-75d7-11e9-8096-141c35c9daaa.png" alt="diagram-request-postman-response-node"/>
</p>

Uma última coisa que da para fazer de legal, é adicionar `logs`, na sua aplicação/servidor, para que mostre qual a `rota` que o cliente está pedindo, qual o `método`, etc.

> Obs: `logs` nada mais são do que textos na tela do terminal para entender o fluxo da aplicação, ou seja, `console.log`s no caso do JavaScript

Segue o código abaixo com alguns `logs` simples.

```javascript
const http = require('http')
const PORT = 8000

function requestHandler (request, response) {
  console.log('URL:', request.url)
  console.log('Método:', request.method)

  response.write('Hello World Node.js HTTP server!')
  response.end()
}

const server = http.createServer(requestHandler)

server.listen(PORT, function (err) {
  if (err) {
    return console.log('Algo de ruim aconteceu, erro:', err)
  }

  console.log(`Servidor escutando na porta: ${PORT}`)
})
```

Exemplo de requisição `POST`:

<p align="center">
  <img src="https://user-images.githubusercontent.com/15306309/56097911-b71f4880-5ed0-11e9-9f84-8646dd230038.png" alt="postman-example-post-request"/>
</p>

Logs no terminal após uma requisição com o método `GET`, e outra com o `POST`:

<p align="center">
  <img src="https://user-images.githubusercontent.com/15306309/56097913-b7b7df00-5ed0-11e9-8ecb-82497f5fe473.png" alt="postman-example-post-request"/>
</p>

Topper! :D

Para fechar o servidor simplesmente clique no teclado `Ctrl` + `C`, ou feche o `terminal`/`Prompt de comando`.

<p align="center">
  <a href="https://github.com/otaviopace/livro-desenvolvimento-web-basico/blob/master/servidor/modulo_http.js">Link para a versão final do código</a>
</p>
