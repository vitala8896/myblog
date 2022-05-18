import { CREATE_POST, CREATE_COMMENT, RESET_POST_CREATION, RESET_COMMENT_CREATION, CREATE_ANNOUNCEMENT, RESET_ANNOUNCEMENT_CREATION, DELETE_POST, RESET_POST_DELETE, RESET_COMMENT_DELETE } from './actionTypes'

export const createPost = item => ({
    type: CREATE_POST, item })

export const createComment = item => ({
    type: CREATE_COMMENT, item })

export const createAnnouncement = item => ({
    type: CREATE_ANNOUNCEMENT, item })

export const deletePost = id => ({
    type: DELETE_POST })

export const resetPostCreation = () => ({
    type: RESET_POST_CREATION })

export const resetAnnouncementCreation = () => ({
    type: RESET_ANNOUNCEMENT_CREATION })

export const resetCommentCreation = () => ({
    type: RESET_COMMENT_CREATION })

export const resetCommentDelete = () => ({
    type: RESET_COMMENT_DELETE })

export const resetPostDelete = () => ({
    type: RESET_POST_DELETE })  