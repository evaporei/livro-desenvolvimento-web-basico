# O que é uma SDK?

Agora que já fizemos um servidor, entendemos como ele funciona e como fazer requisições a ele via código, iremos entender o que é uma SDK.

SDK é um kit de desenvolvimento para algo.

Existem SDKs que seguem APIs HTTP, e outras que são simplesmente sobre funções/classes/etc de alguma biblioteca.

No caso de SDKs de APIs HTTP, basicamente elas são `"wrappers"` (uma camada entorno) sobre as requisições HTTP.

Exemplo, vamos supor que tenho uma incrível API de mapas, porém é muito complexo enviar os dados a minha API para cada requisição. O que eu posso fazer para facilitar a vida de quem consome minha API, é escrever uma SDK que contém funções que já deixam tudo pronto quanto ao `HTTP` e só retornam os dados de forma simples.

Uma SDK é só uma abstração.

Portanto, ao invés de em `Node.js` termos de interagir com o `axios`, poderíamos importar uma biblioteca fictícia chamada `products-sdk` que teria funções como `createProduct`. Ou então, tería uma classe `Product` que ao instanciar iria fazer a requisição a nossa API.
