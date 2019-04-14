const http = require('http')
const PORT = 8000

const requestHandler = (request, response) => {
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
