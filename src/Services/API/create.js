import axios from '../../axios/axios-post'
import { resetPostCreation, resetAnnouncementCreation, resetCommentCreation, resetPostDelete, resetCommentDelete } from '../actions/create'
import { setDataComments, setComments, setDataPosts, setDataUsers, setDataAnnouncements } from '../actions/post'
import { setPageCount } from './../actions/page'
import { getDataPosts } from './post'

export const finishCreatePost = () => {
  return async (dispatch, getState) => {
    await axios.post('/posts', getState().create.post)
    dispatch(resetPostCreation())
    dispatch(getDataPosts())
  }
}
export const finishCreateAnnouncement = () => {
  return async (dispatch, getState) => {
    await axios.post('/announcements', getState().create.announcement)
    dispatch(resetAnnouncementCreation())
  }
}
export const finishUpdatePost = id => {
  return async (dispatch, getState) => {
    try {
      await axios.patch(`/posts/` + id, getState().create.post)
      dispatch(resetPostCreation())
      dispatch(getDataPosts(1, 20))
    } catch (e) {
      console.log(e)
    }    
  }
}
export const finishUpdateAnnouncement = id => {
  return async (dispatch, getState) => {
    try {
      await axios.patch(`/announcements/` + id, getState().create.announcement)
      dispatch(resetAnnouncementCreation())
    } catch (e) {
      console.log(e)
    }
  }
}
export const finishCreateComment = activePost => {
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
export const finishDeletePost = (id, pageNum, pageSize) => {
  return async dispatch => {
    await axios.delete('/posts/' + id)
    dispatch(resetPostDelete())
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
  }
}
export const finishDeleteComment = (id, activePost) => {
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
export const finishDeleteAnnouncement = id => {
  return async dispatch => {
    await axios.delete('/announcements/' + id)
    await axios.get('/announcements').then(response => {
      dispatch(setDataAnnouncements(response.data))
    })
  }
}