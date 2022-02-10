import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import classes from './Posts.module.scss'
import { setList } from '../../store/actions/page'
import { setActivePost, fetchPostsStart, setDataUsers, setDataComments } from '../../store/actions/post'
import person from './../UI/img/person.svg'
import { NavLink } from 'react-router-dom'
import getDate from '../myHooks/getDate'
import Loader from './../UI/Loader/Loader'
import axios from './../../axios/axios-post'

const Posts = () => {
  const dispatch = useDispatch()
  const { list, loading, pageNum, pageSize } = useSelector(state => ({
    list: state.post.list,
    loading: state.post.loading,
    pageNum: state.page.pageNum,
    pageSize: state.page.pageSize
  }))
  const renderList = () => {
    return list.map((item, key) => {
      let keyItem = ((pageNum*pageSize)-pageSize+key+1)
      return (
        <div className={classes.item} key={keyItem}>
          <NavLink to={'/posts/' + keyItem} onClick={() => {
            dispatch(setActivePost(keyItem))
          }} className={classes.link}>
            <div className={classes.item__header} >
              <div className={classes.imgAndName}>
                <img src={person} alt='' />
                <p className={classes.name}>{item.name} {item.surname}</p>
              </div>
              <p>{getDate(item.create)}</p>
            </div>
            <p className={classes.title}>{item.title}</p>
            <p className={classes.body}>{item.body.substr(0, 600)}</p>
          </NavLink>
        </div>
      )
    })
  }
  useEffect(() => {
    createList()
    renderList()
  }, [pageNum])
  const createList = async () => {
    dispatch(fetchPostsStart()) 
    try {
      const responseUsers = await axios.get('/users')
      const responsePost = await axios.get(`/posts?_page=${pageNum}&_limit=${pageSize}`)
      await axios.get('/comments').then(response => {
        dispatch(setDataComments(response.data))
      })
      let arrList = []
      Object.keys(responsePost.data).forEach(key => {
        let item = responsePost.data[key]
        let userId = responsePost.data[key].userId - 1
        arrList.push({
          id: item.id,
          name: responseUsers.data[userId].firstname,
          surname: responseUsers.data[userId].lastname,
          title: item.title,
          body: item.body,
          create: item.createdAt
        })
      })
      dispatch(setDataUsers(responseUsers.data))
      dispatch(setList(arrList))
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div>
      <div className={classes.list}>
        <h1>Posts</h1>
        <div className={classes.container}>
          { loading ? <Loader /> : renderList() }
        </div>
      </div>
    </div>
  )
}
export default Posts