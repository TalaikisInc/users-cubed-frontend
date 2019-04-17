import fetch from 'isomorphic-unfetch'

import { API_URL, API_KEY } from '../../config'

const secureApi = (token, data, done) => {
  data['key'] = API_KEY
  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      done(data)
    })
    .catch((err) => {
      done({ error: err.message })
    })
}

export default secureApi
