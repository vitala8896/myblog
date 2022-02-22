import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import classes from './../../Assets/Styles/Announcements/Active.module.scss'
import { NavLink, useHistory } from 'react-router-dom'
import { setOtherAnnouncements } from '../../Services/actions/post'
import OtherAnnouncements from './Other'
import { finishDeleteAnnouncement } from '../../Services/actions/create'

const ActiveAnnouncement = () => {
  const dispatch = useDispatch()
  let history = useHistory()
  const { announcements, activeAnnouncement, users } =
    useSelector((state) => ({
      announcements: state.post.announcements,
      activeAnnouncement: state.post.activeAnnouncement,
      users: state.post.users
    }))
  const getIndex = () => {
    return (announcements.length - activeAnnouncement)
  }
  const renderOtherAnnouncements = () => {
    let arr = []
    announcements.forEach((item, key) => {
      if (item.userId === announcements[getIndex()].userId && key !== getIndex()) {
        arr.push(item)
      }
    })
    dispatch(setOtherAnnouncements(arr))
  }
  const isAuth = () => {
    return users[announcements[getIndex()].userId - 1].id === +localStorage.getItem('userId')
  }
  useEffect(() => {
    renderOtherAnnouncements()
  }, [activeAnnouncement])
  const isOtherAnnouncements = () => {
    dispatch(finishDeleteAnnouncement(announcements[getIndex()].id))
    return history.push('/announcements')
  }
  return (
    <div className={classes.activeAnnouncement}>
      <div className={classes.container}>
        <div className={classes.header}>
          <NavLink to={'/announcements'} className={classes.link}>
            <p className={classes.name}>{announcements[getIndex()].name} {announcements[getIndex()].surname}</p>
          </NavLink>
          {isAuth() &&
            <span className="material-icons" onClick={() => { history.push(`/announcements/${activeAnnouncement}/edit`) }}>edit</span>
          }
        </div>
        <h1>{announcements[getIndex()].title}</h1>
        <p>{announcements[getIndex()].body}</p>
        {users[announcements[getIndex()].userId - 1].id === +localStorage.getItem('userId') ?
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