const express = require('express')
const bodyParser = require('body-parser')
const cuid = require('cuid')
const PORT = 8000

const app = express()

app.use(bodyParser.json())

const tokens = []

app.post('/auth', function (req, res) {
  if (req.body.username == 'admin' && req.body.password == '1234') {
    const token = cuid()

    tokens.push(token)

    res.status(201).send({
      token: token
    })
  } else {
    res.status(401).send({
      message: 'Unauthorized'
    })
  }
})

app.listen(PORT)
