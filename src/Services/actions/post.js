import { FETCH_POSTS_START, FETCH_POSTS_SUCCESS, FETCH_POSTS_ERROR, SET_DATA_POSTS, SET_DATA_COMMENTS, SET_DATA_ANNOUNCEMENTS, SET_DATA_USERS, SET_LIST, POST_RETRY, SET_ACTIVE_POST, SET_ACTIVE_POST_ITEM, SET_OTHER_POSTS, SET_COMMENTS, SET_ACTIVE_ANNOUNCEMENT, SET_OTHER_ANNOUNCEMENTS, SET_ACTIVE_ANNOUNCEMENT_ITEM } from './actionTypes'


export const fetchPostsStart = () => ({
    type: FETCH_POSTS_START })

export const fetchPostsSuccess = posts => ({
    type: FETCH_POSTS_SUCCESS, posts })

export const setOtherPosts = arr => ({
    type: SET_OTHER_POSTS, arr })

export const setOtherAnnouncements = arr => ({
    type: SET_OTHER_ANNOUNCEMENTS, arr })

export const fetchPostsError = e => ({
    type: FETCH_POSTS_ERROR, error: e })
    
export const setDataUsers = users => ({
    type: SET_DATA_USERS, users })

export const setDataPosts = posts => ({
    type: SET_DATA_POSTS, posts })

export const setDataComments = com => ({
    type: SET_DATA_COMMENTS, com })

export const setDataAnnouncements = announcements => ({
    type: SET_DATA_ANNOUNCEMENTS, announcements })

export const setActivePostItem = item => ({
    type: SET_ACTIVE_POST_ITEM, item })

export const setActivePost = num => ({
    type: SET_ACTIVE_POST, num })

export const setActiveAnnouncement = num => ({
    type: SET_ACTIVE_ANNOUNCEMENT, num })

export const setActiveAnnouncementItem = item => ({
    type: SET_ACTIVE_ANNOUNCEMENT_ITEM, item })

export const setList = list => ({
    type: SET_LIST, list })

export const setComments = com => ({
    type: SET_COMMENTS, com })

export const retryPost = () => ({
    type: POST_RETRY })