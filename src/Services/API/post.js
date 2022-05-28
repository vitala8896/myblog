import axios from '../../axios/axios-post'
import { fetchPostsStart, setReduxUsers, setReduxPosts } from '../../store/postsSlice'
import { setReduxPageCount } from '../../store/pageSlice'

export const getReduxPosts = (pageNum, pageSize) => {  
  return async dispatch => {
    dispatch(fetchPostsStart())
    try {
      await axios.get(`/posts?_page=${pageNum}&_limit=${pageSize}&_sort=id&_order=desc`)
      .then((response) => {
        dispatch(setReduxPosts(response.data))
        let pages = Math.ceil(response.headers['x-total-count'] / pageSize)
        let pagesArray = []
        for (let i = 1; i <= pages; i++) {
          pagesArray.push(i);
        }
        dispatch(setReduxPageCount(pagesArray))
      })      
      await axios.get('/users').then(response => {
        dispatch(setReduxUsers(response.data))
      })     
    } catch (e) {
      console.log(e)
    }
  }
}
export const getReduxUsers = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/users')
      const users = response.data
      dispatch(setReduxUsers(users))
    } catch (e) {
      console.log(e)
    }
  }
}