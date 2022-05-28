import { createSlice } from '@reduxjs/toolkit'

export const pageSlice = createSlice({
  name: 'page',
  initialState: {
    pageNum: 1,
    pageCount: [1],
    pageSize: 20,  
    avatarURL: 'https://s0.tchkcdn.com/i/1/1/80937_1802c6cf_1260804286_avatar_1940.jpg'
  },
  reducers: {
    setReduxPageCount: (state, event) => {
      state.pageCount = event.payload;   
    },   
    setReduxPageNum: (state, event) => {
      state.pageNum = event.payload;   
    },
  },
})

export const { setReduxPageCount, setReduxPageNum } = pageSlice.actions

export default pageSlice.reducer