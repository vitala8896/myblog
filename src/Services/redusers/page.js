import { PAGE_NUM, PAGE_SIZE, GET_AVATAR, PAGE_COUNT } from './../actions/actionTypes'

const initialState = {
  pageNum: 1,
  pageCount: 1,
  pageSize: 20,  
  avatarURL: 'https://s0.tchkcdn.com/i/1/1/80937_1802c6cf_1260804286_avatar_1940.jpg'
}
export default function pageReducer(state = initialState, action) {
  switch (action.type) {
    case PAGE_NUM:
      return {
        ...state,
        pageNum: action.num
      }
      case PAGE_COUNT:
        return {
          ...state,
          pageCount: action.pageCount
        }
    case PAGE_SIZE:
        return {
          ...state,
          pageSize: action.pageSize
      }
      case GET_AVATAR:
        return {
          ...state,
          getAvatar: action.avatarURL
        }
    default:
      return state
  }
}