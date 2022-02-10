import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import classes from './Edit.module.scss'
import { NavLink, useHistory } from 'react-router-dom'
import { setOtherPosts, setComments } from "../../store/actions/post"
import axios from '../../axios/axios-post'
import { setPageNum } from '../../store/actions/page'
import { createPost, finishDeletePost, finishUpdatePost } from './../../store/actions/create';

const Edit = () => {
  const dispatch = useDispatch()
  
  let history = useHistory()
  const { index, posts, users, activePost } =
    useSelector((state) => ({
      index: state.post.activePost - 1,
      posts: state.post.posts,
      users: state.post.users,
      activePost: state.post.activePost
    }))
  console.log(activePost)
  const [title, setTitle] = useState(posts[index].title)
  const [body, setBody] = useState(posts[index].body)
  const getOtherPosts = () => {
    let arr = []
    posts.forEach((item, key) => {
      let itemThis = {
        id: item.id,
        title: item.title,
        body: item.body,
        userId: item.userId,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        key: key + 1
      }
      if (item.userId === posts[activePost - 1].userId && key + 1 !== activePost) {
        arr.push(itemThis)
      }
    })
    dispatch(setOtherPosts(arr))
    getActiveComments()
  }
  const getActiveComments = async () => {
    try {
      const comments = await axios.get(`/comments?postId=${activePost}&_sort=createdAt&_order=desc`)
      let com = comments.data
      dispatch(setComments(com))
    } catch (e) {
      console.log(e)
    }
  }
  const isOtherPosts = () => {
    dispatch(finishDeletePost(posts[index].id))
    dispatch(setPageNum(1))
    return history.push('/')
  }
  const isAuth = () => {
    return users[posts[index].userId - 1].id === +localStorage.getItem('userId')
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
  useEffect(() => {
    getOtherPosts()
  }, [])
  return (
    <div className={classes.editPost}>
      <div className={classes.container}>
        <div className={classes.header}>
          <NavLink to={'/'} onClick={() => {
            dispatch(setPageNum(1))
          }} className={classes.link}>
            <p className={classes.name}>{users[posts[index].userId - 1].firstname} {users[posts[index].userId - 1].lastname}</p>
          </NavLink>
          {isAuth() &&
            <span className="material-icons" onClick={() => {
            getItem()
            dispatch(finishUpdatePost(activePost))
            dispatch(setPageNum(1))
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