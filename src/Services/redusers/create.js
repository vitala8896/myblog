import { CREATE_POST, CREATE_COMMENT, CREATE_ANNOUNCEMENT, RESET_POST_CREATION, RESET_COMMENT_CREATION, RESET_ANNOUNCEMENT_CREATION } from '../actions/actionTypes'

const initialState = {
  post: {},
  announcement: {},
  comment: {},
}

export default function createReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_POST:
      return {
        ...state,
        post: action.item
      }
    case CREATE_COMMENT:
      return {
        ...state,
        comment: action.item
      }
    case CREATE_ANNOUNCEMENT:
      return {
        ...state,
        announcement: action.item
      }
    case RESET_POST_CREATION:
      return {
        ...state, post: {}
      }
    case RESET_COMMENT_CREATION:
      return {
        ...state, comment: {}
      }
    case RESET_ANNOUNCEMENT_CREATION:
      return {
        ...state, announcement: {}
      }
    default:
      return state
  }
}