import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import auth from './auth'
import profile from './profile'
import error from './error'

export default combineReducers({
  auth,
  profile,
  form,
  error
})
