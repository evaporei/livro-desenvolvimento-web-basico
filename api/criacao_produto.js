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
    res.status(401).send({ message: 'Authorization header missing' })
    return
  }

  const authorizationHeaderParts = authorizationHeader.split(' ')

  const bearer = authorizationHeaderParts[0]
  const token = authorizationHeaderParts[1]

  if (bearer != 'Bearer') {
    res.status(401).send({ message: 'Authorization header needs the Bearer prefix' })
    return
  }

  const isValidToken = tokens.find(function (validToken) {
    return validToken == token
  })

  if (!isValidToken) {
    res.status(401).send({ message: 'Authorization header is not valid' })
    return
  }

  next()
}

app.post('/products', authorizationMiddleware, function (req, res) {
  if (req.body.name == null) {
    res.status(400).send({
      message: 'The product name is missing'
    })
    return
  }

  if (req.body.price == null) {
    res.status(400).send({
      message: 'The product price is missing'
    })
    return
  }

  const productAlreadyExists = products.find(function (product) {
    return product.name == req.body.name
  })

  if (productAlreadyExists) {
    res.status(400).send({
      message: 'This product name already exists' 
    })
    return
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
