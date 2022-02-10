import { PAGE_NUM, PAGE_SIZE, PAGE_COUNT, GET_AVATAR,SET_LIST } from './actionTypes'
import axios from './../../axios/axios-post'
import { setDataPosts } from './post'

export function rerenderNumPage() {
  return async dispatch => {
    axios.get('/posts').then(response => {
      dispatch(setDataPosts(response.data))
      const pageCount = Math.ceil(response.data.length / pageSize)
      dispatch(setPageCount(pageCount))
    })
  }
}
export function setPageNum(num) {
  return {
    type: PAGE_NUM, num
  }
}
export function pageSize(pageSize) {
  return {
    type: PAGE_SIZE, pageSize
  }
}
export function setList(list) {
  return {
    type: SET_LIST, list
  }
}
export function setPageCount(pageCount) {
  return {
    type: PAGE_COUNT, pageCount
  }
}
export function getAvatar(url) {
  return {
    type: GET_AVATAR, url
  }
}