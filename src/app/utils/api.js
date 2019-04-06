import { SubmissionError } from 'redux-form'
import fetch from 'isomorphic-unfetch'

import { API_URL } from '../../config'

const api = (data) => {
  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      if (res.status > 300) {
        throw new SubmissionError({ _error: res.error })
      }

      return res.json()
    })
    .then((data) => {
      return data
    })
    .catch((err) => {
      throw new SubmissionError({ _error: err.message })
    })
}

export default api
