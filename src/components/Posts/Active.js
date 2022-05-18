import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import classes from './../../Assets/Styles/Posts/Active.module.scss'
import { NavLink, useHistory } from 'react-router-dom'
import { setActivePostItem, setActivePost, setDataUsers } from "../../Services/actions/post"
import Comments from '../Comments/Comments'
import axios from '../../axios/axios-post'
import { setPageNum } from '../../Services/actions/page'
import { finishDeletePost } from '../../Services/API/create'

const ActivePost = () => {
  const dispatch = useDispatch()
  let history = useHistory()
  const { users, activePost, activePostItem, pageNum, pageSize } =
  useSelector(state => ({
    users: state.post.users,
    activePost: state.post.activePost,
    activePostItem: state.post.activePostItem,
    pageNum: state.page.pageNum,
    pageSize: state.page.pageSize
  }))
  useEffect( async () => {    
    const setURL = () => {
      let numURL = +history.location.pathname.replace('/posts/', '')
      dispatch(setActivePost(numURL))
      return numURL
    } 
    let thisURL = activePost === 0? setURL() : activePost   
    try {
      await axios.get('/users').then(response => {
        dispatch(setDataUsers(response.data))
      })
      await axios.get(`/posts/${thisURL}`).then(response => {
        dispatch(setActivePost(response.data.id))
        dispatch(setActivePostItem(response.data))
      }) 
    } catch (e) {
      console.log(e)
    }
  }, [])
  
  const dellPost = () => {    
    dispatch(finishDeletePost(activePost, pageNum, pageSize))
    dispatch(setPageNum(1))
    return history.push('/')
  }
  const isAuth = () => {
    return users[activePostItem.userId-1].id === +localStorage.getItem('userId')
  }  
  const render = () => {
    if (activePostItem.id && users?.length) {
      return  <div className={classes.container}>
        <div className={classes.header}>
          <NavLink to={'/'} onClick={() => {
            dispatch(setPageNum(1))
          }} className={classes.link}>
            <p className={classes.name}> {users[activePostItem.userId-1].firstname} {users[activePostItem.userId-1].lastname}</p>
          </NavLink>
          {isAuth() &&
            <span className="material-icons" onClick={() => { history.push(`/posts/${activePost}/edit`) }}>edit</span>
          }
        </div>
        <h1>{activePostItem.title}</h1>
        <p className={classes.body}>{activePostItem.body}</p>
        {isAuth() &&
          <div className={classes.dell}>
            <span className={"material-icons"} onClick={() => dellPost()}>delete</span>
          </div>
        }
      </div>
    }    
  }
  return (
    <div className={classes.activePost}>
      {render()}
      <Comments />
    </div>
  )
}
export default ActivePost