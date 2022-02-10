import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import classes from './Active.module.scss'
import { NavLink, useHistory } from 'react-router-dom'
import { setOtherAnnouncements } from '../../store/actions/post'
import OtherAnnouncements from './Other'
import { finishDeleteAnnouncement } from '../../store/actions/create'

const ActiveAnnouncement = () => {
  const dispatch = useDispatch()
  let history = useHistory()
  const { index, announcements, activeAnnouncement, posts, users } =
    useSelector((state) => ({
      index: state.post.activeAnnouncement - 1,
      announcements: state.post.announcements,
      activeAnnouncement: state.post.activeAnnouncement,
      posts: state.post.posts,
      users: state.post.users
    }))
  const renderOtherAnnouncements = () => {
    let arr = []
    announcements.forEach((item, key) => {
      if (item.userId === announcements[activeAnnouncement - 1].userId && key + 1 !== activeAnnouncement) {
        arr.push(item)
      }
    })
    dispatch(setOtherAnnouncements(arr))
  }
  const isAuth = () => {
    return users[announcements[index].userId - 1].id === +localStorage.getItem('userId')
  }
  useEffect(() => {
    renderOtherAnnouncements()
  }, [activeAnnouncement])
  const isOtherAnnouncements = () => {
    dispatch(finishDeleteAnnouncement(announcements[index].id))
    return history.push('/')
  }
  return (
    <div className={classes.activeAnnouncement}>
      <div className={classes.container}>
        <div className={classes.header}>
          <NavLink to={'/announcements'} className={classes.link}>
            <p className={classes.name}>{announcements[index].name} {announcements[index].surname}</p>
          </NavLink>
          {isAuth() &&
            <span className="material-icons" onClick={() => { history.push(`/announcements/${activeAnnouncement}/edit`) }}>edit</span>
          }
        </div>
        <h1>{announcements[index].title}</h1>
        <p>{announcements[index].body}</p>
        {users[announcements[index].userId - 1].id === +localStorage.getItem('userId') ?
          <div className={classes.dell}>
            <span className={"material-icons"} onClick={() => isOtherAnnouncements()}>delete</span>
          </div> : null
        }
      </div>
      <OtherAnnouncements />
    </div>
  )
}
export default ActiveAnnouncement