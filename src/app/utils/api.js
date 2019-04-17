import fetch from 'isomorphic-unfetch'

import { STORAGE_ID, API_URL, API_KEY } from '../../config'

const api = (data, done) => {
  const locale = localStorage.getItem(`${STORAGE_ID}_locale`)
  data['key'] = API_KEY
  data['locale'] = locale

  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(data),
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

export default api
