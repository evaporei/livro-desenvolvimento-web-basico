const axios = require('axios')

const BASE_URL = 'http://localhost:8000'

function randomNumber () {
  return Math.floor(Math.random() * 1000)
}

async function run () {
  try {
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

    const createProductResponse = await axios({
      baseURL: BASE_URL,
      url: '/products',
      method: 'POST',
      headers: {
        authorization: `Bearer ${TOKEN}`
      },
      data: {
        name: `boneco do goku ${randomNumber()}`,
        price: 55.6
      }
    })

    console.log('createProductResponse body:', createProductResponse.data)
  } catch (error) {
    console.log('error body:', error.response.data)
  }
}

run()
