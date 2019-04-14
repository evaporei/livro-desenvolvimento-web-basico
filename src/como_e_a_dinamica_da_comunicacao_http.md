# Como é a dinâmica da comunicação HTTP?

Existem dois players, o cliente e o servidor. O servidor aguarda por requisições de clientes. E os clientes iniciam a conexão criando uma requisição ao servidor.

Imagens de exemplo:

<p align="center">
  <img src="https://user-images.githubusercontent.com/15306309/56098460-20a25580-5ed7-11e9-9f1e-73fb8d951f78.png" alt="drawing1"/>
</p>

<p align="center">
  <img src="https://user-images.githubusercontent.com/15306309/56098488-5e06e300-5ed7-11e9-8a6e-ad99cb0161b6.png" alt="drawing2"/>
</p>

<p align="center">
  <img src="https://user-images.githubusercontent.com/15306309/56098524-927a9f00-5ed7-11e9-8415-700beafa0154.png" alt="drawing3"/>
</p>

Esse fluxo é **síncrono**, ou seja, a ideia é que quando o cliente inicia uma conexão, ele irá esperar até sua resposta chegar. Caso ela não chegue no tempo esperado, a requisição pode ser terminada.
