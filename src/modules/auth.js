import Cookies from 'js-cookie'

import { COOKIE_ID } from '../config'
import api from '../app/utils/api'

export const AUTHENTICATE = 'auth/AUTHENTICATE'
export const SET_CURRENT_USER = 'auth/SET_CURRENT_USER'

const initialState = {
  isAuthenticated: false,
  currentUser: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        isAuthenticated: action.authenticated
      }

    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.user
      }

    default:
      return state
  }
}

export const setCurrentUser = (user) => (dispatch) =>
  new Promise((resolve) => {
    dispatch({
      type: SET_CURRENT_USER,
      user
    })

    Cookies.set(COOKIE_ID, user)

    dispatch({
      type: AUTHENTICATE,
      authenticated: true
    })

    resolve(user)
  })

export const getUser = () => (dispatch) =>
  new Promise(resolve => {
    let userFromCookie = Cookies.getJSON(COOKIE_ID)

    if (userFromCookie) {
      dispatch(setCurrentUser(userFromCookie))
      resolve(userFromCookie)
    } else {
      resolve({})
    }
  })

export const signinUser = (email, password) => (dispatch) =>
  new Promise((resolve, reject) => {
    const user = {
      email,
      password,
      name: 'Awesome User'
    }

    dispatch(setCurrentUser(user))
    resolve(user)
  })

export const signupUser = (email, password, tosAgreement) => (dispatch) =>
  new Promise((resolve, reject) => {
    api({ action: 'USER_CREATE', email, password, tosAgreement }, (res) => {
      if (res && res.error) {
        /*
        this.props.history.push({
          pathname: '/signup',
          state: { error: res.error }
        })
        */
        dispatch({
          type: SET_CURRENT_USER,
          user: {}
        })
        resolve({})
      } else if (res && res.status === 'OK.') {
        dispatch({
          type: SET_CURRENT_USER,
          user: {}
        })
        resolve({})
      }
    })
  })

export const signoutUser = () => (dispatch) => 
  new Promise((resolve) => {
    dispatch({
      type: AUTHENTICATE,
      authenticated: false
    })

    dispatch({
      type: SET_CURRENT_USER,
      user: {}
    })

    Cookies.remove(COOKIE_ID)
    resolve({})
  })
