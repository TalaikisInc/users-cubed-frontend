import Cookies from 'js-cookie'

import { COOKIE_ID } from '../config'
import api from '../app/utils/api'
import contactApi from '../app/utils/contact'

export const AUTHENTICATE = 'auth/AUTHENTICATE'
export const SET_CURRENT_USER = 'auth/SET_CURRENT_USER'

const initialState = {
  isAuthenticated: false,
  currentUser: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return { ...state, isAuthenticated: action.isAuthenticated }
    case SET_CURRENT_USER:
      return { ...state, currentUser: action.user }
    case 'SIGNUP':
      return { ...state, signupStatus: action.payload }
    case 'ERROR':
      return { ...state, error: action.payload }
    case 'STATUS':
      return { ...state, status: action.payload }
    default:
      return state
  }
}

export const getUser = () => (dispatch) =>
  new Promise(resolve => {
    let userFromCookie = Cookies.getJSON(COOKIE_ID)

    if (userFromCookie) {
      dispatch(signinUser(userFromCookie))
      resolve(userFromCookie)
    } else {
      resolve({})
    }
  })

export const signoutUser = () => (dispatch) => 
  new Promise((resolve) => {
    dispatch({
      type: AUTHENTICATE,
      isAuthenticated: false
    })

    dispatch({
      type: SET_CURRENT_USER,
      user: {}
    })

    Cookies.remove(COOKIE_ID)
    resolve({})
  })

const error = (error) => ({
  type: 'ERROR',
  payload: error
})

const signupUser = (status) => ({
  type: 'SIGNUP',
  payload: status
})

const signinUser = (userObj) => ({
  type: 'SET_CURRENT_USER',
  payload: userObj
})

const setStatus = (status) => ({
  type: 'STATUS',
  payload: status
})

export const signup = ({ email, password, tosAgreement }) => {
  return (dispatch) => {
    return api({ action: 'USER_CREATE', email: email, password: password, tosAgreement: tosAgreement }, (res) => {
      if (res && res.error) {
        dispatch(error(res.error))
      } else if (res && res.status === 'OK.') {
        dispatch(signupUser(true))
      }
    })
  }
}

export const signin = ({ email, password }) => {
  return (dispatch) => {
    return api({ action: 'TOKEN_CREATE', email: email, password: password }, (res) => {
      if (res && res.error) {
        dispatch(error(res.error))
      } else if (res && res.token) {
        Cookies.set(COOKIE_ID, res)
        dispatch(signinUser(res))
        dispatch({ type: AUTHENTICATE, isAuthenticated: true })
      }
    })
  }
}

export const setError = (error) => {
  return (dispatch) => {
    dispatch(error(error))
  }
}

export const confirm = ({ token }) => {
  return (dispatch) => {
    return api({ action: 'CONFIRM', token: token }, (res) => {
      if (res && res.error) {
        dispatch(error(res.error))
      } else if (res && res.status === 'OK.') {
        dispatch(setStatus(true))
      }
    })
  }
}

export const reset = ({ email }) => {
  return (dispatch) => {
    return api({ action: 'RESET_CREATE', email: email }, (res) => {
      if (res && res.error) {
        dispatch(error(res.error))
      } else if (res && res.status === 'OK.') {
        dispatch(setStatus(true))
      }
    })
  }
}

export const confirmReset = ({ token }) => {
  return (dispatch) => {
    return api({ action: 'CONFIRM', token: token }, (res) => {
      if (res && res.error) {
        dispatch(error(res.error))
      } else if (res && res.status === 'OK.') {
        dispatch(setStatus(true))
      }
    })
  }
}

export const contact = ({ name, email, message }) => {
  return (dispatch) => {
    return contactApi(name, email, message, (res) => {
      if (res && res.error) {
        dispatch(error(res.error))
      } else if (res && res.status === 'OK.') {
        dispatch(setStatus(true))
      }
    })
  }
}
