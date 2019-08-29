# Setup

Recomendo criar uma outra pasta somente para esse projeto.

Execute `npm init` e pode pressionar `Enter` até as opções do `npm` acabarem.

## Dependências

Iremos precisar somente do `axios`, ela é uma biblioteca/pacote que facilita a fazer requisições HTTP. Para instalá-lo:

```shell
npm install --save axios
```

Esse será o arquivo base para o projeto:

```javascript
const axios = require('axios')

const BASE_URL = 'http://localhost:8000'

async function run () {
// ...
}

run()
```

Todo o nosso código ficará dentro da função assíncrona `run`.

## Facilitando o desenvolvimento

Essa parte é opcional, mas irá facilitar o desenvolvimento.

Existe uma ferramenta de linha de comando chamada `nodemon` a qual executa o script Node.js passado por argumento (`nodemon arquivo.js`), e toda vez que o arquivo for alterado, o script é iniciado novamente com o código novo.

Isso facilita ter de ficar parando o servidor no terminal com `Ctrl + C` e o iniciando novamente, a cada alteração no código.

Para instalar o `nodemon` utilize `npm install --global nodemon`, após executar isso, terá disponível o comando no terminal, assim como já possuia o `node`.

## Notas

Todo o código do servidor estará não só aqui nos capítulos do livro, como na pasta [api do repositório no Github](https://github.com/otaviopace/livro-desenvolvimento-web-basico/tree/master/request).

<p align="center">
  <a href="https://github.com/otaviopace/livro-desenvolvimento-web-basico/blob/master/request/setup.js">Link para a versão final do código</a>
</p>
