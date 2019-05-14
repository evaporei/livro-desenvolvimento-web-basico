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

app.get('/products', authorizationMiddleware, function (req, res) {
  const filters = []

  if (req.query.name != null) { filters.push('name') }
  if (req.query.price != null) { filters.push('price') }

  let filteredProducts

  if (filters.length == 0) {
    filteredProducts = products
  } else {
    filteredProducts = products.filter(function (product) {
      const validations = []

      if (filters.includes('name')) {
        validations.push(product.name.includes(req.query.name))
      }

      if (filters.includes('price')) {
        validations.push(product.price == req.query.price)
      }

      return validations.some(function (validation) {
        return validation == true
      })
    })
  }

  res.status(200).send(filteredProducts)
})

app.get('/products/:id', authorizationMiddleware, function (req, res) {
  const productFound = products.find(function (product) {
    return req.params.id == product.id
  })

  if (!productFound) {
    res.status(404).send({
      message: 'No product exists with this id'
    })
    return
  }

  res.status(200).send(productFound)
})

app.patch('/products/:id', authorizationMiddleware, function (req, res) {
  const productFound = products.find(function (product) {
    return req.params.id == product.id
  })

  if (!productFound) {
    res.status(404).send({
      message: 'No product exists with this id'
    })
    return
  }

  if (req.body.name != null) {
    productFound.name = req.body.name
  }

  if (req.body.price != null) {
    productFound.price = req.body.price
  }

  res.status(200).send(productFound)
})

app.listen(PORT)
