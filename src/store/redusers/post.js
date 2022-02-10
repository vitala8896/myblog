import {
  FETCH_POSTS_START, FETCH_POSTS_SUCCESS,
  POST_SET_STATE, POST_RETRY, SET_DATA_POSTS, SET_DATA_COMMENTS, SET_LIST,
  SET_DATA_USERS, SET_ACTIVE_POST, SET_OTHER_POSTS, SET_COMMENTS, SET_DATA_ANNOUNCEMENTS, SET_ACTIVE_ANNOUNCEMENT, SET_OTHER_ANNOUNCEMENTS
} from './../actions/actionTypes'

const initialState = {
  list: [],
  activePost: 0,
  activeAnnouncement: 0,
  otherPosts: [],
  otherAnnouncements: [],
  post: null,
  posts: [],
  users: [],
  comments: [],
  announcements: [],
  loading: false,
  error: null,
  isFinished: false
}
export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS_START:
      return {
        ...state, loading: true
      }
    case FETCH_POSTS_SUCCESS:
      return {
        ...state, error: action.post
      }
    case POST_SET_STATE:
      return {
        ...state, answerState: action.answerState
      }
    case SET_DATA_POSTS:
      return {
        ...state, posts: action.posts
      }
    case SET_DATA_COMMENTS:
      return {
        ...state, comments: action.com
      }
    case SET_DATA_ANNOUNCEMENTS:
      return {
        ...state, announcements: action.announcements, loading: false
      }
    case SET_DATA_USERS:
      return {
        ...state, users: action.users
      }
    case SET_LIST:
      return {
        ...state, list: action.list, loading: false
      }
    case SET_ACTIVE_POST:
      return {
        ...state, activePost: action.num, loading: false
      }
    case SET_ACTIVE_ANNOUNCEMENT:
      return {
        ...state, activeAnnouncement: action.num
      }
    case SET_OTHER_POSTS:
      return {
        ...state, otherPosts: action.arr
      }
    case SET_OTHER_ANNOUNCEMENTS:
      return {
        ...state, otherAnnouncements: action.arr
      }
    case SET_COMMENTS:
      return {
        ...state, comments: action.com
      }
    case POST_RETRY:
      return {
        ...state, isFinished: false, results: {}
      }
    default:
      return state
  }
}