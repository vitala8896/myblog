import { createSlice } from '@reduxjs/toolkit'

export const postsSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    list: [],    
    activePost: 0,
    activePostItem: {},
    activeAnnouncementItem: {},
    activeAnnouncement: 0,
    post: null,    
    users: [],
    comments: [],
    announcements: [],
    loading: false,
    error: null,
    isFinished: false
  },
  reducers: {
    fetchPostsStart: state => {
      state.loading = true 
    }, 
    setReduxPosts: (state, event) => {
      state.posts = event.payload
      state.loading = false   
    },  
    setReduxUsers: (state, event) => {
      state.users = event.payload;   
    },
    setReduxList: (state, event) => {
      state.list = event.payload
    },  
    setReduxActivePost: (state, event) => {
      state.activePost = event.payload
    },  
    setReduxActivePostItem: (state, event) => {
      state.activePostItem = event.payload
    },  
    setReduxAnnouncements: (state, event) => {
      state.announcements = event.payload
      state.loading = false 
    },  
    setReduxActiveAnnouncement: (state, event) => {
      state.activeAnnouncement = event.payload
    },   
    setReduxActiveAnnouncementItem: (state, event) => {
      state.activeAnnouncementItem = event.payload
    },
    setReduxComments: (state, event) => {
      state.comments = event.payload  
    },
    resetPostCreation: state => {
      state.post = {}   
    },
  },
})

export const { fetchPostsStart, setReduxPosts, setReduxUsers, setReduxList, setReduxActivePost, setReduxActivePostItem, setReduxAnnouncements, setReduxActiveAnnouncement, setReduxActiveAnnouncementItem, setReduxComments, resetPostCreation } = postsSlice.actions

export default postsSlice.reducer