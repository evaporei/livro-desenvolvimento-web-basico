# Autenticação

Primeiro de tudo, para conseguirmos interagir com nossa API de produtos, precisamos de um token, ou seja, de autenticação/autorização.

Segue abaixo o script de como usar o `axios` para fazer uma requisição `HTTP`.

```javascript
const axios = require('axios')

const BASE_URL = 'http://localhost:8000'

async function run () {
  const authResponse = await axios({
    baseURL: BASE_URL,
    url: '/auth',
    method: 'POST',
    data: {
      username: 'admin',
      password: '1234'
    }
  })

  console.log('authResponse body:', authResponse.data)
}

run()
```

Lembrando que a variável `data` na requisição e na resposta (`authResponse`) representam o `body`/corpo do protocólo HTTP.

Ao executar, com o nosso servidor do último capítulo rodando é claro, teremos o seguinte resultado no terminal:

<p align="center">
  <img src="https://user-images.githubusercontent.com/15306309/56465088-4050e680-63cd-11e9-9c92-f418bfd3c97c.png" alt="terminal-output" />
</p>

Ou seja, nosso `token` foi gerado!

Bom, agora poderemos prosseguir com as demais requisições a nossa API.

<p align="center">
  <a href="https://github.com/otaviopace/livro-desenvolvimento-web-basico/blob/master/request/auth.js">Link para a versão final do código</a>
</p>
