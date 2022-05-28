import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './postsSlice'
import pageReducer from './pageSlice'
import authReducer from './authSlice'
import createReducer from './createSlice'

export default configureStore({
  reducer: {
    post: postsReducer,
    page: pageReducer,
    create: createReducer,
    auth: authReducer,    
  }
})