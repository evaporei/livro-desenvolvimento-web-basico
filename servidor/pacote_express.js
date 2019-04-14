const express = require('express')
const PORT = 8000

const application = express()

application.get('/', function (request, response) {
  console.log('URL:', request.url)
  console.log('Método:', request.method)
  console.log('Headers:', request.headers)
  response.status(200).send('Olá!')
})

application.disable('x-powered-by')

application.listen(PORT)
