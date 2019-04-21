# Setup

Recomendo criar uma outra pasta somente para esse projeto.

Execute `npm init` e pode pressionar `Enter` até as opções do `npm` acabarem.

## Dependências

Iremos precisar somente do `express`, e do `body-parser`. Para instalá-las:

```shell
npm install --save express body-parser
```

Esse será o servidor base para o projeto:

```javascript
const express = require('express')
const bodyParser = require('body-parser')
const PORT = 8000

const app = express()

app.use(bodyParser.json())

app.listen(PORT)
```

## Facilitando o desenvolvimento

Essa parte é opcional, mas irá facilitar o desenvolvimento.

Existe uma ferramenta de linha de comando chamada `nodemon` a qual executa o script Node.js passado por argumento (`nodemon arquivo.js`), e toda vez que o arquivo for alterado.

Isso facilita ter de ficar parando o servidor no terminal com `Ctrl + C` e o iniciando novamente, a cada alteração no código.

## Notas

Todo o código do servidor estará não só aqui nos capítulos do livro, como na pasta [api do repositório no Github](https://github.com/otaviopace/livro-desenvolvimento-web-basico/tree/master/api).

<p align="center">
  <a href="https://github.com/otaviopace/livro-desenvolvimento-web-basico/blob/master/api/setup.js">Link para a versão final do código</a>
</p>
