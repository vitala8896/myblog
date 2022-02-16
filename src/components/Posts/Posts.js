import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import classes from './../../Assets/Styles/Posts/Posts.module.scss'
import { setList } from '../../Services/actions/page'
import { setActivePost, fetchPostsStart } from '../../Services/actions/post'
import person from './../../Assets/Images/person.svg'
import { NavLink } from 'react-router-dom'
import getDate from '../myHooks/getDate'
import Loader from './../UI/Loader/Loader'

const Posts = () => {
  const dispatch = useDispatch()
  const { list, loading, pageNum, pageSize, posts, users } = useSelector(state => ({
    list: state.post.list,
    loading: state.post.loading,
    pageNum: state.page.pageNum,
    pageSize: state.page.pageSize,
    posts: state.post.posts,
    users: state.post.users

  }))  
  useEffect(() => {
    createList()
    renderList()
  }, [posts, users, pageNum])
  const createList = async () => {
    dispatch(fetchPostsStart())
      let arrList = [] 
      let start = (pageNum*pageSize)-pageSize 
      let end = pageNum*pageSize 
      posts.slice(start,end).forEach((item,key) => {
        let userId = posts[start+key].userId - 1
        arrList.push({
          id: item.id,
          name: users[userId].firstname,
          surname: users[userId].lastname,
          title: item.title,
          body: item.body,
          create: item.createdAt
        })
      })           
      dispatch(setList(arrList))
  }
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
            <p className={classes.body}>{item.body.substr(0, 230)+'...'}</p>
          </NavLink>
        </div>
      )
    })
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