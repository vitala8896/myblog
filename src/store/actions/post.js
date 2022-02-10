import axios from '../../axios/axios-post'
import { FETCH_POSTS_START, FETCH_POSTS_SUCCESS, FETCH_POSTS_ERROR, SET_DATA_POSTS, SET_DATA_COMMENTS, SET_DATA_ANNOUNCEMENTS,  SET_DATA_USERS, SET_LIST, POST_RETRY, SET_ACTIVE_POST, SET_OTHER_POSTS, SET_COMMENTS, SET_ACTIVE_ANNOUNCEMENT,
  SET_OTHER_ANNOUNCEMENTS} from './actionTypes'

export function fetchPostById(postId) {
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
export function fetchPostsStart() {
  return {
    type: FETCH_POSTS_START
  }
}
export function fetchPostsSuccess(posts) {
  return {
    type: FETCH_POSTS_SUCCESS,
    posts
  }
}
export function setOtherPosts(arr) {
  return {
    type: SET_OTHER_POSTS,
    arr
  }
}
export function setOtherAnnouncements(arr) {
  return {
    type: SET_OTHER_ANNOUNCEMENTS,
    arr
  }
}
export function fetchPostsError(e) {
  return {
    type: FETCH_POSTS_ERROR,
    error: e
  }
}
export function getDataPosts() {
  return async dispatch => {
    try {
      const response = await axios.get('/posts')
      const posts = response.data
      dispatch(setDataPosts(posts))
    } catch (e) {
      console.log(e)
    }
  }
}
export function getDataUsers() {
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
export function setDataUsers(users) {
  return {
    type: SET_DATA_USERS,
    users
  }
}
export function setDataPosts(posts) {
  return {
    type: SET_DATA_POSTS,
    posts
  }
}
export function setDataComments(com) {
  return {
    type: SET_DATA_COMMENTS,
    com
  }
}
export function setDataAnnouncements(announcements) {
  return {
    type: SET_DATA_ANNOUNCEMENTS,
    announcements
  }
}
export function setActivePost(num) {
  return {
    type: SET_ACTIVE_POST,
    num
  }
}
export function setActiveAnnouncement(num) {
  return {
    type: SET_ACTIVE_ANNOUNCEMENT,
    num
  }
}
export function setList(list) {
  return {
    type: SET_LIST,
    list
  }
}
export function setComments(com) {
  return {
    type: SET_COMMENTS,
    com
  }
}
export function retryPost() {
  return {
    type: POST_RETRY
  }
}