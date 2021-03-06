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
  loading: false,
  locale: 'en',
  burger: false,
  signupStatus: false,
  confirmStatus: false,
  referStatus: false,
  confirmResetStatus: false,
  resetStatus: false,
  contactStatus: false,
  editStatus: false
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
    case 'REFER_STATUS':
      return { ...state, referStatus: action.payload }
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
    case 'EDIT_STATUS':
      return { ...state, editStatus: action.payload }
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

export const setResetStatus = (status) => ({
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

const setReferStatus = (status) => ({
  type: 'REFER_STATUS',
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

export const editStatus = (status) => ({
  type: 'EDIT_STATUS',
  payload: status
})

export const setEditStatus = (status) => {
  return (dispatch) => {
    dispatch(editStatus(status))
  }
}

export const getUser = () => {
  return (dispatch) => {
    dispatch(isLoading(true))
    let token
    if (!isServer) {
      token = localStorage.getItem(`${STORAGE_ID}_token`)
    }

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
    let token
    if (!isServer) {
      token = localStorage.getItem(`${STORAGE_ID}_token`)
    }

    if (token) {
      secureApi(token, { action: 'USER_EDIT', ...rest }, (res) => {
        if (res && res.error) {
          if (res.error === 'Unauthorized.') {
            dispatch(setSignin(false))
            dispatch(setCurrentUser({}))
          }
          dispatch(_error(res.error))
        } else if (res && res.email) {
          dispatch(setCurrentUser(res))
          dispatch(_error(null))
          dispatch(editStatus(true))
        }
      })
    }
  }
}

export const deleteUser = () => {
  return (dispatch) => {
    let token
    if (!isServer) {
      token = localStorage.getItem(`${STORAGE_ID}_token`)
    }

    if (token) {
      secureApi(token, { action: 'USER_DESTROY' }, (res) => {
        if (res && res.error) {
          dispatch(_error(res.error))
        } else if (res && res.status === 'OK.') {
          if (!isServer) {
            history.push('/profile-deleted')
            localStorage.removeItem(`${STORAGE_ID}_token`)
          }
          dispatch(setSignin(false))
          dispatch(setCurrentUser({}))
        }
      })
    }
  }
}

export const refer = ({ to }) => {
  return (dispatch) => {
    let token
    if (!isServer) {
      token = localStorage.getItem(`${STORAGE_ID}_token`)
    }

    if (token) {
      secureApi(token, { action: 'REFER_REFER', to }, (res) => {
        if (res && res.error) {
          dispatch(_error(res.error))
        } else if (res && res.status === 'OK.') {
          dispatch(setReferStatus(true))
        }
      })
    }
  }
}

export const signoutUser = () => {
  return (dispatch) => {
    let token
    if (!isServer) {
      token = localStorage.getItem(`${STORAGE_ID}_token`)
    }

    if (token) {
      return api({ action: 'TOKEN_DESTROY', tokenId: token }, (res) => {
        if (res && res.error) {
          dispatch(_error(res.error))
        } else if (res && res.status === 'OK.') {
          if (!isServer) {
            history.push('/signed-out')
            localStorage.removeItem(`${STORAGE_ID}_token`)
          }
          dispatch(setSignin(false))
          dispatch(setCurrentUser({}))
        }
      })
    }
  }
}

export const signup = ({ email, password, tosAgreement }) => {
  return (dispatch) => {
    return api({ action: 'USER_CREATE', email: email, password: password, tosAgreement: tosAgreement }, (res) => {
      if (res && res.error) {
        if (res.error === 'User exists.') {
          dispatch(_error((<Fragment>{res.error}, <Link to="/signin">sign in</Link>?</Fragment>)))
        } else {
          dispatch(_error(res.error))
        }
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
        if (res.error === 'Wrong login details.') {
          dispatch(_error((<Fragment>Wrong login details, <Link to="/reset">reset password</Link>?</Fragment>)))
        } else {
          dispatch(_error(res.error))
        }
      } else if (res && res.token) {
        if (!isServer) {
          localStorage.setItem(`${STORAGE_ID}_token`, res.token)
        }
        dispatch(setSignin((true)))
      }
      dispatch(isLoading(false))
    })
  }
}

export const setLanguage = (locale) => {
  return (dispatch) => {
    if (locale.length === 2) {
      if (!isServer) {
        localStorage.setItem(`${STORAGE_ID}_locale`, locale)
      }
      setLocale(locale)
      dispatch(_setLocale(locale))
    }
  }
}

export const getLanguage = () => {
  return (dispatch) => {
    let locale
    if (!isServer) {
      locale = localStorage.getItem(`${STORAGE_ID}_locale`)
    }

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
    dispatch(isLoading(true))
    api({ action: 'USER_CREATE_SOCIAL', provider }, (res) => {
      if (res && res.error) {
        dispatch(_error(res.error))
      } else if (res && res.status === 'OK.') {
        // @TODO we should get token here
        dispatch(signupUser(true))
      }
      dispatch(isLoading(false))
    })
  }
}
