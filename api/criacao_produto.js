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

const products = []

function authorizationMiddleware (req, res, next) {
  const authorizationHeader = req.get('authorization')

  if (!authorizationHeader) {
    return res.status(401).send({ message: 'Authorization header missing' })
  }

  const authorizationHeaderParts = authorizationHeader.split(' ')

  const bearer = authorizationHeaderParts[0]
  const token = authorizationHeaderParts[1]

  if (bearer != 'Bearer') {
    return res.status(401).send({ message: 'Authorization header needs the Bearer prefix' })
  }

  const isValidToken = tokens.find(function (validToken) {
    return validToken == token
  })

  if (!isValidToken) {
    return res.status(401).send({ message: 'Authorization header is not valid' })
  }

  next()
}

app.post('/products', authorizationMiddleware, function (req, res) {
  if (req.body.name == null) {
    return res.status(400).send({
      message: 'The product name is missing'
    })
  }

  if (req.body.price == null) {
    return res.status(400).send({
      message: 'The product price is missing'
    })
  }

  const productAlreadyExists = products.find(function (product) {
    return product.name == req.body.name
  })

  if (productAlreadyExists) {
    return res.status(400).send({
      message: 'This product name already exists' 
    })
  }

  const newProduct = {
    id: cuid(),
    name: req.body.name,
    price: req.body.price
  }

  products.push(newProduct)

  res.status(201).send(newProduct)
})

app.listen(PORT)
