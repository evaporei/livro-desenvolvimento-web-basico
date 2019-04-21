# Criação de produto

Agora que já temos o `token` podemos criar um produto.

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

  const createProductResponse = await axios({
    baseURL: BASE_URL,
    url: '/products',
    method: 'POST',
    headers: {
      authorization: `Bearer ${TOKEN}`
    },
    data: {
      name: 'boneco do goku',
      price: 55.6
    }
  })

  console.log('createProductResponse body:', createProductResponse.data)
}

run()
```

<p align="center">
  <img src="https://user-images.githubusercontent.com/15306309/56465337-ec94cc00-63d1-11e9-916f-6ef27d3dc363.png" alt="terminal-output-1" />
</p>

Wow! Funciona :)

Porém existe um problema com nosso script. Se tentarmos rodá-lo mais uma vez, sofreremos um erro.

<p align="center">
  <img src="https://user-images.githubusercontent.com/15306309/56465384-8eb4b400-63d2-11e9-8fae-28ac9faabf81.png" alt="terminal-output-2" />
</p>

Vamos investigar melhor o porque disso ocorrer. Para ficar mais fácil o `debug`, vamos colocar um `try { ... } catch (error) { ... }`.

```javascript
// ...

async function run () {
  try {
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

    const createProductResponse = await axios({
      baseURL: BASE_URL,
      url: '/products',
      method: 'POST',
      headers: {
        authorization: `Bearer ${TOKEN}`
      },
      data: {
        name: 'boneco do goku',
        price: 55.6
      }
    })

    console.log('createProductResponse body:', createProductResponse.data)
  } catch (error) {
    console.log('error body:', error.response.data)
  }
}

// ...
```

Agora o erro no terminal fica mais claro:

<p align="center">
  <img src="https://user-images.githubusercontent.com/15306309/56465406-e8b57980-63d2-11e9-8290-016487d2c5f0.png" alt="terminal-output-3" />
</p>

Já existe um produto cadastrado com o mesmo nome. Isso acontece pois nunca mudamos o nome no script.

Poderiamos trocar o nome a cada execução do script, mas isso é muito trabalhoso, por isso iremos adicionar uma função que coloca um número aleatório até 1000 final do texto.

Dessa forma:

```javascript
// ...
function randomNumber () {
  return Math.floor(Math.random() * 1000)
}

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

  const createProductResponse = await axios({
    baseURL: BASE_URL,
    url: '/products',
    method: 'POST',
    headers: {
      authorization: `Bearer ${TOKEN}`
    },
    data: {
      name: `boneco do goku ${randomNumber()}`,
      price: 55.6
    }
  })

  console.log('createProductResponse body:', createProductResponse.data)
}

// ...
```

<p align="center">
  <img src="https://user-images.githubusercontent.com/15306309/56465449-c5d79500-63d3-11e9-8ecf-c43b1ebef17a.png" alt="terminal-output-4" />
</p>

Voilá! Agora podemos executar indeterminadas (até ter colisão, ou chegarmos a 1000 produtos, um para cada número) vezes que irá funcionar! E sim, poderíamos usar algo como a biblioteca `cuid` aqui, a qual usamos na nossa API.

<p align="center">
  <a href="https://github.com/otaviopace/livro-desenvolvimento-web-basico/blob/master/request/criacao_produto.js">Link para a versão final do código</a>
</p>
