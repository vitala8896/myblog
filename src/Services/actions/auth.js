import { AUTH_SUCCESS, AUTH_LOGOUT } from './actionTypes'
import axios from './../../axios/axios-post'

export function authRegister(email, password, firstname, lastname, age, avatar) {
  return async dispatch => {
    let authData = { email, password, firstname, lastname, age, avatar }
    let url = '/register'
    const response = await axios.post(url, authData)
    const data = response.data
    const expirationDate = new Date(new Date().getTime() + 100000 * 200)
    localStorage.setItem('token', data.accessToken)
    localStorage.setItem('userId', data.user.id)
    localStorage.setItem('expirationDate', expirationDate)
    dispatch(authSuccess(data.accessToken))
  }
}
export function authLogin(email, password) {
  return async dispatch => {
    let authData = { email, password }
    let url = '/login'
    const response = await axios.post(url, authData)
    const data = response.data
    const expirationDate = new Date(new Date().getTime() + 100000 * 200)
    localStorage.setItem('token', data.accessToken)
    localStorage.setItem('userId', data.user.id)
    localStorage.setItem('expirationDate', expirationDate)
    dispatch(authSuccess(data.accessToken))
  }
}
export function autoLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, time * 1000)
  }
}
export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
  return {
    type: AUTH_LOGOUT
  }
}
export function autoLogin() {
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
export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token
  }
}