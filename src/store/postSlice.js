import { createSlice } from '@reduxjs/toolkit'

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: {
      posts: [],
      activePost: 0,
      activePostItem: {},
     },
     announcements: {
      announcements: [],
      activeAnnouncement: 0,
      activeAnnouncementItem: {},
    },
     pagination: {
      list: [], 
      pageNum: 1,
      pageSize: 20,
      pageCount: [1], 
     },             
    comments: [],    
    loading: false,
    error: null,
    isFinished: false, 
    avatarURL: 'https://s0.tchkcdn.com/i/1/1/80937_1802c6cf_1260804286_avatar_1940.jpg'
  },
  reducers: {
    fetchPostsStart: state => {
      state.loading = true 
    }, 
    setReduxPosts: (state, event) => {
      state.posts.posts = event.payload
      state.loading = false   
    },  
    setReduxList: (state, event) => {
      state.pagination.list = event.payload
    },  
    setReduxActivePost: (state, event) => {
      state.posts.activePost = event.payload
    },  
    setReduxActivePostItem: (state, event) => {
      state.posts.activePostItem = event.payload
    },  
    setReduxAnnouncements: (state, event) => {
      state.announcements.announcements = event.payload
      state.loading = false 
    },  
    setReduxActiveAnnouncement: (state, event) => {
      state.announcements.activeAnnouncement = event.payload
    },   
    setReduxActiveAnnouncementItem: (state, event) => {
      state.announcements.activeAnnouncementItem = event.payload
    },
    setReduxComments: (state, event) => {
      state.comments = event.payload  
    },
    resetPostCreation: state => {
      state.post = {}   
    },
    setReduxPageCount: (state, event) => {
      state.pagination.pageCount = event.payload;   
    },   
    setReduxPageNum: (state, event) => {
      state.pagination.pageNum = event.payload;   
    },
  },
})

export const { fetchPostsStart, setReduxPosts, setReduxList, setReduxActivePost, setReduxActivePostItem, setReduxAnnouncements, setReduxActiveAnnouncement, setReduxActiveAnnouncementItem, setReduxComments, resetPostCreation, setReduxPageCount, setReduxPageNum } = postSlice.actions

export default postSlice.reducer