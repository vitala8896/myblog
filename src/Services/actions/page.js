import { PAGE_NUM, PAGE_SIZE, PAGE_COUNT, GET_AVATAR, SET_LIST } from './actionTypes'


export const setPageNum = num => ({
    type: PAGE_NUM, num })

export const pageSize = pageSize => ({
    type: PAGE_SIZE, pageSize })
    
export const setList = list => ({
    type: SET_LIST, list })

export const setPageCount = pageCount => ({
    type: PAGE_COUNT, pageCount })

export const getAvatar = url => ({
    type: GET_AVATAR, url })