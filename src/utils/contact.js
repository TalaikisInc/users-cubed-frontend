import fetch from 'isomorphic-unfetch'

import { CONTACT_API_URL, CONTACT_API_KEY, STORAGE_ID } from '../config'

const contactApi = (name, email, message, done) => {
  const locale = localStorage.getItem(`${STORAGE_ID}_locale`)

  fetch(CONTACT_API_URL, {
    method: 'POST',
    body: JSON.stringify({ msg: message, key: CONTACT_API_KEY, locale, name, email }),
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
