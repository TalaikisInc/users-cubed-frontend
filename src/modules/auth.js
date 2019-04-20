import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import { STORAGE_ID } from '../config'
import api from '../utils/api'
import contactApi from '../utils/contact'
import secureApi from '../utils/secure'
import { setLocale } from '../translations'
import history from '../utils/history'
import { isServer } from '../store'

const initialState = {
  isAuthenticated: false,
  currentUser: {},
  error: null,
  locale: 'en',
  burger: false
}

if (!isServer) {
  const hours = 1
  const now = new Date().getTime()
  const setupTime = localStorage.getItem('setupTime')
  if (setupTime == null) {
    localStorage.setItem('setupTime', now)
  } else {
    const token = localStorage.getItem(`${STORAGE_ID}_token`)
    const expireIn = hours * 60 * 60 * 1000
    const diff = now - setupTime
    if (diff > expireIn && (typeof token === 'undefined' || (token && (token.expiry < now)))) {
      localStorage.clear()
      localStorage.setItem('setupTime', now)
    }
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'AUTHENTICATE':
      return { ...state, isAuthenticated: action.payload }
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: action.payload }
    case 'SIGNUP':
      return { ...state, signupStatus: action.payload }
    case 'ERROR':
      return { ...state, error: action.payload }
    case 'LOADING':
      return { ...state, loading: action.payload }
    case 'CONFIRM_STATUS':
      return { ...state, confirmStatus: action.payload }
    case 'CONFIRM_RESET_STATUS':
      return { ...state, confirmResetStatus: action.payload }
    case 'RESET_STATUS':
      return { ...state, resetStatus: action.payload }
    case 'CONTACT_STATUS':
      return { ...state, contactStatus: action.payload }
    case 'LOCALE':
      return { ...state, locale: action.payload }
    case 'SET_BURGER':
      return { ...state, burger: action.payload }
    default:
      return state
  }
}

const _error = (error) => ({
  type: 'ERROR',
  payload: error
})

const isLoading = (loading) => ({
  type: 'LOADING',
  payload: loading
})

const signupUser = (status) => ({
  type: 'SIGNUP',
  payload: status
})

const setCurrentUser = (user) => ({
  type: 'SET_CURRENT_USER',
  payload: user
})

const setConfirmStatus = (status) => ({
  type: 'CONFIRM_STATUS',
  payload: status
})

const setResetStatus = (status) => ({
  type: 'RESET_STATUS',
  payload: status
})

const setResetConfirmStatus = (status) => ({
  type: 'CONFIRM_RESET_STATUS',
  payload: status
})

const setContactStatus = (status) => ({
  type: 'CONTACT_STATUS',
  payload: status
})

const _setLocale = (locale) => ({
  type: 'LOCALE',
  payload: locale
})

const setSignin = (isAuthenticated) => ({
  type: 'AUTHENTICATE',
  payload: isAuthenticated
})

export const setError = (error) => {
  return (dispatch) => {
    dispatch(_error(error))
  }
}

export const setBurger = (burger) => ({
  type: 'SET_BURGER',
  payload: burger
})

export const getUser = () => {
  return (dispatch) => {
    dispatch(isLoading(true))
    const token = localStorage.getItem(`${STORAGE_ID}_token`)
    if (token) {
      // @TODO extend token with each request
      secureApi(token, { action: 'USER_GET' }, (res) => {
        if (res && res.error) {
          dispatch(_error(res.error))
          dispatch(setSignin(false))
          dispatch(setCurrentUser({}))
        } else if (res && res.email) {
          dispatch(setCurrentUser(res))
        }
        dispatch(isLoading(false))
      })
    }
  }
}

export const editUser = (rest) => {
  return (dispatch) => {
    const token = localStorage.getItem(`${STORAGE_ID}_token`)
    if (token) {
      secureApi(token, { action: 'USER_EDIT', ...rest }, (res) => {
        if (res && res.error) {
          // @TODO dispatch logout if error is 'unauthorized'
          dispatch(_error(res.error))
        } else if (res && res.email) {
          dispatch(setCurrentUser(res))
        }
      })
    }
  }
}

export const deleteUser = () => {
  return (dispatch) => {
    const token = localStorage.getItem(`${STORAGE_ID}_token`)
    if (token) {
      secureApi(token, { action: 'USER_DESTROY' }, (res) => {
        if (res && res.error) {
          dispatch(_error(res.error))
        } else if (res && res.status === 'OK.') {
          localStorage.removeItem(`${STORAGE_ID}_token`)
          dispatch(setSignin(false))
          dispatch(setCurrentUser({}))
          history.push('/profile-deleted')
        }
      })
    }
  }
}

