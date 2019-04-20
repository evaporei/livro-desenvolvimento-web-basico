const express = require('express')
const bodyParser = require('body-parser')
const PORT = 8000

const app = express()

app.use(bodyParser.json())

app.post('/', function (req, res) {
  res.send(req.body)
})

app.listen(PORT)
