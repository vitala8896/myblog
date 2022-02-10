import axios from '../../axios/axios-post'
import { CREATE_POST, CREATE_COMMENT, RESET_POST_CREATION, RESET_COMMENT_CREATION, CREATE_ANNOUNCEMENT, RESET_ANNOUNCEMENT_CREATION, DELETE_POST, RESET_POST_DELETE, RESET_COMMENT_DELETE } from './actionTypes'
import { setDataPosts, setDataAnnouncements, setDataComments, setComments } from './post'
import { setPageCount } from './page'

export function createPost(item) {
  return {
    type: CREATE_POST,
    item
  }
}
export function createComment(item) {
  return {
    type: CREATE_COMMENT,
    item
  }
}
export function createAnnouncement(item) {
  return {
    type: CREATE_ANNOUNCEMENT,
    item
  }
}
export function deletePost(id) {
  return {
    type: DELETE_POST
  }
}
export function resetPostCreation() {
  return {
    type: RESET_POST_CREATION
  }
}
export function resetAnnouncementCreation() {
  return {
    type: RESET_ANNOUNCEMENT_CREATION
  }
}
export function resetCommentCreation() {
  return {
    type: RESET_COMMENT_CREATION
  }
}
export function resetCommentDelete() {
  return {
    type: RESET_COMMENT_DELETE
  }
}
export function resetPostDelete() {
  return {
    type: RESET_POST_DELETE
  }
}
export function finishCreatePost() {
  return async (dispatch, getState) => {
    await axios.post('/posts', getState().create.post)
    dispatch(resetPostCreation())
  }
}
export function finishCreateAnnouncement() {
  return async (dispatch, getState) => {
    await axios.post('/announcements', getState().create.announcement)
    dispatch(resetAnnouncementCreation())
  }
}
export function finishUpdatePost(id) {
  return async (dispatch, getState) => {
    try {
      await axios.patch(`/posts/` + id, getState().create.post)
      dispatch(resetPostCreation())
    } catch (e) {
      console.log(e)
    }
    
  }
}
export function finishUpdateAnnouncement(id) {
  console.log(id)
  return async (dispatch, getState) => {
    try {
      await axios.patch(`/announcements/` + id, getState().create.announcement)
      dispatch(resetAnnouncementCreation())
    } catch (e) {
      console.log(e)
    }
  }
}
export function finishCreateComment(activePost) {
  return async (dispatch, getState) => {
    await axios.post('/comments', getState().create.comment)
    dispatch(resetCommentCreation())
    await axios.get('/comments').then(response => {
      dispatch(setDataComments(response.data))
    })
    const comments = await axios.get(`/comments?postId=${activePost}&_sort=createdAt&_order=desc`)
    let com = comments.data
    dispatch(setComments(com))
  }
}
export function finishDeletePost(id) {
  return async dispatch => {
    await axios.delete('/posts/' + id)
    dispatch(resetPostDelete())
    await axios.get('/posts').then(response => {
      dispatch(setDataPosts(response.data))
      const pageCount = Math.ceil(response.data.length / 20)
      dispatch(setPageCount(pageCount))
    })
  }
}
export function finishDeleteComment(id, activePost) {
  return async dispatch => {
    await axios.delete('/comments/' + id)
    dispatch(resetCommentDelete())
    await axios.get('/comments').then(response => {
      dispatch(setDataComments(response.data))
    })
    const comments = await axios.get(`/comments?postId=${activePost}&_sort=createdAt&_order=desc`)
    let com = comments.data
    dispatch(setComments(com))
  }
}
export function finishDeleteAnnouncement(id) {
  return async dispatch => {
    await axios.delete('/announcements/' + id)
    await axios.get('/announcements').then(response => {
      dispatch(setDataAnnouncements(response.data))
    })
  }
}