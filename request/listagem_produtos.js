const axios = require('axios')

const BASE_URL = 'http://localhost:8000'

async function run () {
  const authResponse = await axios({
    baseURL: BASE_URL,
    url: '/auth',
    method: 'POST',
    data: {
      username: 'admin',
      password: '1234'
    }
  })

  const TOKEN = authResponse.data.token

  const listProductsResponse = await axios({
    baseURL: BASE_URL,
    url: '/products',
    method: 'GET',
    headers: {
      authorization: `Bearer ${TOKEN}`
    }
  })

  console.log('listProductsResponse body:', listProductsResponse.data)
}

run()
