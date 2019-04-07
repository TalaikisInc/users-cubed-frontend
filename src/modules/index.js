import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import auth from './auth'
import profile from './profile'

export default combineReducers({
  auth,
  profile,
  form
})
