import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import classes from './../../Assets/Styles/Posts/Edit.module.scss'
import { NavLink, useHistory } from 'react-router-dom'
import { setPageNum } from '../../Services/actions/page'
import { createPost } from './../../Services/actions/create'
import { finishDeletePost, finishUpdatePost } from '../../Services/API/create'

const Edit = () => {
  const dispatch = useDispatch()  
  let history = useHistory()
  const { activePostItem } =
    useSelector(state => ({
      activePostItem: state.post.activePostItem,
    }))
  const [title, setTitle] = useState(activePostItem.title)
  const [body, setBody] = useState(activePostItem.body)  
  const isOtherPosts = () => {
    dispatch(finishDeletePost(activePostItem.id))
    dispatch(setPageNum(1))
    return history.push('/')
  }
  const isAuth = () => {
    return activePostItem.userId === +localStorage.getItem('userId')
  }
  const titleHandle = e => {
    let val = e.target.value
    setTitle(val)
  }
  const bodyHandle = e => {
    let val = e.target.value
    setBody(val)
  }
  const getItem = () => {
    let postItem = {
      title, body,
      userId: +localStorage.getItem('userId'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date(new Date().getTime() + (2 * 365 * 3600 * 24 * 1000)).toISOString()
    }
    dispatch(createPost(postItem))
  }
  return (
    <div className={classes.editPost}>
      <div className={classes.container}>
        <div className={classes.header}>
          <NavLink to={'/'} onClick={() => {
            dispatch(setPageNum(1))
          }} className={classes.link}>
            <p className={classes.name}>{activePostItem.userId.firstname} {activePostItem.userId.lastname}</p>
          </NavLink>
          {isAuth() &&
            <span className="material-icons" onClick={() => {
            getItem()
            dispatch(finishUpdatePost(activePostItem.id))
            history.push('/')
            }}>done_all</span>
          }
        </div>
        <h1><input value={title} onChange={e => { titleHandle(e) }}/></h1>
        <textarea className={classes.body} value={body} onChange={e => { bodyHandle(e) }}/>
        {isAuth() &&
          <div className={classes.dell}>
            <span className={"material-icons"} onClick={() => isOtherPosts()}>delete</span>
          </div>
        }
      </div>
    </div>
  )
}
export default Edit