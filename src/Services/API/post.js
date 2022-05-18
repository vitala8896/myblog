import axios from '../../axios/axios-post'
import { fetchPostsStart, fetchPostsSuccess, fetchPostsError, setDataPosts, setDataUsers } from '../actions/post'
import { setPageCount } from '../actions/page'

export const fetchPostById = postId => {
  return async dispatch => {
    dispatch(fetchPostsStart())
    try {
      const response = await axios.get(`/posts/${postId}`)
      const post = response.data
      dispatch(fetchPostsSuccess(post))
    } catch (e) {
      dispatch(fetchPostsError(e))
    }
  }
}
export const getDataPosts = (pageNum, pageSize) => {  
  return async dispatch => {
    dispatch(fetchPostsStart())
    try {
      await axios.get(`/posts?_page=${pageNum}&_limit=${pageSize}&_sort=id&_order=desc`)
      .then((response) => {
        dispatch(setDataPosts(response.data))
        let pages = Math.ceil(response.headers['x-total-count'] / pageSize)
        let pagesArray = []
        for (let i = 1; i <= pages; i++) {
          pagesArray.push(i);
        }
        dispatch(setPageCount(pagesArray))
      })      
      await axios.get('/users').then(response => {
        dispatch(setDataUsers(response.data))
      })     
    } catch (e) {
      console.log(e)
    }
  }
}
export const getDataUsers = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/users')
      const users = response.data
      dispatch(setDataUsers(users))
    } catch (e) {
      console.log(e)
    }
  }
}