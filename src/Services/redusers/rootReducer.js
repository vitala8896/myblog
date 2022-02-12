import { combineReducers } from 'redux'
import postReducer from './post'
import createReducer from './create'
import authReducer from './auth'
import pageReducer from './page'

export default combineReducers({
  post: postReducer,
  create: createReducer,
  auth: authReducer,
  page: pageReducer
})