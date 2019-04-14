# O que costuma girar entorno de servidores HTTP?

O servidor/computador fica escutando por conexões em uma porta. Todo computador tem um IP (216.3.128.12), que é um identificador único na internet. Geralmente se configura um DNS (www.google.com), que nada mais é que um texto que direciona para um IP ou um conjunto de IPs.

<p align="center">
  <img src="https://user-images.githubusercontent.com/15306309/56098622-80e5c700-5ed8-11e9-92ae-4e70aec5c015.png" alt="drawing1"/>
</p>

É comum também utilizar de `load balancers` para ficarem na frente dos servidores.

Um `load balancer`, nada mais é que um servidor como qualquer outro, cuja função é receber requisições e direcioná-las a outros servidores, dividingo a carga de uma forma específica (igualmente por exemplo).

<p align="center">
  <img src="https://user-images.githubusercontent.com/15306309/56098687-2c8f1700-5ed9-11e9-82f6-9fd595e70289.png" alt="drawing2"/>
</p>
