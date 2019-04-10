import Cookies from 'js-cookie'

import { COOKIE_ID } from '../config'

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
