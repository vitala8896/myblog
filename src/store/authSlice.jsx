import { createSlice } from '@reduxjs/toolkit'

export const autoLogin = () => {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token))
        dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}
export const autoLogout = time => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, time * 1000)
  }
}
export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
  return authLogout()
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null, 
    user: {}
  },
  reducers: {
    authSuccess: (state, event) => {
      state.token = event.payload;   
    },
    authLogout: state => {
      state.token = null   
    },
    setReduxUser: (state, event) => {
      state.user = event.payload;   
    },
  },
})

export const { 
  authSuccess, 
  authLogout,
  setReduxUser
 } = authSlice.actions

export default authSlice.reducer