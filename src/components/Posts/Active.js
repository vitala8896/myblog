import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import classes from './../../Assets/Styles/Posts/Active.module.scss'
import { NavLink, useHistory } from 'react-router-dom'
import { setOtherPosts, setComments } from "../../Services/actions/post"
import OtherPosts from './Other'
import Comments from '../Comments/Comments'
import axios from '../../axios/axios-post'
import { setPageNum } from '../../Services/actions/page'
import { finishDeletePost } from './../../Services/actions/create'

const ActivePost = () => {
  const dispatch = useDispatch()
  let history = useHistory()
  const { index, posts, users, activePost } =
  useSelector(state => ({
    index: state.post.activePost - 1,
    posts: state.post.posts,
    users: state.post.users,
    activePost: state.post.activePost
  }))
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
  useEffect(() => {
    getOtherPosts()
  }, [activePost])
  return (
    <div className={classes.activePost}>
      <div className={classes.container}>
        <div className={classes.header}>
          <NavLink to={'/'} onClick={() => {
            dispatch(setPageNum(1))
          }} className={classes.link}>
            <p className={classes.name}>{users[posts[index].userId - 1].firstname} {users[posts[index].userId - 1].lastname}</p>
          </NavLink>
          {isAuth() &&
            <span className="material-icons" onClick={() => { history.push(`/posts/${activePost}/edit`) }}>edit</span>
          }
        </div>
        <h1>{posts[index].title}</h1>
        <p className={classes.body}>{posts[index].body}</p>
        {isAuth() &&
          <div className={classes.dell}>
            <span className={"material-icons"} onClick={() => isOtherPosts()}>delete</span>
          </div>
        }
      </div>
      <Comments />
      <OtherPosts />
    </div>
  )
}
export default ActivePost