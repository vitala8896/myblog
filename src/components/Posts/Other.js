import { useEffect } from 'react'
import classes from './../../Assets/Styles/Posts/Other.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setActivePost } from '../../Services/actions/post'

const OtherPosts = () => {
  const dispatch = useDispatch()
  const { index, posts, users, otherPosts, activePost } =
    useSelector(state => ({
      index: state.post.activePost - 1,
      posts: state.post.posts,
      users: state.post.users,
      otherPosts: state.post.otherPosts,
      activePost: state.post.activePost

    }))
  useEffect(() => {
    renderOtherPosts()
  })
  const getIndex = () => {
    return (posts.length - activePost)
  }
  const renderOtherPosts = () => {
    return otherPosts.map(item => {
      return <NavLink to={'/posts/' + item.key} onClick={() => {
        dispatch(setActivePost(item.key))
      }} className={classes.otherPosts} key={item.key}>
        <p className={classes.name}>{users[posts[getIndex()].userId - 1].firstname} {users[posts[getIndex()].userId - 1].lastname}</p>
        <h5>{item.title}</h5>
      </NavLink>
    })
  }
  return (
    <div className={classes.otherWrapper}>
      {renderOtherPosts()}
    </div>
  )
}
export default OtherPosts