import { STORAGE_ID } from '../config'
import api from '../app/utils/api'
import contactApi from '../app/utils/contact'
import secureApi from '../app/utils/secure'

const initialState = {
  isAuthenticated: false,
  currentUser: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'AUTHENTICATE':
      return { ...state, isAuthenticated: action.isAuthenticated }
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: action.user }
    case 'SIGNUP':
      return { ...state, signupStatus: action.payload }
    case 'ERROR':
      return { ...state, error: action.payload }
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
    default:
      return state
  }
}

const _error = (error) => ({
  type: 'ERROR',
  payload: error
})

const signupUser = (status) => ({
  type: 'SIGNUP',
  payload: status
})

const setCurrentUser = (userObj) => ({
  type: 'SET_CURRENT_USER',
  payload: userObj
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

const setLocale = (locale) => ({
  type: 'LOCALE',
  payload: locale
})

export const getUser = () => {
  return (dispatch) => {
    const token = localStorage.getItem(`${STORAGE_ID}_token`)
    if (token) {
      secureApi(token, { action: 'USER_GET' }, (res) => {
        if (res && res.error) {
          dispatch(_error(res.error))
        } else if (res && res.email) {
          dispatch({ type: 'AUTHENTICATE', isAuthenticated: true })
          dispatch(setCurrentUser(res))
        }
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
          dispatch({ type: 'AUTHENTICATE', isAuthenticated: false })
          dispatch(setCurrentUser({}))
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
          dispatch({ type: 'AUTHENTICATE', isAuthenticated: false })
          dispatch(setCurrentUser({}))
          localStorage.removeItem(`${STORAGE_ID}_token`)
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
    return api({ action: 'TOKEN_CREATE', email: email, password: password }, (res) => {
      if (res && res.error) {
        dispatch(_error(res.error))
      } else if (res && res.token) {
        localStorage.setItem(`${STORAGE_ID}_token`, res.token)
        dispatch({ type: 'AUTHENTICATE', isAuthenticated: true })
      }
    })
  }
}

export const setError = (error) => {
  return (dispatch) => {
    dispatch(_error(error))
  }
}

export const setLanguage = (locale) => {
  return (dispatch) => {
    localStorage.setItem(`${STORAGE_ID}_locale`, locale)
    dispatch(setLocale(locale))
  }
}

export const getLanguage = () => {
  return (dispatch) => {
    const locale = localStorage.getItem(`${STORAGE_ID}_locale`)
    if (locale) {
      dispatch(setLocale(locale))
    }
  }
}

export const confirm = ({ token }) => {
  return (dispatch) => {
    return api({ action: 'CONFIRM', token: token }, (res) => {
      if (res && res.error) {
        dispatch(_error(res.error))
      } else if (res && res.status === 'OK.') {
        dispatch(setConfirmStatus(true))
      }
    })
  }
}

export const reset = ({ email }) => {
  return (dispatch) => {
    return api({ action: 'RESET_CREATE', email: email }, (res) => {
      if (res && res.error) {
        dispatch(_error(res.error))
      } else if (res && res.status === 'OK.') {
        dispatch(setResetStatus(true))
      }
    })
  }
}

export const confirmReset = ({ token }) => {
  return (dispatch) => {
    return api({ action: 'CONFIRM', token: token }, (res) => {
      if (res && res.error) {
        dispatch(_error(res.error))
      } else if (res && res.status === 'OK.') {
        dispatch(setResetConfirmStatus(true))
      }
    })
  }
}

export const contact = ({ name, email, message }) => {
  return (dispatch) => {
    return contactApi(name, email, message, (res) => {
      if (res && res.error) {
        dispatch(_error(res.error))
      } else if (res && res.status === 'OK.') {
        dispatch(setContactStatus(true))
      }
    })
  }
}
