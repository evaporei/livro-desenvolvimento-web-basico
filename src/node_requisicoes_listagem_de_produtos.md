# Listagem de produtos

Para listar a única coisa que precisamos fazer é modificar o `method` de `POST` para `GET`, e remover o `body`/corpo (campo `data`).

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

  const TOKEN = authResponse.data.token

  const listProductsResponse = await axios({
    baseURL: BASE_URL,
    url: '/products',
    method: 'GET',
    headers: {
      authorization: `Bearer ${TOKEN}`
    }
  })

  console.log('listProductsResponse body:', listProductsResponse.data)
}

run()
```

<p align="center">
  <img src="https://user-images.githubusercontent.com/15306309/56465534-7003ec80-63d5-11e9-9969-1e5b05e98ac2.png" alt="terminal-output-1" />
</p>

Simples assim! :)

<p align="center">
  <a href="https://github.com/otaviopace/livro-desenvolvimento-web-basico/blob/master/request/listagem_produtos.js">Link para a versão final do código</a>
</p>
