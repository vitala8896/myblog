import { configureStore } from '@reduxjs/toolkit'
import postReducer from './postSlice'
import authReducer from './authSlice'
import createReducer from './createSlice'
import userReducer from './userSlice'

export default configureStore({
  reducer: {
    post: postReducer,
    create: createReducer,
    auth: authReducer,    
    user: userReducer,    
  }
})