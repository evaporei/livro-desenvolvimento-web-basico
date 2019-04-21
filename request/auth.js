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

  console.log('authResponse body:', authResponse.data)
}

run()
