import fetch from 'isomorphic-unfetch'

import { CONTACT_API_URL, CONTACT_API_KEY } from '../../config'

const contactApi = (name, email, message, done) => {
  fetch(CONTACT_API_URL, {
    method: 'POST',
    body: JSON.stringify({ name: name, email: email, msg: message, key: CONTACT_API_KEY }),
    headers: {
      'Content-Type': 'application/json'
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

export default contactApi
