import axios from '../../axios/axios-post'
import { resetCommentCreation, resetCommentDelete } from '../../store/createSlice'
import { setReduxAnnouncements, setReduxComments, setReduxPosts, resetPostCreation } from '../../store/postSlice'
import { setReduxUsers } from '../../store/userSlice'
import { getReduxPosts } from './post'
import { setReduxPageCount } from '../../store/postSlice'
import { resetPostDelete, resetAnnouncementCreation } from '../../store/createSlice'

export const finishCreatePost = () => {
  return async (dispatch, getState) => {
    await axios.post('/posts', getState().create.post)
    dispatch(resetPostCreation())
    dispatch(getReduxPosts())
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
      dispatch(getReduxPosts())
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
    await axios.get(`/comments?postId=${activePost}&_sort=createdAt&_order=desc`).then(response => {
      dispatch(setReduxComments(response.data))
    })    
  }
}
export const finishDeletePost = (id, pageNum, pageSize) => {
  return async dispatch => {
    await axios.delete('/posts/' + id)
    dispatch(resetPostDelete())
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
  }
}
export const finishDeleteComment = (id, activePost) => {
  return async dispatch => {
    await axios.delete('/comments/' + id)
    dispatch(resetCommentDelete())
    // await axios.get('/comments').then(response => {
    //   dispatch(setReduxComments(response.data))
    // })
    await axios.get(`/comments?postId=${activePost}&_sort=createdAt&_order=desc`).then(response => {
      dispatch(setReduxComments(response.data))
    })    
  }
}
export const finishDeleteAnnouncement = id => {
  return async dispatch => {
    await axios.delete('/announcements/' + id)
    await axios.get('/announcements').then(response => {
      dispatch(setReduxAnnouncements(response.data))
    })
  }
}