export const signoutUser = () => {
  return (dispatch) => {
    const token = localStorage.getItem(`${STORAGE_ID}_token`)
    if (token) {
      return api({ action: 'TOKEN_DESTROY', tokenId: token }, (res) => {
        if (res && res.error) {
          dispatch(_error(res.error))
        } else if (res && res.status === 'OK.') {
          localStorage.removeItem(`${STORAGE_ID}_token`)
          dispatch(setSignin(false))
          dispatch(setCurrentUser({}))
          history.push('/signed-out')
        }
      })
    }
  }
}

export const signup = ({ email, password, tosAgreement }) => {
  return (dispatch) => {
    return api({ action: 'USER_CREATE', email: email, password: password, tosAgreement: tosAgreement }, (res) => {
      if (res && res.error) {
        dispatch(_error(res.error))
      } else if (res && res.status === 'OK.') {
        dispatch(signupUser(true))
      }
    })
  }
}

export const signin = ({ email, password }) => {
  return (dispatch) => {
    dispatch(isLoading(true))
    return api({ action: 'TOKEN_CREATE', email: email, password: password }, (res) => {
      if (res && res.error) {
        if (res.error === 'Invalid password.') {
          dispatch(_error((<Fragment>Wrong login details, <Link to="/reset">reset password</Link>?</Fragment>)))
        } else {
          dispatch(_error(res.error))
        }
      } else if (res && res.token) {
        localStorage.setItem(`${STORAGE_ID}_token`, res.token)
        dispatch(setSignin((true)))
      }
      dispatch(isLoading(false))
    })
  }
}

export const setLanguage = (locale) => {
  return (dispatch) => {
    if (locale.length === 2) {
      localStorage.setItem(`${STORAGE_ID}_locale`, locale)
      setLocale(locale)
      dispatch(_setLocale(locale))
    }
  }
}

export const getLanguage = () => {
  return (dispatch) => {
    const locale = localStorage.getItem(`${STORAGE_ID}_locale`)
    if (locale) {
      setLocale(locale)
      dispatch(_setLocale(locale))
    }
  }
}

export const confirm = ({ token }) => {
  return (dispatch) => {
    dispatch(isLoading(true))
    return api({ action: 'CONFIRM', token: token }, (res) => {
      if (res && res.error) {
        dispatch(_error(res.error))
      } else if (res && res.status === 'OK.') {
        dispatch(setConfirmStatus(true))
      }
      dispatch(isLoading(false))
    })
  }
}

export const reset = ({ email }) => {
  return (dispatch) => {
    dispatch(isLoading(true))
    return api({ action: 'RESET_CREATE', email: email }, (res) => {
      if (res && res.error) {
        dispatch(_error(res.error))
      } else if (res && res.status === 'OK.') {
        dispatch(setResetStatus(true))
      }
      dispatch(isLoading(false))
    })
  }
}

export const confirmReset = ({ token }) => {
  return (dispatch) => {
    dispatch(isLoading(true))
    return api({ action: 'CONFIRM', token: token }, (res) => {
      if (res && res.error) {
        dispatch(_error(res.error))
      } else if (res && res.status === 'OK.') {
        dispatch(setResetConfirmStatus(true))
      }
      dispatch(isLoading(false))
    })
  }
}

export const contact = ({ name, email, message }) => {
  return (dispatch) => {
    dispatch(isLoading(true))
    return contactApi(name, email, message, (res) => {
      if (res && res.error) {
        dispatch(_error(res.error))
      } else if (res && res.status === 'OK.') {
        dispatch(setContactStatus(true))
      }
      dispatch(isLoading(false))
    })
  }
}

export const socialSignin = (provider) => {
  return (dispatch) => {
    dispatch(isLoading(false))
    api({ action: 'TOKEN_CREATE_SOCIAL' }, (res) => {
      if (res && res.error) {
        api({ action: `USER_CREATE_${provider}` }, (res) => {
          if (res && res.error) {
            dispatch(_error(res.error))
          } else if (res && res.status === 'OK.') {
            dispatch(signupUser(true))
          }
          dispatch(isLoading(false))
        })
      } else if (res && res.token) {
        localStorage.setItem(`${STORAGE_ID}_token`, res.token)
        dispatch(setSignin((true)))
        dispatch(isLoading(false))
      }
    })
  }
}
